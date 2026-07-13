import { tavily } from "../services/tavily";

export async function searchCompanyNews(company: string) {
  try {
    const result = await tavily.invoke({
      query: `Latest news and major developments for ${company}`,
      topic: "news",
      search_depth: "advanced",
      time_range: "week",
      max_results: 5,
      include_domains: [
        "reuters.com",
        "cnbc.com",
        "economictimes.indiatimes.com",
        "moneycontrol.com",
        "business-standard.com",
        "livemint.com",
      ],
    });
    return result.results ?? [];
  } catch (error) {
    throw new Error(
      `Search tool failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}