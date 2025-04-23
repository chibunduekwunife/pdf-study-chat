import { openai } from "@/app/lib/ai-declarations"
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "mistralai/mixtral-8x7b-instruct-v0.1",
    messages,
    stream: true,
    max_tokens: 1024,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}