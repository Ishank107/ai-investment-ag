import { TavilySearch } from "@langchain/tavily";
import yahooFinance from "yahoo-finance2";

// 1. Tavily Search for latest news
export const searchTool = new TavilySearch({
  maxResults: 3,
  searchDepth: "advanced",
});

// 2. Yahoo Finance custom function
export async function getFinancialMetrics(ticker: string) {
  try {
    // yahooFinance.quote can return varying shapes; cast to any to avoid strict typing issues
    const quote: any = await yahooFinance.quote(ticker);
    return JSON.stringify({
      price: quote.regularMarketPrice,
      peRatio: quote.trailingPE,
      marketCap: quote.marketCap,
      fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
    });
  } catch (error) {
    return "Financial data not found.";
  }
}