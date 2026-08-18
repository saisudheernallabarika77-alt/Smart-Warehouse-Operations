import { Shift, Order } from "@/types/warehouse";
import { shiftWorkspace, shiftDetails } from "@/data/warehouseData";
import { AlertTriangle, ArrowUpRight, Boxes, Check, ChevronRight, ExternalLink, Gauge, Route as RouteIcon, ShieldAlert, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CommandDeskProps {
  setView: (view: any) => void;
  shift: Shift;
  decisionResolved: boolean;
  onResolve: () => void;
  onReview: () => void;
  onOpen: (order: Order) => void;
}

export function CommandDesk({ setView, shift, decisionResolved, onResolve, onReview, onOpen }: CommandDeskProps) {
  const workspace = shiftWorkspace[shift];
  return <>
    <div className="mb-8 flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
      <div>
        <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />Northline FC-01 · Command desk
        </div>
        <h1 className="max-w-3xl font-display text-[48px] leading-[0.9] tracking-[-0.05em] sm:text-[66px]">
          {workspace.command.title}<br />
          <span className="text-ink/38">{workspace.pick.hero}</span>
        </h1>
        <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-ink/55">
          {workspace.command.copy}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-ink/10 bg-[#f7f1e6] px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage/15 text-sage-dark">
          <Gauge className="h-4 w-4" />
        </div>
        <div>
          <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/42">Live shift status</div>
          <div className="mt-1 text-[12px] font-semibold">{shiftDetails[shift].status}</div>
        </div>
        <span className="ml-2 h-2 w-2 animate-pulse rounded-full bg-sage" />
      </div>
    </div>

    <div className="mb-8 grid grid-cols-2 gap-5 border-y border-ink/10 py-5 sm:grid-cols-4">
      <div className="min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Orders in motion</div>
        <div className="mt-2 font-display text-[30px] leading-none tracking-[-0.04em] text-signal-dark">{workspace.command.orders}</div>
        <div className="mt-1 text-[10px] text-ink/45">{workspace.analytics.change}</div>
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Pick accuracy</div>
        <div className="mt-2 font-display text-[30px] leading-none tracking-[-0.04em] text-ink">{workspace.command.accuracy}</div>
        <div className="mt-1 text-[10px] text-ink/45">inside operating plan</div>
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Floor capacity</div>
        <div className="mt-2 font-display text-[30px] leading-none tracking-[-0.04em] text-sage-dark">{workspace.command.capacity}</div>
        <div className="mt-1 text-[10px] text-ink/45">shift headroom</div>
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Recoverable now</div>
        <div className="mt-2 font-display text-[30px] leading-none tracking-[-0.04em] text-ink">{workspace.command.recoverable}</div>
        <div className="mt-1 text-[10px] text-ink/45">{workspace.analytics.bottleneck}</div>
      </div>
    </div>

    <div className="mb-6 grid gap-5 xl:grid-cols-[1.45fr_0.85fr]">
      <section className="relative min-h-[280px] overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-[0_12px_40px_rgba(15,40,55,0.04)] bg-ink">
        <img src="/manus-storage/warehouse-floor-hero_b9e7ce33.jpg" alt="Organized warehouse floor with a visible picker route" className="absolute inset-0 h-full w-full object-cover opacity-72" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/42 to-transparent" />
        <div className="relative flex h-full min-h-[280px] flex-col justify-between p-6 text-white sm:p-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" /> W-01 / Fulfillment live
            </div>
            <h2 className="mt-4 max-w-sm font-display text-[34px] leading-[0.95] tracking-[-0.04em]">{workspace.pick.hero}</h2>
            <p className="mt-3 max-w-sm text-[11px] leading-relaxed text-white/60">{workspace.pick.pickers} pickers · route {workspace.pick.wave} · {workspace.pick.travel} of duplicate travel removed</p>
          </div>
          <div className="flex items-end justify-between">
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/75">Shift {shift} · {shiftDetails[shift].time}</span>
            <button onClick={() => setView("pick")} className="flex items-center gap-1.5 text-[11px] font-semibold text-white transition hover:text-signal">Open floor view <ExternalLink className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Dispatch clock</div>
            <h2 className="font-display text-[27px] leading-none">Next hand-off</h2>
          </div>
          <Truck className="h-5 w-5 text-signal-dark" />
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-signal" />
            <div className="flex-1">
              <div className="flex justify-between gap-2 text-[12px] font-semibold"><span>{workspace.dispatch.cutoff} · Express</span><span className="font-mono text-[9px] text-signal-dark">{workspace.dispatch.pending} pending QC</span></div>
              <div className="mt-1 text-[10px] text-ink/45">Dock 02 · manifest lock in {workspace.dispatch.lock}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-sage" />
            <div className="flex-1">
              <div className="flex justify-between gap-2 text-[12px] font-semibold"><span>Priority outbound</span><span className="font-mono text-[9px] text-sage-dark">{workspace.dispatch.onTime} on-time</span></div>
              <div className="mt-1 text-[10px] text-ink/45">Dock 01 · {workspace.analytics.bottleneck}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-ink/20" />
            <div className="flex-1">
              <div className="flex justify-between gap-2 text-[12px] font-semibold"><span>Next hand-off · {workspace.dispatch.sealed} sealed</span><span className="font-mono text-[9px] text-ink/45">{workspace.dispatch.onTime} safe</span></div>
              <div className="mt-1 text-[10px] text-ink/45">Dock 03 · inside operating plan</div>
            </div>
          </div>
        </div>
        <Button variant="outline" className="mt-6 w-full border-ink/15 bg-transparent text-[11px]" onClick={() => setView("dispatch")}>Open dispatch board <ChevronRight className="ml-auto h-3.5 w-3.5" /></Button>
      </section>
    </div>

    {/* Decision Banner linking directly to AI Prediction */}
    <div className="mb-6 rounded-2xl border border-signal/30 bg-[#fef8ed] p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal text-ink">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-signal-dark">AI Decision Recommendation · {workspace.prediction.confidence}% Confidence</div>
            <h3 className="mt-1 font-display text-[20px] leading-tight">{workspace.prediction.headline}</h3>
            <p className="mt-1 text-[11px] text-ink/65">{workspace.prediction.recommendation}</p>
          </div>
        </div>
        <Button onClick={() => setView("prediction")} className="shrink-0 bg-signal text-ink hover:bg-signal-dark">
          Open AI Prediction module <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>

    <div className="grid gap-5 xl:grid-cols-[1.45fr_0.85fr]">
      <section className="overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
        <div className="flex items-end justify-between px-5 pb-4 pt-5 sm:px-6">
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Priority order queue</div>
            <h2 className="font-display text-[28px] leading-none">What moves next</h2>
          </div>
          <button className="flex items-center gap-1 text-[10px] font-semibold text-signal-dark" onClick={() => setView("orders")}>Open queue <ArrowUpRight className="h-3.5 w-3.5" /></button>
        </div>
        <div className="grid grid-cols-[1.4fr_1.1fr_0.5fr_0.8fr_0.55fr] gap-3 px-5 pb-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/32 sm:px-6"><span>Customer / order</span><span>Work state</span><span>Units</span><span>Promise</span><span /></div>
        {workspace.orders.slice(0, 4).map(order => (
          <div key={order.id} onClick={() => onOpen(order)} className="grid grid-cols-[1.4fr_1.1fr_0.5fr_0.8fr_0.55fr] items-center gap-3 border-t border-ink/8 px-5 py-3.5 text-[11px] transition hover:bg-ink/5 sm:px-6 cursor-pointer">
            <div>
              <div className="font-semibold">{order.customer}</div>
              <div className="font-mono text-[9px] text-ink/42">{order.id} · {order.sku}</div>
            </div>
            <div>
              <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em]", order.risk === "At risk" ? "border-signal/40 bg-signal/10 text-signal-dark" : order.risk === "Held" ? "border-[#d8c48c] bg-[#f8f0d8] text-[#80641d]" : "border-sage/50 bg-sage/15 text-sage-dark")}>
                {order.status}
              </span>
            </div>
            <div className="font-mono text-[10px]">{order.allocated}/{order.units}</div>
            <div className="font-mono text-[10px]">{order.promise}</div>
            <div className="text-right"><ChevronRight className="ml-auto h-4 w-4 text-ink/30" /></div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-ink/10 bg-card p-5 shadow-[0_12px_40px_rgba(15,40,55,0.04)] sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Inventory radar</div>
            <h2 className="font-display text-[28px] leading-none">Stock signals</h2>
          </div>
          <Boxes className="h-5 w-5 text-ink/30" />
        </div>
        <div className="mt-5 space-y-4">
          {workspace.inventory.slice(0, 3).map(item => (
            <div key={item.sku}>
              <div className="flex justify-between gap-3">
                <div>
                  <div className="font-mono text-[9px] text-ink/46">{item.sku}</div>
                  <div className="mt-0.5 text-[11px] font-semibold">{item.name}</div>
                </div>
                <span className={cn("text-[10px] font-semibold", item.tone === "risk" ? "text-signal-dark" : item.tone === "watch" ? "text-[#8b731f]" : "text-sage-dark")}>{item.available} on hand</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/8">
                <div className={cn("h-full rounded-full", item.tone === "risk" ? "bg-signal" : item.tone === "watch" ? "bg-[#c6a535]" : "bg-sage")} style={{ width: `${Math.min(100, item.available / (item.floor * 2.2) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-signal/20 bg-signal/8 p-3">
          <div className="flex gap-2">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-dark" />
            <div className="text-[10px] leading-relaxed text-ink/65"><span className="font-semibold text-ink">Reorder signal:</span> {workspace.analytics.bottleneck} is the lead constraint for this shift. Suggested next move: protect {workspace.pick.wave}.</div>
          </div>
        </div>
        <Button variant="ghost" onClick={() => setView("inventory")} className="mt-3 h-8 px-0 text-[10px] font-semibold text-signal-dark hover:bg-transparent hover:text-ink">Review inventory <ChevronRight className="ml-1 h-3.5 w-3.5" /></Button>
      </section>
    </div>
  </>
}
