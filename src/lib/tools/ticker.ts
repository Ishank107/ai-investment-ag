import { createGeminiLLM } from "../services/gemini";

export async function getTicker(company: string) {
  try {
    const llm = createGeminiLLM();

    console.log("Calling Gemini...");

    const result = await llm.invoke(
      `Return ONLY the stock ticker symbol for ${company}.`
    );

    console.log(result);

    return String(result.content).trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}