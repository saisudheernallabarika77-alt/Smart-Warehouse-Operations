import { shiftDetails, shiftWorkspace } from "@/data/warehouseData";
import { Shift, View } from "@/types/warehouse";

export type AssistantEvidence = {
  label: string;
  value: string;
};

export type AssistantAnswer = {
  title: string;
  body: string;
  evidence: AssistantEvidence[];
  actionLabel: string;
  navigateTo?: View;
  tone: "signal" | "sage" | "ink";
};

const normalize = (value: string) => value.toLowerCase().replace(/[?!.:,]/g, " ").replace(/\s+/g, " ").trim();

export function getAssistantPrompts(shift: Shift) {
  const workspace = shiftWorkspace[shift];
  return [
    `What should Shift ${shift} do next?`,
    `Which order is at risk in Shift ${shift}?`,
    `Explain the ${workspace.inventory[0].sku} stock risk`,
    "Show dispatch and SLA status",
  ];
}

export function answerWarehouseQuestion(question: string, shift: Shift): AssistantAnswer {
  const q = normalize(question);
  const workspace = shiftWorkspace[shift];
  const details = shiftDetails[shift];
  const leadOrder = workspace.orders.find(order => order.risk === "At risk") ?? workspace.orders[0];
  const riskItem = workspace.inventory.find(item => item.tone === "risk") ?? workspace.inventory[0];

  if (!q || q.length < 2) {
    return {
      title: "Ask WarehouseIQ a question",
      body: "Type an operational question about the active shift. I can explain risk, inventory, order priority, picking, dispatch, analytics, or the next recommended action.",
      evidence: [{ label: "Active context", value: `Shift ${shift} · ${details.time}` }],
      actionLabel: "Try a suggested question",
      tone: "ink",
    };
  }

  if (/(help|what can|ask|commands|topics)/.test(q)) {
    return {
      title: "WarehouseIQ can explain the whole operation",
      body: `For Shift ${shift}, ask about the urgent order, stock availability, pick wave ${workspace.pick.wave}, carrier cut-off ${workspace.dispatch.cutoff}, bottleneck ${workspace.analytics.bottleneck}, or the recommended next move. Answers are generated from this project's shift-specific demo data.`,
      evidence: [
        { label: "Orders in motion", value: workspace.command.orders },
        { label: "Floor capacity", value: workspace.command.capacity },
        { label: "Current constraint", value: workspace.analytics.bottleneck },
      ],
      actionLabel: "Open AI Prediction overview",
      navigateTo: "prediction",
      tone: "sage",
    };
  }

  if (/(what should|next|recommend|recommendation|decision|do now|action)/.test(q)) {
    return {
      title: `Recommended next move for Shift ${shift}`,
      body: `${workspace.prediction.recommendation} This is the highest-value action because it addresses ${workspace.analytics.bottleneck} before the ${workspace.dispatch.cutoff} operating hand-off.`,
      evidence: [
        { label: "AI confidence", value: `${workspace.prediction.confidence}%` },
        { label: "Expected impact", value: workspace.prediction.expectedImpact },
        { label: "Pick wave", value: `${workspace.pick.wave} · ${workspace.pick.zone}` },
      ],
      actionLabel: workspace.prediction.actionLabel,
      navigateTo: "prediction",
      tone: "signal",
    };
  }

  if (/(risk|urgent|priority|at risk|order|sla|promise|customer)/.test(q)) {
    return {
      title: `${leadOrder.id} is the priority decision`,
      body: `${leadOrder.customer} needs ${leadOrder.units} units of ${leadOrder.sku}, with ${leadOrder.allocated} currently allocated. Its status is ${leadOrder.status.toLowerCase()} and its promise is ${leadOrder.promise}. ${leadOrder.note}`,
      evidence: [
        { label: "Priority", value: leadOrder.priority },
        { label: "Customer promise", value: `${leadOrder.promise} · ${leadOrder.carrier}` },
        { label: "Decision", value: workspace.prediction.recommendation },
      ],
      actionLabel: "Open order queue",
      navigateTo: "orders",
      tone: "signal",
    };
  }

  if (/(inventory|stock|sku|available|reserved|inbound|reorder|luma|helios|arc|nova)/.test(q)) {
    return {
      title: `${riskItem.sku} is the lead inventory signal`,
      body: `${riskItem.name} has ${riskItem.available} available, ${riskItem.reserved} reserved, and ${riskItem.inbound} inbound at ${riskItem.location}. Its floor buffer is ${riskItem.floor} units, so WarehouseIQ marks it ${riskItem.health.toLowerCase()}.`,
      evidence: [
        { label: "Available now", value: `${riskItem.available} units` },
        { label: "Reserved", value: `${riskItem.reserved} units` },
        { label: "Inbound", value: `${riskItem.inbound} units` },
      ],
      actionLabel: "Review inventory radar",
      navigateTo: "inventory",
      tone: "signal",
    };
  }

  if (/(pick|pack|wave|route|picker|travel|zone)/.test(q)) {
    return {
      title: `${workspace.pick.wave} is the active pick decision`,
      body: `${workspace.pick.copy} The route is ${workspace.pick.route}, with ${workspace.pick.pickers} active pickers and ${workspace.pick.packQueue} orders waiting in the pack queue.`,
      evidence: [
        { label: "Active wave", value: workspace.pick.wave },
        { label: "Route", value: workspace.pick.route },
        { label: "Travel removed", value: workspace.pick.travel },
      ],
      actionLabel: "Open pick & pack",
      navigateTo: "pick",
      tone: "sage",
    };
  }

  if (/(dispatch|carrier|dock|cut off|cutoff|manifest|shipping|shipment|handoff|hand off)/.test(q)) {
    return {
      title: `Dispatch is ${workspace.dispatch.onTime} on-time for Shift ${shift}`,
      body: `${workspace.dispatch.headline} The next cut-off is ${workspace.dispatch.cutoff}; ${workspace.dispatch.pending} orders remain in quality check and the manifest lock is in ${workspace.dispatch.lock}.`,
      evidence: [
        { label: "Next cut-off", value: workspace.dispatch.cutoff },
        { label: "Pending quality checks", value: workspace.dispatch.pending },
        { label: "Manifest status", value: workspace.dispatch.sealed },
      ],
      actionLabel: "Open dispatch board",
      navigateTo: "dispatch",
      tone: "sage",
    };
  }

  if (/(analytic|throughput|capacity|bottleneck|performance|metric|orders per hour)/.test(q)) {
    return {
      title: `${workspace.analytics.bottleneck} is the current bottleneck`,
      body: `${workspace.analytics.targetCopy} Shift ${shift} is running at ${workspace.command.capacity} floor capacity with ${workspace.command.orders} orders in motion. The shift's recoverable window is ${workspace.command.recoverable}.`,
      evidence: [
        { label: "Bottleneck", value: workspace.analytics.bottleneck },
        { label: "Floor capacity", value: workspace.command.capacity },
        { label: "Recoverable now", value: workspace.command.recoverable },
      ],
      actionLabel: "Open flow analysis",
      navigateTo: "analytics",
      tone: "ink",
    };
  }

  return {
    title: `I found the active Shift ${shift} context`,
    body: `The main signal is ${workspace.analytics.bottleneck}. ${workspace.prediction.summary} Try asking “what should we do next?”, “which order is at risk?”, “show inventory”, or “explain dispatch status” for a more specific answer.`,
    evidence: [
      { label: "Shift", value: `${shift} · ${details.label} · ${details.time}` },
      { label: "Orders active", value: workspace.command.orders },
      { label: "AI confidence", value: `${workspace.prediction.confidence}%` },
    ],
    actionLabel: "Open AI Prediction overview",
    navigateTo: "prediction",
    tone: "ink",
  };
}
