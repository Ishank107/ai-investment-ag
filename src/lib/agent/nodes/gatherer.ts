import { GraphState } from "../state";
import { getTicker } from "../../tools/ticker";
import { searchCompanyNews } from "../../tools/search";
import { getFinancialData } from "../../tools/financial";

export async function gathererNode(state: typeof GraphState.State) {
  try {
    console.log("Finding ticker...");
    const ticker = await getTicker(state.companyName);

    console.log("Fetching news...");
    const news = await searchCompanyNews(state.companyName);

    console.log("Fetching financial data...");
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
  } catch (error) {
    throw new Error(
      `Gatherer failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}