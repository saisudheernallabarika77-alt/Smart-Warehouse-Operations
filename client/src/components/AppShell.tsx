import { View, Shift } from "@/types/warehouse";
import { shiftWorkspace, shiftDetails } from "@/data/warehouseData";
import { Activity, Boxes, Check, ChevronRight, CircleUserRound, Command, KeyRound, ListFilter, MapPin, Menu, Route as RouteIcon, ShieldCheck, Sparkles, Truck, Warehouse, X, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const navItems: Array<{ id: View; label: string; icon: typeof Command; count?: string }> = [
  { id: "prediction", label: "AI Prediction", icon: Sparkles, count: "AI" },
  { id: "command", label: "Command desk", icon: Command },
  { id: "orders", label: "Order queue", icon: ListFilter, count: "8" },
  { id: "inventory", label: "Inventory", icon: Boxes, count: "3" },
  { id: "pick", label: "Pick & pack", icon: RouteIcon, count: "14" },
  { id: "dispatch", label: "Dispatch", icon: Truck, count: "2" },
  { id: "analytics", label: "Analytics", icon: Activity },
];

function ShiftMenu({ shift, onChange, className }: { shift: Shift; onChange: (shift: Shift) => void; className?: string }) {
  const [open, setOpen] = useState(false);
  return <div className={cn("relative", className)}>
    <button type="button" className="flex items-center gap-2 rounded-full border border-ink/10 px-3 py-1.5 text-[10px] font-semibold" onClick={() => setOpen(current => !current)} aria-haspopup="menu" aria-expanded={open}>
      <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Shift {shift} <span className="font-mono text-ink/45">{shiftDetails[shift].time.split("–")[0]}</span><ChevronRight className={cn("h-3 w-3 text-ink/35 transition", open ? "rotate-90" : "rotate-0")} />
    </button>
    {open ? <div role="menu" className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 rounded-2xl border border-ink/10 bg-paper p-2 text-ink shadow-[0_18px_50px_rgba(15,40,55,0.18)]">
      <div className="px-3 pb-2 pt-2 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/40">Change operating shift</div>
      {(["A", "B", "C"] as Shift[]).map(option => <button type="button" role="menuitem" key={option} onClick={() => { onChange(option); setOpen(false); toast.success(`Shift ${option} selected`, { description: `${shiftDetails[option].label} shift · ${shiftDetails[option].status}` }); }} className={cn("flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-[#f7f1e6]", shift === option && "bg-[#f7f1e6]")}><span className={cn("mt-0.5 flex h-6 w-6 items-center justify-center rounded-full font-mono text-[9px] font-bold", shift === option ? "bg-signal text-ink" : "bg-ink/7 text-ink/55")}>{option}</span><span className="min-w-0 flex-1"><span className="block text-[11px] font-semibold">Shift {option} · {shiftDetails[option].label}</span><span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.12em] text-ink/40">{shiftDetails[option].time}</span><span className="mt-1 block text-[10px] text-ink/45">{shiftDetails[option].status}</span></span>{shift === option ? <Check className="mt-1 h-3.5 w-3.5 text-sage-dark" /> : null}</button>)}
    </div> : null}
  </div>;
}

function AccountPanel({ shift, onClose }: { shift: Shift; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
    <button type="button" aria-label="Close account details" className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]" onClick={onClose} />
    <aside role="dialog" aria-modal="true" aria-labelledby="account-panel-title" className="relative h-full w-full max-w-[430px] overflow-y-auto border-l border-ink/10 bg-paper p-6 shadow-[-20px_0_70px_rgba(15,40,55,0.16)] sm:p-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Account workspace</div>
          <h2 id="account-panel-title" className="font-display text-[40px] leading-[0.92] tracking-[-0.04em]">Sudheer</h2>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/42">Fulfillment lead · Demo session</div>
        </div>
        <button type="button" onClick={onClose} className="rounded-xl border border-ink/10 p-2 text-ink/45 transition hover:bg-ink/5 hover:text-ink" aria-label="Close account details"><X className="h-4 w-4" /></button>
      </div>
      <div className="mt-8 flex items-center gap-4 rounded-2xl bg-ink p-5 text-white">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal text-lg font-bold text-ink">SD</span>
        <div><div className="font-display text-[24px] leading-none">Sudheer</div><div className="mt-1 text-[11px] text-white/55">WarehouseIQ operations account</div></div>
        <ShieldCheck className="ml-auto h-5 w-5 text-sage" />
      </div>
      <div className="mt-7">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/38">Account details</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-[#f7f1e6] p-4"><div className="flex items-center gap-2 text-ink/42"><KeyRound className="h-3.5 w-3.5" /><span className="font-mono text-[8px] uppercase tracking-[0.16em]">Role</span></div><div className="mt-2 text-[12px] font-semibold">Fulfillment Lead</div></div>
          <div className="rounded-2xl border border-ink/10 bg-[#f7f1e6] p-4"><div className="flex items-center gap-2 text-ink/42"><MapPin className="h-3.5 w-3.5" /><span className="font-mono text-[8px] uppercase tracking-[0.16em]">Warehouse</span></div><div className="mt-2 text-[12px] font-semibold">Northline FC-01</div><div className="mt-1 text-[10px] text-ink/45">Manchester</div></div>
          <div className="rounded-2xl border border-ink/10 bg-[#f7f1e6] p-4"><div className="flex items-center gap-2 text-ink/42"><Boxes className="h-3.5 w-3.5" /><span className="font-mono text-[8px] uppercase tracking-[0.16em]">Active shift</span></div><div className="mt-2 text-[12px] font-semibold">Shift {shift} · {shiftDetails[shift].label}</div><div className="mt-1 text-[10px] text-ink/45">{shiftDetails[shift].time}</div></div>
          <div className="rounded-2xl border border-ink/10 bg-[#f7f1e6] p-4"><div className="flex items-center gap-2 text-ink/42"><CircleUserRound className="h-3.5 w-3.5" /><span className="font-mono text-[8px] uppercase tracking-[0.16em]">Access scope</span></div><div className="mt-2 text-[12px] font-semibold">Operations control room</div><div className="mt-1 text-[10px] text-ink/45">Shift-aware workspace access</div></div>
        </div>
      </div>
      <div className="mt-7">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/38">Login details</div>
        <div className="mt-3 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white/45 px-4">
          <div className="flex items-center justify-between gap-4 py-3 text-[11px]"><span className="text-ink/48">Login state</span><span className="font-semibold text-sage-dark">Active demo session</span></div>
          <div className="flex items-center justify-between gap-4 py-3 text-[11px]"><span className="text-ink/48">Authentication</span><span className="font-semibold text-ink">Frontend demo mode</span></div>
          <div className="flex items-center justify-between gap-4 py-3 text-[11px]"><span className="text-ink/48">Credentials</span><span className="font-semibold text-ink">Not stored</span></div>
        </div>
      </div>
      <div className="mt-7 rounded-2xl border border-signal/25 bg-signal/8 p-5">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-signal-dark" />
          <div><div className="text-[12px] font-semibold">Demo Session</div><div className="mt-2 text-[11px] leading-relaxed text-ink/57">This hackathon build uses sample warehouse data and frontend state. A real backend login, password, and identity provider are not connected, so no sensitive credentials are shown or stored here.</div></div>
        </div>
      </div>
      <button type="button" onClick={onClose} className="mt-7 flex w-full items-center justify-center rounded-xl bg-ink px-4 py-3 text-[11px] font-semibold text-paper transition hover:bg-ink/90">Close account details</button>
    </aside>
  </div>;
}

interface AppShellProps {
  view: View;
  setView: (view: View) => void;
  children: React.ReactNode;
  shift: Shift;
  onShiftChange: (shift: Shift) => void;
}

export function AppShell({ view, setView, children, shift, onShiftChange }: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const workspace = shiftWorkspace[shift];
  const handleNavigation = (nextView: View) => { setView(nextView); setMobileNavOpen(false); };

  return (
    <div className="min-h-screen bg-paper text-ink lg:flex">
      <aside className="sticky top-0 z-30 hidden h-screen w-[250px] shrink-0 flex-col overflow-y-auto bg-ink px-5 py-4 text-white lg:flex">
        <button className="flex items-center gap-3 text-left" onClick={() => setView("command")} aria-label="Go to Command desk">
          <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-signal p-2 shadow-[0_8px_24px_rgba(231,168,59,0.2)]">
            <img src="/manus-storage/warehouseiq-route-mark_89e4c0e0.png" alt="WarehouseIQ route mark" className="h-full w-full object-contain" />
          </span>
          <span>
            <span className="block font-display text-[22px] italic leading-none tracking-[-0.04em]">Warehouse<span className="text-signal">IQ</span></span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">Flow command</span>
          </span>
        </button>

        <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3">
          <span className="flex items-center gap-2.5"><Warehouse className="h-4 w-4 text-signal" /><span><span className="block text-[12px] font-semibold">Northline Fulfillment</span><span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">FC-01 · Manchester</span></span></span>
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">Active</span>
        </div>

        <div className="mt-6">
          <div className="mb-3 px-3 font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">Operations</div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return <button key={item.id} onClick={() => handleNavigation(item.id)} className={cn("group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] transition", active ? "bg-[#fbf5e9] font-semibold text-ink shadow-[0_8px_20px_rgba(0,0,0,0.12)]" : "text-white/63 hover:bg-white/[0.08] hover:text-white")}><Icon className={cn("h-4 w-4", active ? "text-signal" : "text-white/45 group-hover:text-signal")} /><span className="flex-1">{item.label}</span>{item.count ? <span className={cn("rounded-full px-1.5 py-0.5 font-mono text-[9px]", active ? "bg-ink/10 text-ink/65" : item.count === "AI" ? "bg-signal text-ink font-bold" : "bg-white/10 text-white/50")}>{item.count}</span> : null}</button>;
            })}
          </nav>
        </div>

        <div className="mt-auto shrink-0 pt-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/40"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" /> Live shift status</div>
            <div className="mt-2 font-display text-[18px] leading-[1.02]">{shiftDetails[shift].label} shift · {workspace.analytics.bottleneck}.</div>
            <div className="mt-2 text-[10px] leading-relaxed text-white/48">{workspace.command.orders} orders active · {workspace.command.capacity} floor capacity.</div>
          </div>
          <button type="button" onClick={() => setAccountOpen(true)} className="mt-4 flex w-full shrink-0 items-center gap-3 border-t border-white/10 pt-4 text-left transition hover:text-signal" aria-label="Open Sudheer account details"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-[11px] font-bold text-ink">SD</span><span><span className="block text-[11px] font-semibold">Sudheer</span><span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/38">Fulfillment lead</span></span><CircleUserRound className="ml-auto h-4 w-4 text-white/35" /></button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-ink/10 bg-paper px-5 py-3 lg:hidden">
          <button onClick={() => setView("command")} className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal p-1.5"><img src="/manus-storage/warehouseiq-route-mark_89e4c0e0.png" alt="" /></span><span className="font-display text-lg italic">Warehouse<span className="text-signal-dark">IQ</span></span></button>
          <button type="button" className="rounded-lg border border-ink/10 p-2" onClick={() => setMobileNavOpen(current => !current)} aria-label="Open operations menu" aria-expanded={mobileNavOpen}><Menu className="h-4 w-4" /></button>
        </div>
        <header className="flex h-[76px] items-center justify-between border-b border-ink/10 px-5 sm:px-8">
          <div className="flex items-center gap-3 text-[11px] text-ink/48"><span className="font-mono uppercase tracking-[0.18em]">Northline FC-01</span><span className="h-1 w-1 rounded-full bg-signal" /><span>Tuesday, 14 October</span><span className="hidden text-ink/30 sm:inline">·</span><span className="hidden font-mono uppercase tracking-[0.16em] text-ink/42 sm:inline">Shift {shift} · {shiftDetails[shift].time}</span></div>
          <div className="flex items-center gap-2"><ShiftMenu shift={shift} onChange={onShiftChange} className="hidden sm:block" /></div>
        </header>
        {mobileNavOpen ? <div className="fixed inset-0 z-40 bg-ink/25 lg:hidden" onClick={() => setMobileNavOpen(false)}><aside className="h-full w-[290px] bg-ink p-5 text-white shadow-[18px_0_60px_rgba(15,40,55,0.2)]" onClick={event => event.stopPropagation()}><div className="flex items-center justify-between"><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">Operations menu</div><button type="button" onClick={() => setMobileNavOpen(false)} className="rounded-lg p-2 text-white/55 hover:bg-white/10 hover:text-white" aria-label="Close operations menu"><X className="h-4 w-4" /></button></div><div className="mt-5"><ShiftMenu shift={shift} onChange={onShiftChange} className="block" /></div><nav className="mt-6 space-y-1.5">{navItems.map(item => { const Icon = item.icon; const active = view === item.id; return <button type="button" key={item.id} onClick={() => handleNavigation(item.id)} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[12px] transition", active ? "bg-[#fbf5e9] font-semibold text-ink" : "text-white/65 hover:bg-white/[0.08] hover:text-white")}><Icon className={cn("h-4 w-4", active ? "text-signal" : "text-white/45")} /><span className="flex-1">{item.label}</span>{item.count ? <span className={cn("rounded-full px-1.5 py-0.5 font-mono text-[9px]", active ? "bg-ink/10 text-ink/65" : item.count === "AI" ? "bg-signal text-ink font-bold" : "bg-white/10 text-white/50")}>{item.count}</span> : null}</button>; })}</nav><button type="button" onClick={() => { setAccountOpen(true); setMobileNavOpen(false); }} className="mt-7 flex w-full items-center gap-3 border-t border-white/10 pt-5 text-left text-white/75 transition hover:text-signal" aria-label="Open Sudheer account details"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-[11px] font-bold text-ink">SD</span><span><span className="block text-[11px] font-semibold text-white">Sudheer</span><span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/38">Fulfillment lead</span></span><CircleUserRound className="ml-auto h-4 w-4 text-white/35" /></button><div className="mt-6 text-[11px] leading-relaxed text-white/45">Tap any workspace to switch views. Shift changes apply to the active control-room context.</div></aside></div> : null}
        <main className="px-5 pb-14 pt-8 sm:px-8 lg:px-10">{children}</main>
      </div>
      {accountOpen ? <AccountPanel shift={shift} onClose={() => setAccountOpen(false)} /> : null}
    </div>
  );
}
