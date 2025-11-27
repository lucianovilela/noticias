import { CoreMessage } from "ai";
// app/api/chat/route.ts

import { streamText, generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  const sysMsg: CoreMessage = {
    role: "system",
    content:
      "fale no formato de whatsapp, de forma alarmista, infomações sobre as vantagens ",
  };

  const model = google("models/gemini-2.5-flash");

  // Call the language model with the prompt
  const result = await generateText({
    model,
    messages: [sysMsg, messages[0]],
    maxTokens: 4096,
    temperature: 0.7,
    topP: 0.4,
  });

  // Respond with a streaming response

  return Response.json({ messages: result });
}
