import { CoreMessage, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();
   return   generateText({
      model: openai('gpt-4o-mini'),
      system: 'You are a helpful assistant.',
      messages,
    }).then(
      (responseMessages:any)=>{return  Response.json({ messages: responseMessages }) }
    )
    .catch(
      (error:any)=>{return Response.json({ messages: error }) }
    )
  
}