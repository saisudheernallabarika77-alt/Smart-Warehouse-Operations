export type View = "command" | "prediction" | "orders" | "inventory" | "pick" | "dispatch" | "analytics";
export type Shift = "A" | "B" | "C";
export type Priority = "URG" | "HIGH" | "STD";
export type OrderStatus = "Awaiting allocation" | "Allocated" | "Picking" | "Quality check" | "Ready to dispatch";

export type Order = {
  id: string;
  customer: string;
  sku: string;
  product: string;
  units: number;
  allocated: number;
  priority: Priority;
  status: OrderStatus;
  risk: "At risk" | "On plan" | "Held";
  promise: string;
  carrier: string;
  zone: string;
  note: string;
};

export type InventoryItem = {
  sku: string;
  name: string;
  available: number;
  reserved: number;
  inbound: number;
  floor: number;
  location: string;
  health: string;
  tone: "risk" | "healthy" | "watch";
};

export type ThroughputPoint = {
  hour: string;
  orders: number;
};

export type ShiftDetail = {
  time: string;
  label: string;
  status: string;
};

export type ShiftWorkspace = {
  orders: Order[];
  inventory: InventoryItem[];
  throughput: ThroughputPoint[];
  command: {
    title: string;
    copy: string;
    route: string;
    travel: string;
    orders: string;
    accuracy: string;
    capacity: string;
    recoverable: string;
  };
  pick: {
    wave: string;
    zone: string;
    route: string;
    copy: string;
    hero: string;
    pickers: string;
    travel: string;
    packQueue: string;
  };
  dispatch: {
    headline: string;
    copy: string;
    cutoff: string;
    pending: string;
    lock: string;
    sealed: string;
    onTime: string;
  };
  analytics: {
    targetCopy: string;
    bottleneck: string;
    change: string;
  };
  prediction: {
    headline: string;
    summary: string;
    confidence: number;
    primaryRisk: string;
    recommendation: string;
    expectedImpact: string;
    actionLabel: string;
  };
};
