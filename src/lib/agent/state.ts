import { Annotation } from "@langchain/langgraph";

export const GraphState = Annotation.Root({
  companyName: Annotation<string>(),

  ticker: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  gatheredData: Annotation<any>({
    reducer: (_, value) => value,
    default: () => ({}),
  }),

  financialAnalysis: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  newsAnalysis: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  riskAnalysis: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  valuationAnalysis: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  finalReport: Annotation<any>({
    reducer: (_, value) => value,
    default: () => null,
  }),
});