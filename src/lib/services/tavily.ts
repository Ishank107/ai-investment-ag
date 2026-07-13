import { TavilySearch } from "@langchain/tavily";

export const tavily = new TavilySearch({
  maxResults: 5,
}); 