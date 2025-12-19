import { z } from "zod"

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  stock: z.number(),
  minStock: z.number(),
  lastUpdated: z.string(), // Assuming date as string for simplicity
})

export type ProductInventory = z.infer<typeof ProductSchema>

export const mockProductData: ProductInventory[] = [
  { id: 1, name: "All-Purpose Cleaner", sku: "APC001", stock: 120, minStock: 50, lastUpdated: "2024-07-20" },
  { id: 2, name: "Glass Cleaner", sku: "GLS001", stock: 30, minStock: 40, lastUpdated: "2024-07-19" },
  { id: 3, name: "Floor Wax", sku: "FLW001", stock: 200, minStock: 100, lastUpdated: "2024-07-21" },
  { id: 4, name: "Disinfectant Spray", sku: "DIF001", stock: 80, minStock: 70, lastUpdated: "2024-07-20" },
  { id: 5, name: "Bathroom Cleaner", sku: "BTH001", stock: 45, minStock: 60, lastUpdated: "2024-07-18" },
  { id: 6, name: "Toilet Bowl Cleaner", sku: "TBC001", stock: 70, minStock: 50, lastUpdated: "2024-07-21" },
  { id: 7, name: "Laundry Detergent", sku: "LND001", stock: 150, minStock: 80, lastUpdated: "2024-07-19" },
  { id: 8, name: "Dish Soap", sku: "DSH001", stock: 90, minStock: 60, lastUpdated: "2024-07-20" },
  { id: 9, name: "Hand Sanitizer", sku: "HNS001", stock: 25, minStock: 30, lastUpdated: "2024-07-22" },
  { id: 10, name: "Multi-Surface Wipes", sku: "MSW001", stock: 110, minStock: 75, lastUpdated: "2024-07-21" },
]