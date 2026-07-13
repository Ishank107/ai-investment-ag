import { investmentAgent } from "@/src/lib/agent/graph";

export async function POST(req: Request) {
  try {
    const { companyName } = await req.json();

    const logs: string[] = [];
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    const capture = (...args: unknown[]) => {
      const message = args
        .map((value) => {
          if (typeof value === "string") {
            return value;
          }

          try {
            return JSON.stringify(value, null, 2);
          } catch {
            return String(value);
          }
        })
        .join(" ");

      logs.push(message);
    };

    console.log = (...args: unknown[]) => {
      capture(...args);
      originalLog(...args);
    };

    console.warn = (...args: unknown[]) => {
      capture(...args);
      originalWarn(...args);
    };

    console.error = (...args: unknown[]) => {
      capture(...args);
      originalError(...args);
    };

    try {
      const result = await investmentAgent.invoke({ companyName });

      return Response.json({
        companyName,
        logs,
        researchData: result.gatheredData ?? null,
        financialAnalysis: result.financialAnalysis ?? "",
        finalReport: result.finalReport || result,
      });
    } finally {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    }
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}