import React, { useState } from 'react'
import { Camera, X } from 'lucide-react'

const API_URL = 'https://api.anthropic.com/v1/messages'

export default function FoodCopilot() {
  const [image, setImage] = useState(null)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeImage = async (base64, mediaType) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 3000,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64
              }
            },
            {
              type: 'text',
              text: `
Extract ingredient list and explain each using simple physical metaphors.
Never say healthy or unhealthy.
Return ONLY JSON like:

{
  "summary": "string",
  "ingredients": [
    { "name": "Sugar", "metaphor": "Sugar cubes in a glass" }
  ]
}
`
            }
          ]
        }]
      })
    })

    return res.json()
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (ev) => {
      setLoading(true)
      const base64 = ev.target.result.split(',')[1]
      const type = file.type
      const data = await analyzeImage(base64, type)

      const text = data.content?.[0]?.text
      if (text) setResponse(JSON.parse(text))
      setLoading(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">🥘 Food Copilot</h1>

        <label className="block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer bg-white">
          <Camera className="mx-auto mb-2" />
          Upload ingredient label
          <input type="file" hidden accept="image/*" onChange={handleUpload} />
        </label>

        {loading && <p className="mt-4 text-center">Analyzing…</p>}

        {response && (
          <div className="mt-6 bg-white rounded-xl p-4 shadow">
            <p className="mb-3">{response.summary}</p>
            {response.ingredients.map((i, idx) => (
              <div key={idx} className="border-t py-2">
                <strong>{i.name}</strong>
                <p className="text-sm text-gray-600">{i.metaphor}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
