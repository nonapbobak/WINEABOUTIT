'use client'

import { useState, useRef } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import ExperienceShowcase from '@/components/ExperienceShowcase'
import ResultsSection from '@/components/ResultsSection'
import SocialProof from '@/components/SocialProof'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export type ExperienceResult = {
  experiences: Experience[]
  upgrades: Upgrade[]
  events: EventSuggestion[]
  restaurantName: string
  restaurantSummary: string
}

export type Experience = {
  title: string
  description: string
  priceRange: string
  category: string
  icon: string
}

export type Upgrade = {
  title: string
  description: string
  revenueBoost: string
  icon: string
}

export type EventSuggestion = {
  title: string
  description: string
  frequency: string
  estimatedAttendees: string
  icon: string
}

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ExperienceResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleGenerate = async (submittedUrl: string) => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: submittedUrl }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate experiences')
      }

      const data: ExperienceResult = await response.json()
      setResults(data)

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-sr-black">
      <Navbar />

      <HeroSection
        url={url}
        setUrl={setUrl}
        loading={loading}
        onGenerate={handleGenerate}
      />

      {(loading || results || error) && (
        <div ref={resultsRef}>
          <ResultsSection
            loading={loading}
            results={results}
            error={error}
            onRetry={() => handleGenerate(url)}
          />
        </div>
      )}

      <HowItWorks />
      <ExperienceShowcase />
      <SocialProof />
      <FinalCTA onGenerate={handleGenerate} url={url} setUrl={setUrl} loading={loading} />
      <Footer />
    </div>
  )
}
