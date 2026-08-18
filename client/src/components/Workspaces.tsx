import { Shift, Order } from "@/types/warehouse";
import { shiftWorkspace, shiftDetails } from "@/data/warehouseData";
import { Boxes, Check, ChevronRight, PackageCheck, Route as RouteIcon, Truck, Activity, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip as ChartTooltip, Bar } from "recharts";

export function InventoryPage({ shift }: { shift: Shift }) {
  const workspace = shiftWorkspace[shift];
  return <>
    <div className="mb-8 flex flex-col justify-between gap-5 border-b border-ink/10 pb-7 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Northline FC-01 · Radar</div>
        <h1 className="max-w-3xl font-display text-[42px] leading-[0.95] tracking-[-0.045em] text-ink sm:text-[52px]">Inventory radar</h1>
        <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-ink/55">{shiftDetails[shift].status}. Live stock availability, safety buffer levels, and reorder triggers.</p>
      </div>
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      {workspace.inventory.map(item => (
        <section key={item.sku} className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">{item.sku} · {item.location}</div>
              <h3 className="mt-1 font-display text-[24px] leading-none">{item.name}</h3>
            </div>
            <span className={cn("rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em]", item.tone === "risk" ? "border-signal/40 bg-signal/10 text-signal-dark" : item.tone === "watch" ? "border-[#d8c48c] bg-[#f8f0d8] text-[#80641d]" : "border-sage/50 bg-sage/15 text-sage-dark")}>
              {item.health}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-[#f7f1e6] p-4 text-center font-mono">
            <div><div className="text-[8px] uppercase tracking-[0.15em] text-ink/42">Available</div><div className="mt-1 text-[18px] font-bold">{item.available}</div></div>
            <div><div className="text-[8px] uppercase tracking-[0.15em] text-ink/42">Reserved</div><div className="mt-1 text-[18px] font-bold">{item.reserved}</div></div>
            <div><div className="text-[8px] uppercase tracking-[0.15em] text-ink/42">Inbound</div><div className="mt-1 text-[18px] font-bold">{item.inbound}</div></div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-[10px] text-ink/50 font-mono"><span>Floor buffer level</span><span>{item.available} / {item.floor * 2} units</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/8">
              <div className={cn("h-full rounded-full", item.tone === "risk" ? "bg-signal" : item.tone === "watch" ? "bg-[#c6a535]" : "bg-sage")} style={{ width: `${Math.min(100, (item.available / (item.floor * 2)) * 100)}%` }} />
            </div>
          </div>
        </section>
      ))}
    </div>
  </>
}

export function PickPage({ waveReleased, onRelease, shift }: { waveReleased: boolean; onRelease: () => void; shift: Shift }) {
  const workspace = shiftWorkspace[shift];
  return <>
    <div className="mb-8 flex flex-col justify-between gap-5 border-b border-ink/10 pb-7 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Northline FC-01 · Route execution</div>
        <h1 className="max-w-3xl font-display text-[42px] leading-[0.95] tracking-[-0.045em] text-ink sm:text-[52px]">Pick & pack management</h1>
        <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-ink/55">Optimized routing sequence for Shift {shift}. Wave {workspace.pick.wave} in {workspace.pick.zone} removes {workspace.pick.travel} of duplicate travel.</p>
      </div>
      <Button onClick={onRelease} className={cn("font-semibold", waveReleased ? "bg-sage text-white" : "bg-signal text-ink hover:bg-signal-dark")}>
        {waveReleased ? <><Check className="mr-2 h-4 w-4" /> {workspace.pick.wave} Released</> : <>Release wave {workspace.pick.wave} <RouteIcon className="ml-2 h-4 w-4" /></>}
      </Button>
    </div>
    <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
      <section className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
        <div className="flex items-center justify-between">
          <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Active Zone</div><h2 className="mt-1 font-display text-[28px] leading-none">{workspace.pick.zone}</h2></div>
          <span className="font-mono text-[10px] text-signal-dark">{workspace.pick.pickers} pickers active</span>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-ink/65">{workspace.pick.copy}</p>
        <div className="mt-7 grid grid-cols-3 gap-4 rounded-xl bg-[#f7f1e6] p-4 text-center font-mono">
          <div><div className="text-[8px] uppercase tracking-[0.15em] text-ink/42">Wave</div><div className="mt-1 text-[16px] font-bold">{workspace.pick.wave}</div></div>
          <div><div className="text-[8px] uppercase tracking-[0.15em] text-ink/42">Travel Saved</div><div className="mt-1 text-[16px] font-bold text-sage-dark">{workspace.pick.travel}</div></div>
          <div><div className="text-[8px] uppercase tracking-[0.15em] text-ink/42">Pack Queue</div><div className="mt-1 text-[16px] font-bold">{workspace.pick.packQueue} orders</div></div>
        </div>
      </section>
      <section className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Workflow Status</div>
        <h2 className="mt-1 font-display text-[28px] leading-none">Execution state</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-sage" /><span className="text-[12px] font-semibold">Zoning & clustering complete</span></div>
          <div className="flex items-center gap-3"><span className={cn("h-2.5 w-2.5 rounded-full", waveReleased ? "bg-sage animate-pulse" : "bg-signal")} /><span className="text-[12px] font-semibold">{waveReleased ? "Wave released to handheld scanners" : "Awaiting wave release approval"}</span></div>
          <div className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-ink/20" /><span className="text-[12px] font-semibold">Quality check station staged</span></div>
        </div>
      </section>
    </div>
  </>
}

export function DispatchPage({ shift }: { shift: Shift }) {
  const workspace = shiftWorkspace[shift];
  return <>
    <div className="mb-8 flex flex-col justify-between gap-5 border-b border-ink/10 pb-7 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Northline FC-01 · Outbound</div>
        <h1 className="max-w-3xl font-display text-[42px] leading-[0.95] tracking-[-0.045em] text-ink sm:text-[52px]">Dispatch board</h1>
        <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-ink/55">{workspace.dispatch.headline}</p>
      </div>
    </div>
    <div className="grid gap-5 md:grid-cols-3">
      <section className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Dock 01 · Express Van</div>
        <h3 className="mt-1 font-display text-[24px] leading-none">Manifest lock: {workspace.dispatch.lock}</h3>
        <p className="mt-3 text-[11px] leading-relaxed text-ink/60">{workspace.dispatch.copy}</p>
        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4 font-mono text-[10px]">
          <span className="text-ink/50">Status</span><span className="font-semibold text-sage-dark">{workspace.dispatch.onTime} on-time</span>
        </div>
      </section>
      <section className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Dock 02 · Priority Cage</div>
        <h3 className="mt-1 font-display text-[24px] leading-none">Cut-off: {workspace.dispatch.cutoff}</h3>
        <p className="mt-3 text-[11px] leading-relaxed text-ink/60">Quality check queue has {workspace.dispatch.pending} orders remaining before loading.</p>
        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4 font-mono text-[10px]">
          <span className="text-ink/50">Pending QC</span><span className="font-semibold text-signal-dark">{workspace.dispatch.pending} orders</span>
        </div>
      </section>
      <section className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Dock 03 · Bulk Ground</div>
        <h3 className="mt-1 font-display text-[24px] leading-none">{workspace.dispatch.sealed} sealed</h3>
        <p className="mt-3 text-[11px] leading-relaxed text-ink/60">Overnight dispatch staging is stable and moving inside the operating plan.</p>
        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4 font-mono text-[10px]">
          <span className="text-ink/50">Verification</span><span className="font-semibold text-sage-dark">100% scan match</span>
        </div>
      </section>
    </div>
  </>
}

export function AnalyticsPage({ shift }: { shift: Shift }) {
  const workspace = shiftWorkspace[shift];
  return <>
    <div className="mb-8 flex flex-col justify-between gap-5 border-b border-ink/10 pb-7 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Northline FC-01 · Metrics</div>
        <h1 className="max-w-3xl font-display text-[42px] leading-[0.95] tracking-[-0.045em] text-ink sm:text-[52px]">Flow analysis</h1>
        <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-ink/55">{workspace.analytics.targetCopy}</p>
      </div>
    </div>
    <section className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)] sm:p-8">
      <div className="flex items-center justify-between">
        <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Hourly throughput</div><h2 className="mt-1 font-display text-[28px] leading-none">Orders per hour · Shift {shift}</h2></div>
        <span className="font-mono text-[10px] text-sage-dark">{workspace.analytics.change}</span>
      </div>
      <div className="mt-8 h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={workspace.throughput}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5dec9" vertical={false} />
            <XAxis dataKey="hour" stroke="#8c826e" fontSize={11} tickLine={false} />
            <YAxis stroke="#8c826e" fontSize={11} tickLine={false} axisLine={false} />
            <ChartTooltip contentStyle={{ background: "#0f2837", border: "none", borderRadius: "12px", color: "#fbf5e9" }} />
            <Bar dataKey="orders" fill="#e7a83b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  </>
}

export function OrderDrawer({ order, onClose }: { order: Order; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex justify-end">
    <button aria-label="Close order details" className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]" onClick={onClose} />
    <aside className="relative h-full w-full max-w-[480px] overflow-y-auto border-l border-ink/10 bg-paper p-6 shadow-[-20px_0_70px_rgba(15,40,55,0.16)] sm:p-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Order detail · {order.id}</div>
          <h2 className="font-display text-[38px] leading-[0.92] tracking-[-0.04em]">{order.customer}</h2>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/42">{order.sku} · {order.product}</div>
        </div>
        <button onClick={onClose} className="rounded-xl border border-ink/10 p-2 text-ink/45 transition hover:bg-ink/5 hover:text-ink" aria-label="Close"><X className="h-4 w-4" /></button>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[#f7f1e6] p-4"><div className="font-mono text-[8px] uppercase tracking-[0.15em] text-ink/38">Promise</div><div className="mt-2 font-display text-[28px] leading-none">{order.promise}</div><div className="mt-1 text-[10px] text-ink/45">{order.carrier}</div></div>
        <div className="rounded-xl bg-[#f7f1e6] p-4"><div className="font-mono text-[8px] uppercase tracking-[0.15em] text-ink/38">Allocated</div><div className="mt-2 font-display text-[28px] leading-none">{order.allocated} / {order.units}</div><div className="mt-1 text-[10px] text-ink/45">{order.status}</div></div>
      </div>
      <div className="mt-7">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/38">Decision context</div>
        <div className="mt-3 rounded-2xl border border-signal/25 bg-signal/8 p-5">
          <div className="flex gap-3">
            <span className="text-signal-dark"><PackageCheck className="h-4 w-4" /></span>
            <div><div className="text-[12px] font-semibold">{order.risk === "At risk" ? "Allocation decision required" : "Order is moving inside plan"}</div><div className="mt-2 text-[11px] leading-relaxed text-ink/57">{order.note}</div></div>
          </div>
        </div>
      </div>
    </aside>
  </div>;
}
