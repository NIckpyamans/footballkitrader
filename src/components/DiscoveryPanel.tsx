import { AlertTriangle, Bot, CheckCircle2, LockKeyhole, Radar } from "lucide-react";
import { marketplaceSources } from "@/data/marketplaces";
import { assessMarketplaceSource } from "@/lib/ai-engine";

export function DiscoveryPanel({ compact = false }: { compact?: boolean }) {
  const sources = compact ? marketplaceSources.slice(0, 5) : marketplaceSources;

  return (
    <div className="glass rounded-[28px] p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold"><Radar size={16} /> AI discovery engine</p>
          <h2 className="mt-2 text-3xl font-black">Marketplace monitoring</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-steel">Nieuwe bronnen blijven in analysemodus totdat jij expliciet goedkeurt dat ze live worden toegevoegd.</p>
        </div>
        <div className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-bold text-champagne">approval gated</div>
      </div>
      <div className="mt-6 grid gap-3">
        {sources.map((source) => {
          const assessment = assessMarketplaceSource(source);
          return (
            <div key={source.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold">{source.name}</h3>
                    <StatusPill status={source.status} />
                    {source.activationRequiresApproval ? <span className="flex items-center gap-1 rounded-full bg-gold/10 px-2 py-1 text-xs text-champagne"><LockKeyhole size={12} /> approval required</span> : null}
                  </div>
                  <p className="mt-1 text-xs text-steel">{source.url}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
                  <Score label="Trust" value={source.aiTrustScore} />
                  <Score label="Quality" value={source.qualityScore} />
                  <Score label="Ship" value={source.shippingScore} />
                  <Score label="Community" value={source.communityScore} />
                  <Score label="Scam risk" value={source.scamRisk} danger />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {source.signals.map((signal) => <span key={signal} className="rounded-full border border-white/10 px-3 py-1 text-xs text-steel">{signal}</span>)}
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm text-steel"><Bot size={15} className="text-volt" /> AI verdict: {assessment.verdict} · weighted trust {assessment.weightedTrust}/100</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const active = status === "active";
  return <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${active ? "bg-volt/10 text-volt" : "bg-white/10 text-steel"}`}>{active ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />} {status}</span>;
}

function Score({ label, value, danger = false }: { label: string; value: number; danger?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink/50 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.16em] text-steel">{label}</p>
      <p className={`text-lg font-black ${danger && value > 65 ? "text-red-300" : "text-champagne"}`}>{value}</p>
    </div>
  );
}
