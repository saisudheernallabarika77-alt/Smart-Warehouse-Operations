import { Shift, Order } from "@/types/warehouse";
import { shiftWorkspace, shiftDetails } from "@/data/warehouseData";
import { Check, ChevronRight, Clock3, ListFilter, Route as RouteIcon, ShieldAlert, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

interface OrderQueueProps {
  onOpen: (order: Order) => void;
  decisionResolved: boolean;
  onResolve: () => void;
  shift: Shift;
}

export function OrderQueueWorkspace({ onOpen, decisionResolved, onResolve, shift }: OrderQueueProps) {
  const [filter, setFilter] = useState("All active");
  const workspace = shiftWorkspace[shift];
  const filtered = useMemo(() => filter === "All active" ? workspace.orders : filter === "At risk" ? workspace.orders.filter(o => o.risk === "At risk") : filter === "Ready to pick" ? workspace.orders.filter(o => o.status === "Allocated") : workspace.orders.filter(o => o.risk === "Held"), [filter, workspace.orders]);

  return <>
    <div className="mb-8 flex flex-col justify-between gap-5 border-b border-ink/10 pb-7 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Fulfillment control · Shift {shift} · Northline FC-01</div>
        <h1 className="max-w-3xl font-display text-[42px] leading-[0.95] tracking-[-0.045em] text-ink sm:text-[52px]">Order queue</h1>
        <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-ink/55">{shiftDetails[shift].status}. Ranked by promise risk, customer tier, and fulfillment readiness for this shift.</p>
      </div>
      <Button onClick={onResolve} className="bg-signal text-ink hover:bg-signal-dark">{decisionResolved ? <><Check className="mr-2 h-4 w-4" /> Split approved</> : <>Approve recommended split <ChevronRight className="ml-2 h-4 w-4" /></>}</Button>
    </div>

    <div className="mb-5 flex flex-wrap items-center gap-2">
      <button onClick={() => setFilter("All active")} className={cn("rounded-full border px-3 py-1.5 text-[10px] transition", filter === "All active" ? "border-ink bg-ink text-paper" : "border-ink/15 bg-transparent text-ink/55 hover:border-ink/35 hover:text-ink")}>All active · {workspace.orders.length}</button>
      <button onClick={() => setFilter("At risk")} className={cn("rounded-full border px-3 py-1.5 text-[10px] transition", filter === "At risk" ? "border-ink bg-ink text-paper" : "border-ink/15 bg-transparent text-ink/55 hover:border-ink/35 hover:text-ink")}>At risk · {workspace.orders.filter(order => order.risk === "At risk").length}</button>
      <button onClick={() => setFilter("Ready to pick")} className={cn("rounded-full border px-3 py-1.5 text-[10px] transition", filter === "Ready to pick" ? "border-ink bg-ink text-paper" : "border-ink/15 bg-transparent text-ink/55 hover:border-ink/35 hover:text-ink")}>Ready to pick · {workspace.orders.filter(order => order.status === "Allocated").length}</button>
      <button onClick={() => setFilter("Held")} className={cn("rounded-full border px-3 py-1.5 text-[10px] transition", filter === "Held" ? "border-ink bg-ink text-paper" : "border-ink/15 bg-transparent text-ink/55 hover:border-ink/35 hover:text-ink")}>Held · {workspace.orders.filter(order => order.risk === "Held").length}</button>
      <span className="ml-auto hidden items-center gap-2 text-[10px] text-ink/42 sm:flex"><SlidersHorizontal className="h-3.5 w-3.5" /> Sort: <span className="font-semibold text-ink">priority</span></span>
    </div>

    <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
      <section className="overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
        <div className="flex items-center justify-between px-5 py-5 sm:px-6">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/38">Promise-date order</div>
            <h2 className="mt-1 font-display text-[28px] leading-none">Work sequence</h2>
          </div>
          <span className="font-mono text-[10px] text-ink/38">{filtered.length} visible</span>
        </div>
        <div className="hidden grid-cols-[1.4fr_1.1fr_0.5fr_0.8fr_0.55fr] gap-3 px-5 pb-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/32 sm:grid sm:px-6"><span>Customer / order</span><span>Work state</span><span>Units</span><span>Promise</span><span /></div>
        {filtered.map(order => (
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
        {filtered.length === 0 ? <div className="p-10 text-center text-[12px] text-ink/45">No orders match this view.</div> : null}
      </section>

      <section className="rounded-2xl border border-ink/10 bg-[#eef1e7] p-6 shadow-sm">
        <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Allocation scenario</div>
        <h2 className="font-display text-[32px] leading-[0.95]">Protect the {workspace.pick.wave} promise.</h2>
        <p className="mt-3 text-[12px] leading-relaxed text-ink/57">{workspace.command.copy}</p>
        <div className="mt-7 space-y-5">
          <div className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage/20 text-sage-dark"><ShieldAlert className="h-3.5 w-3.5" /></span>
            <div>
              <div className="text-[11px] font-semibold">{workspace.orders[0].customer} stays inside the next SLA.</div>
              <div className="mt-1 text-[10px] leading-relaxed text-ink/48">{workspace.orders[0].allocated} units allocate now; the balance follows the shift plan.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal-dark"><Clock3 className="h-3.5 w-3.5" /></span>
            <div>
              <div className="text-[11px] font-semibold">{workspace.orders[2].customer} stays behind the urgent wave.</div>
              <div className="mt-1 text-[10px] leading-relaxed text-ink/48">Promise is revised before {workspace.pick.wave} release.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/8 text-ink/60"><RouteIcon className="h-3.5 w-3.5" /></span>
            <div>
              <div className="text-[11px] font-semibold">No picker rework required.</div>
              <div className="mt-1 text-[10px] leading-relaxed text-ink/48">The active route is already in {workspace.pick.zone}.</div>
            </div>
          </div>
        </div>
        <Button onClick={onResolve} className="mt-8 w-full bg-signal text-ink hover:bg-signal-dark">{decisionResolved ? <><Check className="mr-2 h-4 w-4" /> Recommendation active</> : <>Approve recommended split</>}</Button>
      </section>
    </div>
  </>
}
