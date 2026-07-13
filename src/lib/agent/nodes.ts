import { z } from "zod";
import { GraphState } from "./state";

import { getTicker } from "../tools/ticker";
import { searchCompanyNews } from "../tools/search";
import { getFinancialData } from "../tools/financial";
import { createGeminiLLM } from "../services/gemini";

// -------------------------
// Gatherer
// -------------------------
export async function gathererNode(
  state: typeof GraphState.State
) {
  const ticker = await getTicker(state.companyName);

  const news = await searchCompanyNews(state.companyName);

  const financials = await getFinancialData(ticker);

  return {
    ticker,
    gatheredData: {
      company: state.companyName,
      ticker,
      news,
      financials,
    },
  };
}

// -------------------------
// Analyst
// -------------------------
export async function analystNode(
  state: typeof GraphState.State
) {
  const llm = createGeminiLLM();

  const prompt = `
You are a Senior Financial Analyst.

Company:
${state.companyName}

Financial Data:
${JSON.stringify(state.gatheredData)}

Provide:

- Financial health
- Growth opportunities
- Risks
- Overall recommendation

Maximum 300 words.
`;

  const result = await llm.invoke(prompt);

  return {
    financialAnalysis: String(result.content),
  };
}

// -------------------------
// CIO
// -------------------------
export async function cioNode(
  state: typeof GraphState.State
) {
  const llm = createGeminiLLM();

  const reportSchema = z.object({
    verdict: z.enum(["INVEST", "PASS"]),
    confidenceScore: z.number().min(1).max(10),
    bullCase: z.array(z.string()),
    bearCase: z.array(z.string()),
    reasoning: z.string(),
  });

  const structuredModel = llm.withStructuredOutput(reportSchema);

  const finalReport = await structuredModel.invoke(`
Company:
${state.companyName}

Financial Analysis:
${state.financialAnalysis}

Make the final investment decision.
`);

  return {
    finalReport,
  };
}