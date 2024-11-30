import { CoreMessage } from 'ai';
// app/api/chat/route.ts

import { streamText, generateText, CoreMessage } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  const sysMsg:CoreMessage = {role:'system', content:'fale no formato de whatsapp, de forma alarmista, infomações sobre as vantagens '}

  const model = google('models/gemini-1.5-flash-001')

  // Call the language model with the prompt
  const result = await generateText({
    model,
    messages:[sysMsg, messages],
    maxTokens: 4096,
    temperature: 0.7,
    topP: 0.4,
  })

  
  // Respond with a streaming response

  return Response.json( {messages:result})
}
