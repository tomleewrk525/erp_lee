"use client"

import { useState, useMemo } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockProductData, ProductInventory } from "@/lib/mock-product-data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PurchaseOrderItem {
  productId: number;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface PurchaseOrder {
  id: number;
  vendorName: string;
  orderDate: string;
  items: PurchaseOrderItem[];
  totalAmount: number;
  status: "Pending" | "Received" | "Cancelled";
}

export default function PurchasesPage() {
  const [vendorName, setVendorName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [itemQuantity, setItemQuantity] = useState<number | string>("");
  const [unitPrice, setUnitPrice] = useState<number | string>("");
  const [orderItems, setOrderItems] = useState<PurchaseOrderItem[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  const selectedProduct = useMemo(() => {
    return mockProductData.find((p) => p.id === Number(selectedProductId));
  }, [selectedProductId]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !itemQuantity || !unitPrice) {
      alert("Please select a product and enter quantity and unit price.");
      return;
    }

    const newItem: PurchaseOrderItem = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      sku: selectedProduct.sku,
      quantity: Number(itemQuantity),
      unitPrice: Number(unitPrice),
      totalPrice: Number(itemQuantity) * Number(unitPrice),
    };

    setOrderItems([...orderItems, newItem]);
    setSelectedProductId(null);
    setItemQuantity("");
    setUnitPrice("");
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName || !orderDate || orderItems.length === 0) {
      alert("Please fill in vendor details, order date, and add at least one item.");
      return;
    }

    const newOrder: PurchaseOrder = {
      id: purchaseOrders.length + 1,
      vendorName,
      orderDate,
      items: orderItems,
      totalAmount: orderItems.reduce((sum, item) => sum + item.totalPrice, 0),
      status: "Pending",
    };

    setPurchaseOrders([...purchaseOrders, newOrder]);
    setVendorName("");
    setOrderDate("");
    setOrderItems([]);
  };

  const [openCombobox, setOpenCombobox] = useState(false);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 lg:p-6">
          <h1 className="text-2xl font-semibold mb-6">Purchase Order Management</h1>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create New Purchase Order</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vendorName">Vendor Name</Label>
                    <Input
                      id="vendorName"
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderDate">Order Date</Label>
                    <Input
                      id="orderDate"
                      type="date"
                      value={orderDate}
                      onChange={(e) => setOrderDate(e.target.value)}
                      required
                    />
                  </div>

                  <h3 className="text-lg font-semibold mt-6 mb-4">Order Items</h3>
                  <div className="space-y-4 border p-4 rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor="product">Product</Label>
                      <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCombobox}
                            className="w-full justify-between"
                          >
                            {selectedProduct
                              ? selectedProduct.name
                              : "Select product..."}
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                          <Command>
                            <CommandInput placeholder="Search product..." />
                            <CommandList>
                              <CommandEmpty>No product found.</CommandEmpty>
                              <CommandGroup>
                                {mockProductData.map((product) => (
                                  <CommandItem
                                    key={product.id}
                                    value={String(product.id)}
                                    onSelect={(currentValue) => {
                                      setSelectedProductId(
                                        currentValue === selectedProductId ? null : currentValue
                                      );
                                      setOpenCombobox(false);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedProductId === String(product.id) ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {product.name} (SKU: {product.sku})
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="itemQuantity">Quantity</Label>
                        <Input
                          id="itemQuantity"
                          type="number"
                          value={itemQuantity}
                          onChange={(e) => setItemQuantity(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unitPrice">Unit Price</Label>
                        <Input
                          id="unitPrice"
                          type="number"
                          value={unitPrice}
                          onChange={(e) => setUnitPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddItem}>Add Item</Button>
                  </div>

                  {orderItems.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Current Items:</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead>Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orderItems.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.productName}</TableCell>
                              <TableCell>{item.sku}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                              <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  <Button type="submit" className="w-full mt-4">
                    Create Purchase Order
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Purchase Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {purchaseOrders.length === 0 ? (
                  <p>No purchase orders recorded yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {purchaseOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.vendorName}</TableCell>
                          <TableCell>{order.orderDate}</TableCell>
                          <TableCell>
                            {order.items.map((item) => (
                              <div key={item.productId}>
                                {item.productName} ({item.quantity})
                              </div>
                            ))}
                          </TableCell>
                          <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                          <TableCell>{order.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
