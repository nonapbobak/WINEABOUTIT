import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function fetchRestaurantContent(url: string): Promise<string> {
  // Normalize URL
  let normalizedUrl = url.trim()
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RestaurantExperienceBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    })
    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`)
    }

    const html = await response.text()

    // Strip HTML tags to get readable text
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#\d+;/g, '')
      .trim()
      .substring(0, 6000) // Limit to avoid token overflow

    return text
  } catch (err) {
    clearTimeout(timeout)
    throw err
  }
}

const SYSTEM_PROMPT = `You are an expert restaurant experience consultant and revenue strategist.
You analyze restaurant websites and generate highly specific, creative, and actionable recommendations
for dining experiences, upgrade packages, and special events that would resonate with that restaurant's
brand, cuisine, and target audience.

Your recommendations must be:
- Specific to the restaurant's actual cuisine, atmosphere, and brand identity
- Creative and unique, not generic
- Feasible for a restaurant to implement
- Revenue-generating

Always respond with valid JSON only — no markdown, no explanation.`

const USER_PROMPT = (restaurantContent: string, url: string) => `
Analyze this restaurant website content and generate personalized experience recommendations.

Restaurant URL: ${url}
Website Content:
---
${restaurantContent}
---

Return a JSON object with exactly this structure:
{
  "restaurantName": "Name of the restaurant",
  "restaurantSummary": "One sentence describing the restaurant's vibe, cuisine, and target audience",
  "experiences": [
    {
      "title": "Experience name",
      "description": "2-3 sentence description of what guests get. Be specific to this restaurant.",
      "priceRange": "$XX–$XX per person",
      "category": "One of: Chef's Table | Tasting Menu | Culinary Class | Wine & Spirits | Private Dining | Seasonal Special",
      "icon": "One of: chef | wine | star | calendar | users | fire | leaf | sparkle"
    }
  ],
  "upgrades": [
    {
      "title": "Upgrade name",
      "description": "2-sentence description of the upgrade add-on and its value to guests.",
      "revenueBoost": "Estimated additional revenue per cover (e.g. +$35/cover)",
      "icon": "One of: gift | champagne | flower | camera | music | vip | cake | cheese"
    }
  ],
  "events": [
    {
      "title": "Event name",
      "description": "2-3 sentence description of the event concept, tailored to this restaurant.",
      "frequency": "e.g. Monthly | Quarterly | Seasonal | Weekly",
      "estimatedAttendees": "e.g. 20–30 guests",
      "icon": "One of: calendar | music | moon | sun | globe | heart | trophy | star"
    }
  ]
}

Generate exactly 4 experiences, 4 upgrades, and 4 events. Make them highly specific to this restaurant —
reference their actual dishes, atmosphere, or brand identity where possible.
`

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'A valid restaurant URL is required.' }, { status: 400 })
    }

    // Fetch restaurant website content
    let restaurantContent: string
    try {
      restaurantContent = await fetchRestaurantContent(url)
    } catch {
      // If we can't fetch the site, generate based on URL alone
      restaurantContent = `Unable to fetch content from ${url}. Generate recommendations based on what the URL suggests about the restaurant type.`
    }

    // Call Claude
    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: USER_PROMPT(restaurantContent, url),
        },
      ],
      system: SYSTEM_PROMPT,
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response from AI')
    }

    // Parse JSON response
    let parsed
    try {
      // Strip potential markdown code fences
      const jsonText = content.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      parsed = JSON.parse(jsonText)
    } catch {
      throw new Error('Failed to parse AI response. Please try again.')
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Generate API error:', err)
    const message = err instanceof Error ? err.message : 'An unexpected error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
