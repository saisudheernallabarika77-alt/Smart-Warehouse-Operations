# Reference project study — WarehouseIQ

## Source
- URL: https://smartops-c3ipntuf.manus.space
- Title: WarehouseIQ — Signal Room
- Reference brand: WarehouseIQ / Northline Fulfillment FC-01 / Manchester Operations

## Global structure
- Persistent dark navy left sidebar with WarehouseIQ logo, facility selector, operation navigation, live shift status card, and user profile.
- Navigation modules: Command Desk, Order Queue, Inventory, Pick & Pack, Dispatch, Analytics.
- Main content uses warm off-white canvas, thin light borders, rounded cards, restrained shadows, editorial serif display headlines, and small uppercase operational labels.
- Top utility area includes help, notifications, and shift time.
- Visual voice is premium operations control room: calm, precise, human, decision-focused.

## Command Desk
- Header copy: "Keep the promise. Protect the flow."
- Shows live shift status, active orders, floor capacity, pick accuracy, one decision-required exception, a warehouse floor image, fulfillment flow tracker, priority queue, inventory radar, and dispatch clock.
- Primary decision scenario: Nova Retail needs 10 LUMA-200 units; only 7 available; 3 inbound at 14:20; lower-priority reservation can be released; split shipment recommended to preserve 16:00 SLA.
- Decision pattern is explicit: exception → proposed trade-off → approval action.
- Flow stages: Order created → Prioritised → Allocated → Picking → Packing → Quality check → Dispatch.

## Order Queue
- Filters: All active, At risk, Ready to pick, Held.
- Sort control: priority.
- List is ranked by promise risk, customer tier, and fulfillment readiness.
- Each row shows customer, order/SKU/quantity, fulfillment status, allocated fraction, risk state, and promise time.
- Right-side Allocation Scenario panel explains impact of recommended split: urgent order stays inside SLA, lower-priority order moves by one day, no picker rework required.
- CTA: Approve recommended split.

## Design takeaways for our build
- Keep persistent operational navigation rather than a generic top nav.
- Prioritize decisions and exceptions above raw metrics.
- Make all recommended actions show their operational trade-off before approval.
- Use sample data that feels operationally real but clearly behaves like a working product.
- Differentiate our product with stronger workflow interactivity, more explicit allocation logic, exception resolution, and analytics.

## Inventory
- Inventory radar shows available stock, SKU name, location/bin, and health state such as Reorder now, Healthy, and Watch.
- Main decision panel recommends ordering 36 more LUMA-200 units based on safety floor, inbound stock, velocity, and supplier lead time.
- The page emphasizes that available, reserved, and inbound stock appear together to avoid invisible shortages.

## Pick & Pack
- The page is framed as floor execution, not a generic task list.
- Recommended pick wave W-26 says Zone A is the next best route, bundles urgent LUMA-200 allocation with two nearby orders, and removes 126 metres of duplicate travel.
- Action is Release wave; route chips include A-03, A-07, and PACK-02.
- Current task board uses explicit hand-off states: IN HAND, QUEUED, and COMPLETE, with assignee and zone/bin/station details.
- Reference includes an operational route image/diagram as a prominent visual asset.

## Dispatch
- Outbound control joins carrier deadlines, manifest readiness, and dock sequencing in one view.
- Hero decision: express collection at 15:30; 6 orders need quality checks before the van closes; Dock 02 has capacity; no carrier delay is forecast.
- KPI strip shows minutes to manifest lock, orders sealed, and on-time forecast.
- Dispatch table columns: Manifest, Carrier, Dock, Cut-off, Status. Example statuses include Loading, Staged, and Open.

## Analytics
- Operational intelligence focuses on throughput and recoverable time, rather than vanity metrics.
- Bar chart shows orders cleared per hour against a 60-order-per-hour operating target.
- Bottleneck Watch quantifies minutes recoverable from quality-check queue, duplicate aisle travel, and allocation decision.
- Supporting KPIs include pick accuracy versus plan and pack dwell in minutes versus plan.

## Overall reference assessment
The reference is a strong visual baseline for a warehouse command center with a calm editorial aesthetic, persistent operations sidebar, and a recurring exception-to-decision pattern. Our build should preserve that level of clarity while introducing a more explicit order detail drawer, live workflow controls, allocation simulation, damaged/missing item resolution, and richer operational analytics so the result is clearly an original product rather than a reproduction.

## Live preview verification
The local preview loaded as WarehouseIQ — Flow Command with the expected product chrome, deep-ink operations rail, custom route-mark asset, and command desk content. Clicking Order queue moved into the interactive queue workspace and exposed the priority filters, six sample orders, and the trade-off allocation scenario. The interface remained coherent in the running preview; the next validation step is to confirm the approval and order-detail drawer actions, then save the project checkpoint.

## Decision workflow QA
The Order queue approval action works: the UI changes to “Split approved” and shows a toast stating that 7 units were released to SO-48219, with split shipment and audit note created. Clicking the urgent Nova Retail row opens an order-detail drawer with promise time, allocation state, decision context, and a visible fulfillment chain from order creation through dispatch. The drawer includes an “Open next action” CTA, confirming that exception handling is represented as decision → resolution rather than a static alert.

## State persistence note
After approving the split, the Command desk reflected “Decision resolved · audit logged,” with SO-48219 protected, seven units moved to the urgent wave, three inbound units still linked to the split shipment, and Marlowe Market moved to tomorrow. The resolved state persists when returning to the command view, which is appropriate for a decision-driven mock workflow.

## Module QA
Inventory radar loaded successfully with four SKU cards, available/reserved/inbound/floor values, status badges, a visually prominent replenishment recommendation for 36 LUMA-200 units, and a draft purchase-order action. Pick & pack loaded successfully with the W-26 recommended wave, Zone A route visual, task board, travel-saved metric, and release-wave action. These modules provide decision-oriented operational surfaces rather than only data tables.

## Dispatch and analytics QA
Dispatch board loaded with express/priority/ground manifests, dock assignments, cut-off times, loading/staged/open states, six pending quality checks, dock capacity, and a 92% on-time confidence signal. Analytics loaded with Today/Last 7 shifts filters, throughput bars versus target, minutes recoverable by bottleneck, pick accuracy, pack dwell, orders in motion, average dwell, and intervention count. The app now covers the complete requested lifecycle and explicitly surfaces operational interventions.
