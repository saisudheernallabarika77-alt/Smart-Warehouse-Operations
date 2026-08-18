import { useEffect, useMemo, useState } from "react";
import { Shift, View } from "@/types/warehouse";
import { shiftWorkspace, shiftDetails } from "@/data/warehouseData";
import { answerWarehouseQuestion, AssistantAnswer, getAssistantPrompts } from "@/lib/warehouseAssistant";
import { AlertTriangle, ArrowUpRight, Brain, Check, ChevronRight, Cpu, MessageCircle, RotateCcw, Send, Sparkles, TrendingUp, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  answer?: AssistantAnswer;
};

interface AiPredictionWorkspaceProps {
  shift: Shift;
  onResolve: () => void;
  decisionResolved: boolean;
  onNavigate: (view: View) => void;
}

function getWelcomeMessage(shift: Shift): ChatMessage {
  const workspace = shiftWorkspace[shift];
  return {
    id: `welcome-${shift}`,
    role: "assistant",
    text: `I am WarehouseIQ Copilot for Shift ${shift} · ${shiftDetails[shift].label}. Ask me anything about orders, inventory, picking, dispatch, analytics, or the next recommended decision.`,
    answer: {
      title: "Project context loaded",
      body: `${workspace.command.orders} orders are active at ${workspace.command.capacity} floor capacity. The current signal is ${workspace.analytics.bottleneck}.`,
      evidence: [
        { label: "Active shift", value: `${shift} · ${shiftDetails[shift].time}` },
        { label: "Current bottleneck", value: workspace.analytics.bottleneck },
        { label: "AI confidence", value: `${workspace.prediction.confidence}%` },
      ],
      actionLabel: "Open command desk",
      navigateTo: "command",
      tone: "sage",
    },
  };
}

export function AiPredictionWorkspace({ shift, onResolve, decisionResolved, onNavigate }: AiPredictionWorkspaceProps) {
  const workspace = shiftWorkspace[shift];
  const [question, setQuestion] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([getWelcomeMessage(shift)]);
  const prompts = useMemo(() => getAssistantPrompts(shift), [shift]);

  useEffect(() => {
    setMessages([getWelcomeMessage(shift)]);
    setQuestion("");
    setTyping(false);
  }, [shift]);

  const submitQuestion = (value = question) => {
    const trimmed = value.trim();
    if (!trimmed || typing) return;
    const answer = answerWarehouseQuestion(trimmed, shift);
    const userMessage: ChatMessage = { id: `user-${Date.now()}`, role: "user", text: trimmed };
    setMessages(current => [...current, userMessage]);
    setQuestion("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages(current => [...current, { id: `assistant-${Date.now()}`, role: "assistant", text: "Here is the clearest answer from the current WarehouseIQ operating data:", answer }]);
      setTyping(false);
    }, 420);
  };

  const resetChat = () => {
    setMessages([getWelcomeMessage(shift)]);
    setQuestion("");
    setTyping(false);
  };

  const executeAnswerAction = (answer: AssistantAnswer) => {
    if (answer.actionLabel.toLowerCase().includes("approve") || answer.actionLabel.toLowerCase().includes("execute") || answer.actionLabel.toLowerCase().includes("verify")) {
      onResolve();
      toast.success("WarehouseIQ recommendation applied", { description: `Shift ${shift} decision state updated.` });
    }
    if (answer.navigateTo) onNavigate(answer.navigateTo);
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-ink p-6 text-white sm:p-8">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-signal/15 blur-3xl" />
        <div className="absolute right-32 bottom-0 h-48 w-48 rounded-full bg-sage/15 blur-2xl" />
        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-signal"><Sparkles className="h-3.5 w-3.5" />WarehouseIQ Decision Intelligence · AI Prediction Engine</div>
            <h1 className="mt-3 font-display text-[36px] leading-[0.95] tracking-[-0.04em] sm:text-[46px]">Your warehouse<br />decision copilot.</h1>
            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-white/70">Ask one question and get the risk, evidence, recommended action, and impact for the active shift—without opening every module.</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md lg:items-end"><div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">AI confidence score</div><div className="font-display text-[40px] leading-none text-signal">{workspace.prediction.confidence}%</div><div className="font-mono text-[9px] text-sage">Shift {shift} · {shiftDetails[shift].time}</div></div>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-[0_12px_40px_rgba(15,40,55,0.06)]">
        <div className="flex flex-col justify-between gap-4 border-b border-ink/10 bg-[#f7f1e6] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-signal"><Brain className="h-5 w-5" /></span><div><div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-signal-dark"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" />WarehouseIQ Copilot · project-aware</div><h2 className="mt-1 font-display text-[28px] leading-none">Ask about this warehouse</h2><p className="mt-2 text-[11px] text-ink/50">Answers use Shift {shift} orders, inventory, pick routes, dispatch timing, and analytics.</p></div></div>
          <button type="button" onClick={resetChat} className="flex items-center gap-1.5 self-start text-[10px] font-semibold text-ink/48 transition hover:text-ink sm:self-center"><RotateCcw className="h-3.5 w-3.5" /> Clear conversation</button>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="min-h-[410px] border-b border-ink/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="max-h-[365px] space-y-4 overflow-y-auto pr-1" aria-live="polite">
              {messages.map(message => <div key={message.id} className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
                {message.role === "assistant" ? <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-signal"><Sparkles className="h-3.5 w-3.5" /></span> : null}
                <div className={cn("max-w-[88%]", message.role === "user" ? "order-first" : "") }>
                  <div className={cn("rounded-2xl px-4 py-3 text-[11px] leading-relaxed", message.role === "user" ? "rounded-tr-sm bg-signal text-ink" : "rounded-tl-sm bg-[#f7f1e6] text-ink/70")}>{message.text}</div>
                  {message.answer ? <div className="mt-2 rounded-2xl border border-ink/10 bg-white/65 p-4">
                    <div className="flex items-start justify-between gap-3"><div className="font-display text-[20px] leading-none">{message.answer.title}</div><span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", message.answer.tone === "signal" ? "bg-signal" : message.answer.tone === "sage" ? "bg-sage" : "bg-ink/35")} /></div>
                    <p className="mt-2 text-[11px] leading-relaxed text-ink/60">{message.answer.body}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-3">{message.answer.evidence.map(item => <div key={`${message.id}-${item.label}`} className="rounded-xl bg-[#f7f1e6] px-3 py-2"><div className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/38">{item.label}</div><div className="mt-1 text-[10px] font-semibold leading-snug text-ink">{item.value}</div></div>)}</div>
                    <button type="button" onClick={() => executeAnswerAction(message.answer!)} className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold text-signal-dark transition hover:text-ink">{message.answer.actionLabel}<ArrowUpRight className="h-3.5 w-3.5" /></button>
                  </div> : null}
                </div>
                {message.role === "user" ? <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal/25 text-signal-dark"><UserRound className="h-3.5 w-3.5" /></span> : null}
              </div>)}
              {typing ? <div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-signal"><Sparkles className="h-3.5 w-3.5 animate-pulse" /></span><div className="rounded-2xl rounded-tl-sm bg-[#f7f1e6] px-4 py-3 font-mono text-[10px] text-ink/45">Analyzing shift signals…</div></div> : null}
            </div>
            <form onSubmit={event => { event.preventDefault(); submitQuestion(); }} className="mt-5 flex items-center gap-2 rounded-2xl border border-ink/15 bg-white p-2 focus-within:border-signal/70 focus-within:ring-2 focus-within:ring-signal/15">
              <MessageCircle className="ml-2 h-4 w-4 shrink-0 text-ink/35" />
              <input value={question} onChange={event => setQuestion(event.target.value)} placeholder="Ask: Which order is at risk?" className="min-w-0 flex-1 bg-transparent px-2 py-2 text-[12px] text-ink outline-none placeholder:text-ink/35" aria-label="Ask WarehouseIQ a question" />
              <Button type="submit" size="sm" disabled={!question.trim() || typing} className="bg-ink text-paper hover:bg-ink/90"><Send className="h-3.5 w-3.5" /></Button>
            </form>
            <div className="mt-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/36"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Demo AI knowledge layer · no external credentials or private data connected</div>
          </div>
          <div className="bg-[#eef1e7] p-5 sm:p-6">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Try a question</div>
            <div className="mt-3 space-y-2">{prompts.map(prompt => <button key={prompt} type="button" onClick={() => submitQuestion(prompt)} className="group flex w-full items-start justify-between gap-3 rounded-xl border border-ink/10 bg-white/55 px-3 py-3 text-left text-[11px] text-ink/65 transition hover:border-signal/45 hover:bg-white"><span>{prompt}</span><ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-signal-dark" /></button>)}</div>
            <div className="mt-7 rounded-2xl border border-sage/30 bg-sage/10 p-4"><div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-sage-dark"><Check className="h-3.5 w-3.5" />Answer coverage</div><div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[10px] text-ink/60"><span>Orders & SLA</span><span>Inventory risk</span><span>Pick routes</span><span>Dispatch timing</span><span>Shift status</span><span>Analytics</span></div></div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]"><div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Predicted bottleneck</span><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-signal/15 text-signal-dark"><AlertTriangle className="h-4 w-4" /></span></div><div className="mt-4 font-display text-[22px] leading-[1.05]">{workspace.analytics.bottleneck}</div><p className="mt-2 text-[11px] leading-relaxed text-ink/60">{workspace.prediction.primaryRisk}</p><div className="mt-5 flex items-center gap-2 font-mono text-[9px] text-signal-dark"><span className="h-1.5 w-1.5 rounded-full bg-signal" />Shift {shift} · threat level: High</div></div>
        <div className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]"><div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Prescriptive action</span><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sage/15 text-sage-dark"><Brain className="h-4 w-4" /></span></div><div className="mt-4 font-display text-[22px] leading-[1.05]">Optimal resolution</div><p className="mt-2 text-[11px] leading-relaxed text-ink/60">{workspace.prediction.recommendation}</p><div className="mt-5 flex items-center gap-2 font-mono text-[9px] text-sage-dark"><span className="h-1.5 w-1.5 rounded-full bg-sage" />Ready for 1-click execution</div></div>
        <div className="rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_12px_40px_rgba(15,40,55,0.04)]"><div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Simulated impact</span><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink/8 text-ink"><TrendingUp className="h-4 w-4" /></span></div><div className="mt-4 font-display text-[22px] leading-[1.05]">SLA secured</div><p className="mt-2 text-[11px] leading-relaxed text-ink/60">{workspace.prediction.expectedImpact}</p><div className="mt-5 flex items-center gap-2 font-mono text-[9px] text-ink/50"><span className="h-1.5 w-1.5 rounded-full bg-ink/40" />Zero picker rework required</div></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-2xl border border-ink/10 bg-card p-6 sm:p-8"><div className="flex items-center justify-between"><div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Mentor briefing summary</div><h2 className="mt-1 font-display text-[28px] leading-none">End-to-end simulation flow</h2></div><span className="rounded-full bg-signal/15 px-3 py-1 font-mono text-[10px] font-semibold text-signal-dark">Shift {shift} active</span></div><div className="mt-6 space-y-4">{[
          ["Order ingestion & priority ranking", `${workspace.command.orders} orders processed with priority scoring. High-urgency customer SLAs are automatically detected and flagged before picker dispatch.`],
          ["Inventory allocation & stock deficit detection", `Inventory radar detects that ${workspace.analytics.bottleneck} is the leading constraint. The AI engine calculates split allocation to protect priority customer promises.`],
          ["Optimized pick route & packing wave release", `Pick wave ${workspace.pick.wave} in ${workspace.pick.zone} eliminates ${workspace.pick.travel} of duplicate travel across ${workspace.pick.pickers} active pickers.`],
          ["Dispatch hand-off & manifest lock", `Carrier cut-off at ${workspace.dispatch.cutoff} is safeguarded by pre-assigned quality checks and sealed manifest status.`],
        ].map(([title, copy], index) => <div key={title} className="flex items-start gap-4 rounded-xl border border-ink/8 bg-paper p-4"><span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold", index === 1 ? "bg-signal/20 text-signal-dark" : index === 3 ? "bg-sage/20 text-sage-dark" : "bg-ink/8 text-ink")}>{index + 1}</span><div><div className="text-[12px] font-semibold">{title}</div><div className="mt-1 text-[11px] leading-relaxed text-ink/60">{copy}</div></div></div>)}</div></div>
        <div className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-[#f7f1e6] p-6 sm:p-8"><div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Decision execution console</div><h2 className="mt-1 font-display text-[28px] leading-none">Instant resolution</h2><p className="mt-3 text-[12px] leading-relaxed text-ink/65">Review the AI prediction or ask Copilot for more context. When you approve, WarehouseIQ updates the demo order queue, stock buffers, and pick sequence.</p><div className="mt-6 rounded-2xl border border-signal/30 bg-signal/10 p-4"><div className="flex items-center gap-2 font-mono text-[10px] font-semibold text-signal-dark"><Cpu className="h-4 w-4" />Recommended action</div><div className="mt-2 text-[12px] font-semibold text-ink">{workspace.prediction.recommendation}</div><div className="mt-2 text-[11px] text-ink/60">Impact: {workspace.prediction.expectedImpact}</div></div></div><div className="mt-8 space-y-3"><Button onClick={onResolve} disabled={decisionResolved} className={cn("w-full py-6 text-[12px] font-semibold shadow-lg transition", decisionResolved ? "bg-sage text-white hover:bg-sage" : "bg-signal text-ink hover:bg-signal-dark")}>{decisionResolved ? <><Check className="mr-2 h-4 w-4" />AI prediction applied & resolved</> : <><Sparkles className="mr-2 h-4 w-4" />Apply AI recommendation</>}</Button><div className="text-center font-mono text-[9px] text-ink/40">Northline FC-01 · Shift {shift} operations control</div></div></div>
      </div>
    </div>
  );
}
