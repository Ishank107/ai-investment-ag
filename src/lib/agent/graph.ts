import { StateGraph, START, END } from "@langchain/langgraph";
import { GraphState } from "./state";
import { gathererNode } from "./nodes/gatherer";
import { analystNode, cioNode } from "./nodes";

const builder = new StateGraph(GraphState)
  .addNode("gatherer", gathererNode)
  .addNode("analyst", analystNode)
  .addNode("cio", cioNode)
  .addEdge(START, "gatherer")
  .addEdge("gatherer", "analyst")
  .addEdge("analyst", "cio")
  .addEdge("cio", END);

export const investmentAgent = builder.compile();