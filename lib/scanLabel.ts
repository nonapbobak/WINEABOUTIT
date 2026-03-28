import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export interface ScannedWine {
  name: string;
  winery: string;
  vintage: number | null;
  type: 'red' | 'white' | 'rosé' | 'sparkling' | 'dessert' | 'fortified';
  region: string;
  country: string;
  description: string;
}

export async function scanWineLabel(source: 'camera' | 'library' = 'camera'): Promise<ScannedWine | null> {
  const { status } = source === 'camera'
    ? await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Permission needed', `Please allow ${source} access to scan wine labels.`);
    return null;
  }

  const result = source === 'camera'
    ? await ImagePicker.launchCameraAsync({ base64: true, quality: 0.7 })
    : await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.7 });

  if (result.canceled || !result.assets[0]?.base64) return null;

  const apiKey = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
  if (!apiKey) {
    Alert.alert('Setup needed', 'Add EXPO_PUBLIC_ANTHROPIC_API_KEY to your .env file to enable label scanning.');
    return null;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/jpeg', data: result.assets[0].base64 },
            },
            {
              type: 'text',
              text: `This is a wine bottle label. Extract all visible details.
Reply ONLY with valid JSON — no other text, no markdown:
{
  "name": "wine name or cuvée (not the winery name)",
  "winery": "producer or winery name",
  "vintage": 2019,
  "type": "red",
  "region": "wine region e.g. Napa Valley",
  "country": "country e.g. USA",
  "description": "1-2 sentence description of this wine style"
}
Rules:
- type must be one of exactly: red, white, rosé, sparkling, dessert, fortified
- vintage is the year as a number, or null if not visible
- Make your best educated guess if any field is unclear`,
            },
          ],
        }],
      }),
    });

    const data = await response.json();
    if (!data.content?.[0]?.text) return null;
    return JSON.parse(data.content[0].text) as ScannedWine;
  } catch {
    Alert.alert('Scan failed', 'Could not read this label. Try better lighting, or search manually.');
    return null;
  }
}
