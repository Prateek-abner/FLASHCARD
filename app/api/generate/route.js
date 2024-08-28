// app/api/generate/route.js

import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Define the system prompt for creating flashcards
const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

// POST: Generate flashcards based on input text
export async function POST(req) {
  try {
    // Create a new instance of OpenAI
    const openai = new OpenAI()

    // Extract the input text from the request body
    const data = await req.text()

    // Make a call to the OpenAI API to generate flashcards
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
    })

    // Parse the JSON response from OpenAI
    const flashcards = JSON.parse(completion.choices[0].message.content)

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  } catch (error) {
    console.error('Error generating flashcards:', error)
    return NextResponse.json({ error: { message: error.message } }, { status: 500 })
  }
}
