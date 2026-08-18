import { useState } from "react";
import { View, Shift, Order } from "@/types/warehouse";
import { AppShell } from "@/components/AppShell";
import { CommandDesk } from "@/components/CommandDesk";
import { AiPredictionWorkspace } from "@/components/AiPredictionWorkspace";
import { OrderQueueWorkspace } from "@/components/OrderQueueWorkspace";
import { InventoryPage, PickPage, DispatchPage, AnalyticsPage, OrderDrawer } from "@/components/Workspaces";

export default function Home() {
  const [view, setView] = useState<View>("prediction");
  const [shift, setShift] = useState<Shift>("B");
  const [decisionResolved, setDecisionResolved] = useState(false);
  const [waveReleased, setWaveReleased] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleShiftChange = (nextShift: Shift) => {
    setShift(nextShift);
    setDecisionResolved(false);
    setWaveReleased(false);
  };

  return (
    <AppShell view={view} setView={setView} shift={shift} onShiftChange={handleShiftChange}>
      {view === "prediction" && (
        <AiPredictionWorkspace shift={shift} onResolve={() => setDecisionResolved(true)} decisionResolved={decisionResolved} />
      )}
      {view === "command" && (
        <CommandDesk setView={setView} shift={shift} decisionResolved={decisionResolved} onResolve={() => setDecisionResolved(true)} onReview={() => setView("orders")} onOpen={setSelectedOrder} />
      )}
      {view === "orders" && (
        <OrderQueueWorkspace onOpen={setSelectedOrder} decisionResolved={decisionResolved} onResolve={() => setDecisionResolved(true)} shift={shift} />
      )}
      {view === "inventory" && <InventoryPage shift={shift} />}
      {view === "pick" && <PickPage waveReleased={waveReleased} onRelease={() => setWaveReleased(true)} shift={shift} />}
      {view === "dispatch" && <DispatchPage shift={shift} />}
      {view === "analytics" && <AnalyticsPage shift={shift} />}
      {selectedOrder && <OrderDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </AppShell>
  );
}
