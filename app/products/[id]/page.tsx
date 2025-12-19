"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProductData, ProductInventory } from "@/lib/mock-product-data";
import Link from "next/link";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState<ProductInventory | undefined>(undefined);
  const [minStock, setMinStock] = useState<number | string>("");
  const [isEditingMinStock, setIsEditingMinStock] = useState(false);

  useEffect(() => {
    const foundProduct = mockProductData.find((p) => p.id === productId);
    setProduct(foundProduct);
    if (foundProduct) {
      setMinStock(foundProduct.minStock);
    }
  }, [productId]);

  if (!product) {
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
            <h1 className="text-2xl font-semibold mb-6">Product Not Found</h1>
            <p>The product with ID {productId} could not be found.</p>
            <Link href="/dashboard" className="mt-4">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  const handleSaveMinStock = () => {
    // In a real application, you would update the backend here.
    // For now, we'll just update the local mock data (this won't persist across refreshes).
    const updatedMockProductData = mockProductData.map((p) =>
      p.id === productId ? { ...p, minStock: Number(minStock) } : p
    );
    // This line won't actually update the imported mockProductData for other components in a real app
    // For this client-side demo, we'll update the local state.
    setProduct((prev) => (prev ? { ...prev, minStock: Number(minStock) } : prev));
    setIsEditingMinStock(false);
    alert("Min Stock updated (client-side only).");
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Product Details: {product.name}</h1>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>

          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>ID:</Label> <span className="font-medium">{product.id}</span>
              </div>
              <div>
                <Label>SKU:</Label> <span className="font-medium">{product.sku}</span>
              </div>
              <div>
                <Label>Current Stock:</Label> <span className="font-medium">{product.stock}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="minStock">Min Stock:</Label>
                {isEditingMinStock ? (
                  <>
                    <Input
                      id="minStock"
                      type="number"
                      value={minStock}
                      onChange={(e) => setMinStock(e.target.value)}
                      className="w-24"
                    />
                    <Button onClick={handleSaveMinStock} size="sm">Save</Button>
                    <Button onClick={() => setIsEditingMinStock(false)} variant="outline" size="sm">Cancel</Button>
                  </>
                ) : (
                  <>
                    <span className="font-medium">{product.minStock}</span>
                    <Button onClick={() => setIsEditingMinStock(true)} variant="outline" size="sm">Edit</Button>
                  </>
                )}
              </div>
              <div>
                <Label>Last Updated:</Label> <span className="font-medium">{product.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
