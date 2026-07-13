"use client";

import { useState } from "react";

export default function Home() {
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Track the agent's live progress
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  // Final state engines
  const [report, setReport] = useState<any>(null);
  const [researchData, setResearchData] = useState<any>(null);
  const [financialAnalysis, setFinancialAnalysis] = useState<string>("");
  const [analyzedCompany, setAnalyzedCompany] = useState<string>("");
  const [analyzedTicker, setAnalyzedTicker] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isInvest = report?.verdict === "INVEST";

const analyzeCompany = async () => {
    if (!company.trim()) return;

    setLoading(true);
    setReport(null);
    setResearchData(null);
    setFinancialAnalysis("");
    setAnalyzedCompany("");
    setAnalyzedTicker("");
    setError(null);
    setLogs(["Initializing pipeline..."]);
    
    try {
      const res = await fetch("/api/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: company.trim() }),
      });

      if (!res.ok) throw new Error("API request failed.");

      const data = await res.json();
      setLogs(Array.isArray(data.logs) ? data.logs : ["No logs returned."]);
      setAnalyzedCompany(data.companyName ?? company.trim());
      setAnalyzedTicker(data.ticker ?? data.researchData?.ticker ?? "");
      setResearchData(data.researchData ?? null);
      setFinancialAnalysis(data.financialAnalysis ?? "");
      setReport(data.finalReport ?? null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6 sm:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Console Banner */}
        <header className="border-b border-gray-800 pb-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight">
              AI Analysis Engine
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">
              Enter a company name, research it, then decide whether to invest or pass.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            <span className="text-xs font-mono font-medium text-green-400 uppercase tracking-wider">Node Active</span>
          </div>
        </header>
        
        {/* Core Control Module */}
        <section className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl shadow-2xl mb-8">
          <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
            Target Asset Identification
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter asset or company name (e.g., NVIDIA, Microsoft)" 
              className="flex-1 bg-[#0d1117] border border-[#30363d] text-white p-3.5 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono placeholder-gray-600 text-sm"
              disabled={loading}
            />
            <button 
              onClick={analyzeCompany} 
              disabled={loading || !company.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-mono text-sm uppercase tracking-wider px-8 py-3.5 rounded-lg hover:from-blue-500 hover:to-blue-600 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-900/20 border border-blue-500/20"
            >
              {loading ? "Processing..." : "Run Analysis"}
            </button>
          </div>
        </section>

        {/* Real-time Thought Stream Pipeline Layout */}
        {loading && logs.length > 0 && (
          <article className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl shadow-2xl mb-8 animate-pulse">
            <h3 className="font-mono text-xs uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2.5">
              <span className="inline-block w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              Agent Workflow Trace (LangGraph Execution)
            </h3>
            <div className="bg-[#0d1117] border border-[#21262d] p-4 rounded-lg font-mono text-xs text-gray-400 max-h-48 overflow-y-auto space-y-2.5 scrollbar-thin scrollbar-thumb-gray-800">
              {logs.map((log, i) => (
                <div key={i} className="flex items-start gap-2 animate-fade-in">
                  <span className="text-blue-500 select-none">&gt;</span>
                  <p className="leading-relaxed">{log}</p>
                </div>
              ))}
            </div>
          </article>
        )}

        {!loading && !report && !error && (
          <section className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl shadow-2xl mb-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-2">What this does</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              It takes a company name, does research, and decides whether to invest or pass, with the reasoning behind the decision.
            </p>
          </section>
        )}

        {/* Runtime Exception Matrix Display */}
        {error && (
          <article className="bg-red-950/20 border border-red-500/30 text-red-400 p-5 rounded-xl mb-8 font-mono text-xs flex flex-col gap-1 shadow-lg">
            <h4 className="font-bold text-sm text-red-400 uppercase tracking-wide">System Analysis Interrupted</h4>
            <p className="text-red-300/80 mt-1">{error}</p>
          </article>
        )}

        {/* Final Enterprise Investment Verdict Presentation UI */}
        {/* Final Enterprise Investment Verdict Presentation UI */}
        {report && (
          <article className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 animate-fade-in border-t-4 border-t-blue-500">
            
            {/* Verdict Hero Row */}
            <div className="bg-[#21262d] border-b border-[#30363d] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                  Company: <span className="text-gray-200">{analyzedCompany || company}</span>
                </div>
                <div className="h-5 w-px bg-gray-700" />
                <div className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                  Ticker: <span className="text-gray-200">{analyzedTicker || researchData?.ticker || "Not found"}</span>
                </div>
                <div className="h-5 w-px bg-gray-700" />
                <div className="font-mono text-xs text-gray-400 uppercase tracking-wider">Decision</div>
                <div className={`px-4 py-1.5 rounded-md font-mono text-sm font-bold tracking-widest border uppercase ${
                  isInvest 
                    ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  {isInvest ? 'Invest' : 'Pass'}
                </div>
              </div>
            </div>
            
            {/* Core Executive Summary Narrative */}
            <div className="p-6 border-b border-[#30363d]">
              <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">Reasoning</h3>
              <p className="text-[#c9d1d9] text-sm leading-relaxed whitespace-pre-line">
                {report.reasoning}
              </p>
            </div>

            {researchData && (
              <div className="p-6 border-b border-[#30363d]">
                <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">Full Research</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm items-stretch">
                  <div className="rounded-lg border border-[#30363d] bg-[#0d1117] p-4 h-full">
                    <div className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-2">Financial Analysis</div>
                    <div className="text-gray-200 whitespace-pre-line leading-relaxed">{financialAnalysis || "No analysis returned."}</div>
                  </div>
                  <div className="rounded-lg border border-[#30363d] bg-[#0d1117] p-4 h-full">
                    <div className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-2">
                      Recent News for {analyzedCompany || company}
                    </div>
                    <div className="space-y-3 text-gray-200">
                      {(Array.isArray(researchData.news) ? researchData.news : []).length > 0 ? (
                        researchData.news.map((item: any, index: number) => (
                          <div key={index} className="rounded-md border border-[#21262d] p-3 bg-[#11161d]">
                            <div className="flex items-start justify-between gap-3">
                              <div className="font-semibold text-white">{item.title || item.url || `News ${index + 1}`}</div>
                              {typeof item.score === "number" && (
                                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Score {item.score.toFixed(2)}</div>
                              )}
                            </div>
                            {item.content && <div className="text-gray-400 mt-1 text-xs whitespace-pre-line">{item.content}</div>}
                            {item.url && <div className="text-blue-400 mt-1 text-xs break-all">{item.url}</div>}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 leading-relaxed">
                          No recent news found for {analyzedCompany || company}. Try another company name if you want fresher coverage.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Bull and Bear Cases */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#30363d] bg-[#161b22]">
              <div className="p-6">
                <h4 className="font-mono text-xs font-bold text-green-400 uppercase tracking-widest mb-4">Catalysts</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                  {report.bullCase?.map((point: string, i: number) => <li key={i}>{point}</li>)}
                </ul>
              </div>
              <div className="p-6">
                <h4 className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest mb-4">Headwinds</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                  {report.bearCase?.map((point: string, i: number) => <li key={i}>{point}</li>)}
                </ul>
              </div>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}