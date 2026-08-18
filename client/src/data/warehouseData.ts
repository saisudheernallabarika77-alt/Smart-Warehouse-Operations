import { Order, InventoryItem, ThroughputPoint, Shift, ShiftDetail, ShiftWorkspace } from "@/types/warehouse";

export const orders: Order[] = [
  { id: "SO-48219", customer: "Nova Retail", sku: "LUMA-200", product: "Luma task lamp", units: 10, allocated: 7, priority: "URG", status: "Awaiting allocation", risk: "At risk", promise: "16:00", carrier: "Priority outbound", zone: "A-03 / BIN-17", note: "Needs a split allocation decision before the carrier cut-off." },
  { id: "SO-48207", customer: "Swell & Co.", sku: "HELIOS-15", product: "Helios shelf kit", units: 6, allocated: 6, priority: "HIGH", status: "Allocated", risk: "On plan", promise: "16:30", carrier: "Express", zone: "C-12 / BIN-04", note: "Allocation is complete and the route is already in hand." },
  { id: "SO-48196", customer: "Marlowe Market", sku: "LUMA-200", product: "Luma task lamp", units: 5, allocated: 5, priority: "HIGH", status: "Allocated", risk: "Held", promise: "Tomorrow", carrier: "Ground", zone: "A-03 / BIN-17", note: "Reservation can move one day if the urgent order is protected." },
  { id: "SO-48183", customer: "Aster House", sku: "ARC-040", product: "Arc storage bin", units: 2, allocated: 2, priority: "STD", status: "Allocated", risk: "On plan", promise: "Tomorrow", carrier: "Ground", zone: "B-08 / BIN-09", note: "Ready for the next standard pick wave." },
  { id: "SO-48175", customer: "North & Pine", sku: "NOVA-110", product: "Nova packing sleeve", units: 12, allocated: 12, priority: "STD", status: "Picking", risk: "On plan", promise: "Tomorrow", carrier: "Ground", zone: "P-01 / BIN-12", note: "Pick route W-26 is carrying the order through packing." },
  { id: "SO-48162", customer: "Fallow Studio", sku: "HELIOS-15", product: "Helios shelf kit", units: 4, allocated: 4, priority: "STD", status: "Quality check", risk: "On plan", promise: "Tomorrow", carrier: "Express", zone: "QC-01", note: "Quality check is complete; manifest hand-off is next." },
];

export const inventory: InventoryItem[] = [
  { sku: "LUMA-200", name: "Luma task lamp", available: 7, reserved: 5, inbound: 3, floor: 11, location: "A-03 / BIN-17", health: "Reorder now", tone: "risk" },
  { sku: "HELIOS-15", name: "Helios shelf kit", available: 43, reserved: 14, inbound: 0, floor: 18, location: "C-12 / BIN-04", health: "Healthy", tone: "healthy" },
  { sku: "ARC-040", name: "Arc storage bin", available: 18, reserved: 8, inbound: 24, floor: 12, location: "B-08 / BIN-09", health: "Watch", tone: "watch" },
  { sku: "NOVA-110", name: "Nova packing sleeve", available: 92, reserved: 31, inbound: 0, floor: 40, location: "P-01 / BIN-12", health: "Healthy", tone: "healthy" },
];

export const throughput: ThroughputPoint[] = [
  { hour: "08", orders: 44 }, { hour: "09", orders: 58 }, { hour: "10", orders: 39 }, { hour: "11", orders: 63 }, { hour: "12", orders: 68 }, { hour: "13", orders: 55 }, { hour: "14", orders: 61 },
];

export const shiftDetails: Record<Shift, ShiftDetail> = {
  A: { time: "06:00–14:00", label: "Morning", status: "Inbound receiving and replenishment" },
  B: { time: "14:00–22:00", label: "Afternoon", status: "Fulfillment and priority outbound" },
  C: { time: "22:00–06:00", label: "Night", status: "Cycle counts and overnight dispatch" },
};

export const shiftWorkspace: Record<Shift, ShiftWorkspace> = {
  A: {
    orders: orders.map((order, index) => ({ ...order, id: `SA-${48240 - index}`, customer: ["Morrow & Finch", "Oak & Vale", "Lumen Office", "Cedar House", "Northline Studio", "Pine & Parcel"][index], status: index < 2 ? "Awaiting allocation" : index === 2 ? "Allocated" : order.status, promise: index < 2 ? "12:30" : "Today", note: "Morning receiving is still being reconciled before the first wave." })),
    inventory: inventory.map((item, index) => ({ ...item, available: item.available + [8, 12, 5, 18][index], reserved: Math.max(2, item.reserved - [2, 3, 1, 6][index]), inbound: item.inbound + [12, 0, 16, 8][index] })),
    throughput: throughput.map((point, index) => ({ ...point, orders: point.orders + 8 + (index % 2) * 4 })),
    command: { title: "Clear the inbound. Protect the first wave.", copy: "Morning receiving is the constraint: reconcile inbound stock, then release the first pick wave before the 12:30 carrier cut-off.", route: "B-02 / inbound hand-off", travel: "84 m", orders: "36", accuracy: "98.8%", capacity: "64%", recoverable: "24m" },
    pick: { wave: "W-08", zone: "Zones B + C", route: "B-02 / C-12", copy: "Bundle receiving reconciliations with nearby standard orders to avoid a second pass through the inbound lane.", hero: "Inbound is ready for the first wave.", pickers: "4", travel: "84m", packQueue: "6" },
    dispatch: { headline: "Morning manifests have room to breathe.", copy: "Inbound reconciliation is the gating step; once cleared, Dock 02 can absorb the first express cage.", cutoff: "12:30", pending: "4", lock: "38 min", sealed: "9 / 18", onTime: "96%" },
    analytics: { targetCopy: "Morning receiving and first-wave throughput versus a 60-order-per-hour operating target.", bottleneck: "Inbound reconciliation", change: "+18% vs night" },
    prediction: {
      headline: "Morning Inbound Bottleneck & First-Wave SLA Forecast",
      summary: "Inbound reconciliation backlog at Dock 02 will peak at 11:15, threatening the 12:30 carrier cut-off for 3 urgent orders.",
      confidence: 96.4,
      primaryRisk: "Inbound staging congestion slowing down Zone B replenishment.",
      recommendation: "Reallocate 2 pickers from Zone A to Dock 02 inbound audit and release wave W-08 immediately.",
      expectedImpact: "Saves 34 minutes of staging delay and protects 100% of morning express promises.",
      actionLabel: "Execute inbound rebalance",
    },
  },
  B: {
    orders,
    inventory,
    throughput,
    command: { title: "Protect the promise. Keep the floor moving.", copy: "One priority allocation needs a decision before the 16:00 carrier cut-off. Everything else is moving inside today's operating plan.", route: "A-03 / BIN-17", travel: "126 m", orders: "48", accuracy: "99.3%", capacity: "76%", recoverable: "37m" },
    pick: { wave: "W-26", zone: "Zone A", route: "A-03 / A-07", copy: "Bundle the urgent LUMA-200 allocation with two nearby orders. This removes 126 metres of duplicate travel.", hero: "Zone A is clear for the next move.", pickers: "3", travel: "126m", packQueue: "4" },
    dispatch: { headline: "6 orders need quality checks before the van closes.", copy: "Dock 02 has capacity for the express cage; workers are assigned and no carrier delay is forecast.", cutoff: "15:30", pending: "6", lock: "22 min", sealed: "18 / 24", onTime: "92%" },
    analytics: { targetCopy: "Today's active shift versus a 60-order-per-hour operating target.", bottleneck: "Quality-check queue", change: "+12% vs previous shift" },
    prediction: {
      headline: "Afternoon Peak SLA & Stock Allocation Forecast",
      summary: "Nova Retail urgent order requires 10 units of LUMA-200 against 7 available. Without split allocation, 16:00 SLA will breach.",
      confidence: 98.7,
      primaryRisk: "LUMA-200 stockout risk threatening Nova Retail priority order.",
      recommendation: "Approve 7 units immediate allocation from Zone A and backorder 3 units for tomorrow's inbound.",
      expectedImpact: "Maintains 99.3% pick accuracy and eliminates 16:00 carrier delay penalties.",
      actionLabel: "Approve recommended split",
    },
  },
  C: {
    orders: orders.map((order, index) => ({ ...order, id: `SC-${48140 - index}`, customer: ["Afterdark Supply", "Moonlit Market", "Relay Goods", "Nightjar Home", "Orbit & Co.", "Quiet Current"][index], status: index === 0 ? "Quality check" : index < 3 ? "Picking" : order.status, promise: index < 3 ? "06:00" : "Tomorrow", note: "Night shift is protecting the overnight dispatch plan and cycle-count accuracy." })),
    inventory: inventory.map((item, index) => ({ ...item, available: Math.max(3, item.available - [3, 8, 2, 14][index]), reserved: item.reserved + [2, 5, 2, 8][index], inbound: Math.max(0, item.inbound - [2, 0, 8, 0][index]) })),
    throughput: throughput.map((point, index) => ({ ...point, orders: Math.max(20, point.orders - 10 + (index % 3) * 3) })),
    command: { title: "Count clean. Dispatch quietly.", copy: "The night shift is balancing cycle counts with overnight dispatch. Keep exception stock visible and protect the 06:00 hand-off.", route: "QC-01 / overnight cage", travel: "62 m", orders: "29", accuracy: "99.7%", capacity: "41%", recoverable: "19m" },
    pick: { wave: "W-34", zone: "Zones P + QC", route: "P-01 / QC-01", copy: "Sequence overnight orders by packing station, then close cycle-count exceptions before the 06:00 hand-off.", hero: "Overnight counts are clear for dispatch.", pickers: "2", travel: "62m", packQueue: "3" },
    dispatch: { headline: "Overnight dispatch is staged for the 06:00 hand-off.", copy: "The night cage is stable; the lead decision is to protect scan accuracy while the final quality checks close.", cutoff: "05:45", pending: "3", lock: "31 min", sealed: "12 / 15", onTime: "98%" },
    analytics: { targetCopy: "Night-shift throughput versus a 45-order-per-hour overnight operating target.", bottleneck: "Cycle-count exceptions", change: "-4% vs evening" },
    prediction: {
      headline: "Night Shift Cycle Count & 06:00 Hand-off Forecast",
      summary: "Cycle count variance in Zone P requires reconciliation before the 06:00 driver departure for 3 overnight manifests.",
      confidence: 97.2,
      primaryRisk: "Inventory audit discrepancy delaying final manifest sealing.",
      recommendation: "Dispatch cycle count auditor to Bin P-01 and prioritize overnight staging at Dock 03.",
      expectedImpact: "Ensures 100% audit compliance and secures the 06:00 morning transfer window.",
      actionLabel: "Verify cycle count audit",
    },
  },
};
