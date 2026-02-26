import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToModelMessages } from "ai";

export const runtime = "edge";

const groq = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}