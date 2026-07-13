import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function getFinancialData(ticker: string) {
  try {
    const quote = await yahooFinance.quoteSummary(ticker, {
      modules: [
        "price",
        "financialData",
        "defaultKeyStatistics",
        "summaryDetail",
      ],
    });

    return quote;
  } catch (error) {
    console.error("Yahoo Finance Error:", error);
    return null;
  }
}