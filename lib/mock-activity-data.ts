export interface ActivityLog {
  id: number;
  timestamp: string;
  category: "Inventory" | "Sales Order" | "Partner";
  description: string;
  relatedId?: number; // Optional ID of the related item (e.g., product ID, order ID)
}

export const mockActivityData: ActivityLog[] = [
  {
    id: 1,
    timestamp: "2024-07-22 10:30:00",
    category: "Inventory",
    description: "Received 50 units of All-Purpose Cleaner (SKU: APC001)",
    relatedId: 1,
  },
  {
    id: 2,
    timestamp: "2024-07-22 09:45:00",
    category: "Sales Order",
    description: "New Sales Order #00123 created for Acme Corp.",
    relatedId: 1,
  },
  {
    id: 3,
    timestamp: "2024-07-21 16:00:00",
    category: "Partner",
    description: "New Vendor 'Chemical Supplies Ltd.' added.",
    relatedId: 1,
  },
  {
    id: 4,
    timestamp: "2024-07-21 14:15:00",
    category: "Inventory",
    description: "Shipped 20 units of Glass Cleaner (SKU: GLS001) for Order #00121",
    relatedId: 2,
  },
  {
    id: 5,
    timestamp: "2024-07-20 11:00:00",
    category: "Sales Order",
    description: "Sales Order #00120 marked as Completed.",
    relatedId: 5,
  },
  {
    id: 6,
    timestamp: "2024-07-20 08:30:00",
    category: "Inventory",
    description: "Low stock alert for Disinfectant Spray (SKU: DIF001)",
    relatedId: 4,
  },
];
