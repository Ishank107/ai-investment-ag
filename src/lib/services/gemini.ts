import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = "gemini-3.5-flash";

export function createGeminiLLM() {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is required to use Gemini models.");
  }

  return new ChatGoogleGenerativeAI({
    model,
    temperature: 0.2,
    apiKey,
  });
}