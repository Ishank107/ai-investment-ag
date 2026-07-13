# AI Investment Analyst

A Next.js app that takes a company name, researches it with live news and financial data, and returns an invest-or-pass decision with reasoning.

## What it does

- Accepts a company name from the webpage.
- Finds the stock ticker symbol.
- Pulls recent company news from selected finance and business sources.
- Fetches available Yahoo Finance data for the ticker.
- Uses Gemini to write a financial analysis and final invest/pass verdict.
- Shows the company name, reasoning, recent news, and decision on the webpage.

## Tech Stack

- Next.js 16 App Router
- React 19
- LangGraph for the research workflow
- Google Gemini via `@langchain/google-genai`
- Tavily for recent news search
- Yahoo Finance for market and company data

## Setup

1. Install dependencies.

```bash
npm install
```

2. Add environment variables in `.env.local`.

```bash
GOOGLE_API_KEY=your_google_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
```

3. Start the development server.

```bash
npm run dev
```

4. Open the app at [http://localhost:3000](http://localhost:3000).

## How it works

The research flow is handled by the LangGraph pipeline:

1. Gatherer node
	- Resolves the ticker.
	- Fetches recent news.
	- Fetches Yahoo Finance data.
2. Analyst node
	- Produces a written financial analysis.
3. CIO node
	- Returns the final verdict: `INVEST` or `PASS`.

The API route at `app/api/invest/route.ts` returns the company name, ticker, recent news, financial analysis, and final report to the frontend.

## News Sources

Recent news is fetched through Tavily with a news-focused query and a restricted list of business and finance domains, including:

- Reuters
- CNBC
- Economic Times
- Moneycontrol
- Business Standard
- Mint

## UI Output

The webpage shows:

- Company name
- Ticker / stock symbol
- Invest or pass decision
- Reasoning behind the decision
- Recent news for the company
- Financial analysis

## Notes

- If Yahoo Finance cannot find a symbol, the app falls back gracefully instead of failing the entire request.
- If news is unavailable, the UI shows a company-specific fallback message.
- The current UI is focused on showing the research result clearly rather than a complex dashboard.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
