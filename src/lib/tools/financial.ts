import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function getFinancialData(ticker: string) {
  const candidates = [
    ticker.trim(),
    ticker.includes(".") ? ticker.trim() : `${ticker.trim()}.NS`,
    ticker.includes(".") ? ticker.trim() : `${ticker.trim()}.BO`,
  ].filter((value, index, array) => value && array.indexOf(value) === index);

  for (const candidate of candidates) {
    try {
      return await yahooFinance.quoteSummary(candidate, {
        modules: [
          "price",
          "financialData",
          "defaultKeyStatistics",
          "summaryDetail",
        ],
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!/Quote not found for symbol/i.test(message)) {
        console.error("Yahoo Finance Error:", error);
        return null;
      }
    }
  }

  console.warn(`Yahoo Finance: no quote found for ${ticker}`);
  return null;
}