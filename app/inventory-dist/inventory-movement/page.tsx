"use client"

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface InventoryMovement {
  id: number;
  itemName: string;
  sku: string;
  batchNumber: string;
  quantity: number;
  movementType: "in" | "out";
  date: string;
  party: string; // Supplier or Customer
}

export default function InventoryMovementPage() { // 컴포넌트 이름 변경 InventoryPage -> InventoryMovementPage
  const [itemName, setItemName] = useState("");
  const [sku, setSku] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [movementType, setMovementType] = useState<"in" | "out">("in");
  const [date, setDate] = useState("");
  const [party, setParty] = useState("");
  const [movements, setMovements] = useState<InventoryMovement[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !sku || !batchNumber || !quantity || !date || !party) {
      alert("Please fill in all fields.");
      return;
    }

    const newMovement: InventoryMovement = {
      id: movements.length + 1,
      itemName,
      sku,
      batchNumber,
      quantity: Number(quantity),
      movementType,
      date,
      party,
    };

    setMovements([...movements, newMovement]);
    setItemName("");
    setSku("");
    setBatchNumber("");
    setQuantity("");
    setDate("");
    setParty("");
  };

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
          <h1 className="text-2xl font-semibold mb-6">Inventory Movement</h1>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Record New Movement</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input
                      id="itemName"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batchNumber">Batch Number</Label>
                    <Input
                      id="batchNumber"
                      value={batchNumber}
                      onChange={(e) => setBatchNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Movement Type</Label>
                    <RadioGroup
                      value={movementType}
                      onValueChange={(value: "in" | "out") => setMovementType(value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in" id="type-in" />
                        <Label htmlFor="type-in">In</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="out" id="type-out" />
                        <Label htmlFor="type-out">Out</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="party">Supplier/Customer</Label>
                    <Input
                      id="party"
                      value={party}
                      onChange={(e) => setParty(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit">Record Movement</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Movement History</CardTitle>
              </CardHeader>
              <CardContent>
                {movements.length === 0 ? (
                  <p>No movements recorded yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Item Name</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Batch Number</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Party</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {movements.map((movement) => (
                        <TableRow key={movement.id}>
                          <TableCell>{movement.id}</TableCell>
                          <TableCell>{movement.itemName}</TableCell>
                          <TableCell>{movement.sku}</TableCell>
                          <TableCell>{movement.batchNumber}</TableCell>
                          <TableCell>{movement.quantity}</TableCell>
                          <TableCell>{movement.movementType}</TableCell>
                          <TableCell>{movement.date}</TableCell>
                          <TableCell>{movement.party}</TableCell>
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
