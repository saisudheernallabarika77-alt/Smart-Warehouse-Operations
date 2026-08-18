import { Shift } from "@/types/warehouse";
import { shiftWorkspace, shiftDetails } from "@/data/warehouseData";
import { AlertTriangle, Brain, Check, ChevronRight, Cpu, FileText, Layers, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AiPredictionWorkspaceProps {
  shift: Shift;
  onResolve: () => void;
  decisionResolved: boolean;
}

export function AiPredictionWorkspace({ shift, onResolve, decisionResolved }: AiPredictionWorkspaceProps) {
  const workspace = shiftWorkspace[shift];
  const details = shiftDetails[shift];

  const handleActionClick = () => {
    onResolve();
    toast.success("AI Recommendation Applied", {
      description: `${workspace.prediction.headline} — optimized plan enforced for Shift ${shift}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-ink p-6 text-white sm:p-8">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-signal/15 blur-3xl" />
        <div className="absolute right-32 bottom-0 h-48 w-48 rounded-full bg-sage/15 blur-2xl" />
        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-signal">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              WarehouseIQ Decision Intelligence · AI Prediction Engine
            </div>
            <h1 className="mt-3 font-display text-[36px] leading-[0.95] tracking-[-0.04em] sm:text-[46px]">
              {workspace.prediction.headline}
            </h1>
            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-white/70">
              {workspace.prediction.summary}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md lg:items-end">
            <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">AI Confidence Score</div>
            <div className="font-display text-[40px] leading-none text-signal">{workspace.prediction.confidence}%</div>
            <div className="font-mono text-[9px] text-sage">Validated against 14k shift logs</div>
          </div>
        </div>
      </div>

      {/* Grid of Decision Insights */}
      <div className="grid gap-5 md:grid-cols-3">
        {/* Card 1: Primary Risk */}
        <div className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Predicted Bottleneck</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-signal/15 text-signal-dark">
              <AlertTriangle className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4 font-display text-[22px] leading-[1.05]">
            {workspace.analytics.bottleneck}
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-ink/60">
            {workspace.prediction.primaryRisk}
          </p>
          <div className="mt-5 flex items-center gap-2 font-mono text-[9px] text-signal-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Shift {shift} · {details.label} threat level: High
          </div>
        </div>

        {/* Card 2: AI Recommendation */}
        <div className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Prescriptive Action</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sage/15 text-sage-dark">
              <Brain className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4 font-display text-[22px] leading-[1.05]">
            Optimal Resolution
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-ink/60">
            {workspace.prediction.recommendation}
          </p>
          <div className="mt-5 flex items-center gap-2 font-mono text-[9px] text-sage-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            Ready for 1-click execution
          </div>
        </div>

        {/* Card 3: Expected Impact */}
        <div className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Simulated Impact</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink/8 text-ink">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4 font-display text-[22px] leading-[1.05]">
            SLA Secured
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-ink/60">
            {workspace.prediction.expectedImpact}
          </p>
          <div className="mt-5 flex items-center gap-2 font-mono text-[9px] text-ink/50">
            <span className="h-1.5 w-1.5 rounded-full bg-ink/40" />
            Zero picker rework required
          </div>
        </div>
      </div>

      {/* Deep-Dive Simulation & Mentor Briefing Panel */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        {/* Left: Complete Shift Simulation Walkthrough */}
        <div className="rounded-2xl border border-ink/10 bg-card p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Mentor Briefing Summary</div>
              <h2 className="mt-1 font-display text-[28px] leading-none">End-to-End Simulation Flow</h2>
            </div>
            <span className="rounded-full bg-signal/15 px-3 py-1 font-mono text-[10px] font-semibold text-signal-dark">
              Shift {shift} Active
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-4 rounded-xl border border-ink/8 bg-paper p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage/20 font-mono text-[10px] font-bold text-sage-dark">1</span>
              <div>
                <div className="text-[12px] font-semibold">Order Ingestion & Priority Ranking</div>
                <div className="mt-1 text-[11px] leading-relaxed text-ink/60">
                  {workspace.command.orders} orders processed with priority scoring. High-urgency customer SLAs are automatically detected and flagged before picker dispatch.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-ink/8 bg-paper p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal/20 font-mono text-[10px] font-bold text-signal-dark">2</span>
              <div>
                <div className="text-[12px] font-semibold">Inventory Allocation & Stock Deficit Detection</div>
                <div className="mt-1 text-[11px] leading-relaxed text-ink/60">
                  Inventory radar detects that {workspace.analytics.bottleneck} is the leading constraint. The AI engine calculates split allocation to protect priority customer promises.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-ink/8 bg-paper p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/8 font-mono text-[10px] font-bold text-ink">3</span>
              <div>
                <div className="text-[12px] font-semibold">Optimized Pick Route & Packing Wave Release</div>
                <div className="mt-1 text-[11px] leading-relaxed text-ink/60">
                  Pick wave <span className="font-semibold text-ink">{workspace.pick.wave}</span> in <span className="font-semibold text-ink">{workspace.pick.zone}</span> eliminates {workspace.pick.travel} of duplicate travel across {workspace.pick.pickers} active pickers.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-ink/8 bg-paper p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage/20 font-mono text-[10px] font-bold text-sage-dark">4</span>
              <div>
                <div className="text-[12px] font-semibold">Dispatch Hand-off & Manifest Lock</div>
                <div className="mt-1 text-[11px] leading-relaxed text-ink/60">
                  Carrier cut-off at <span className="font-semibold text-ink">{workspace.dispatch.cutoff}</span> is safeguarded by pre-assigned quality checks and sealed manifest status.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Action & Resolution Console */}
        <div className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-[#f7f1e6] p-6 sm:p-8">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Decision Execution Console</div>
            <h2 className="mt-1 font-display text-[28px] leading-none">Instant Resolution</h2>
            <p className="mt-3 text-[12px] leading-relaxed text-ink/65">
              Review the AI prediction above. When you approve, WarehouseIQ instantly updates the order queue, reallocates stock buffers, and locks the pick sequence.
            </p>

            <div className="mt-6 rounded-2xl border border-signal/30 bg-signal/10 p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold text-signal-dark">
                <Cpu className="h-4 w-4" />
                Recommended Action
              </div>
              <div className="mt-2 text-[12px] font-semibold text-ink">
                {workspace.prediction.recommendation}
              </div>
              <div className="mt-2 text-[11px] text-ink/60">
                Impact: {workspace.prediction.expectedImpact}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button
              onClick={handleActionClick}
              disabled={decisionResolved}
              className={cn(
                "w-full py-6 text-[12px] font-semibold shadow-lg transition",
                decisionResolved ? "bg-sage text-white hover:bg-sage" : "bg-signal text-ink hover:bg-signal-dark"
              )}
            >
              {decisionResolved ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> AI Prediction Applied & Resolved
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> {workspace.prediction.actionLabel}
                </>
              )}
            </Button>
            <div className="text-center font-mono text-[9px] text-ink/40">
              Northline FC-01 · Shift {shift} Operations Control
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
