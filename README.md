https://smartwhouse-nwqedban.manus.space/
# WarehouseIQ — Flow Command
## Smart Warehouse Operations & Order Fulfillment System

WarehouseIQ is a decision-driven smart warehouse operations platform built for modern fulfillment centers. Moving beyond standard CRUD dashboards, the system addresses operational bottlenecks by combining real-time inventory visibility, automated order prioritization, proactive split-allocation logic, pick-wave optimization, and dispatch cut-off tracking.

---

## Key Modules & Workflows

| Module | Operational Focus | Key Features |
| :--- | :--- | :--- |
| **Command Desk** | Central control room | Real-time shift status, live pick-route metrics, outbound dispatch clock, and priority decision alerts. |
| **Order Queue** | Promise-date ranking | Multi-tier prioritization (Urgent, High, Standard), live SLA risk flagging, and allocation scenario review. |
| **Inventory Radar** | Stock health & safety floor | Tracking available, reserved, inbound, and floor stock with automated reorder triggers and replenishment purchase orders. |
| **Pick & Pack** | Floor route optimization | Zone-based sequencing (Zone A/C) that reduces travel distance, assignable picker tasks, and instant wave release. |
| **Dispatch Board** | Outbound carrier hand-off | Express/Priority/Ground manifest tracking, dock bay utilization, quality check queues, and on-time confidence scoring. |
| **Flow Analytics** | Operational intelligence | Throughput tracking versus targets, recoverable bottleneck minutes, pick accuracy, and dwell-time reduction. |

---

## Decision-Driven Fulfillment Logic

When urgent orders exceed available stock, WarehouseIQ implements automated trade-off analysis rather than failing silently:

```
Order Created → Priority Determined → Inventory Checked → Stock Allocated → Picking → Packing → Quality Check → Dispatch → Inventory Updated
```

> **Exception → Decision → Resolution**
> When Nova Retail required 10 units of LUMA-200 with only 7 available before a 16:00 carrier cut-off, the system proposed allocating the 7 immediate units, linking 3 from an inbound delivery, and shifting a lower-priority reservation. Approving the recommendation instantly logs an audit note and protects the SLA without breaking floor productivity.

---

## Tech Stack & Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS 4, shadcn/ui primitives, Lucide icons, and Recharts.
- **Design System:** Signal Room aesthetic featuring warm paper tones (`#fbf8f1`), deep ink rails (`#0f2837`), signal amber accents (`#e7a83b`), and editorial typography (IBM Plex Sans, DM Serif Display).
- **Tooling:** Vite, pnpm, and Git.

---

## Getting Started Locally

Clone the repository and install dependencies using `pnpm`:

```bash
# Clone the repository
git clone https://github.com/saisudheernallabarika77-alt/Smart-Warehouse-Operations.git

# Navigate to project directory
cd Smart-Warehouse-Operations

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

---

## Author & License

Developed as an advanced hackathon solution by **Manus AI**. Licensed under the MIT License.
