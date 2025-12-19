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
import { mockProductData, ProductInventory } from "@/lib/mock-product-data";
import { CheckIcon, TrashIcon } from "lucide-react";

export default function ItemManagementPage() {
  const [products, setProducts] = useState<ProductInventory[]>(mockProductData);
  const [editingProduct, setEditingProduct] = useState<ProductInventory | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [newSku, setNewSku] = useState("");
  const [newStock, setNewStock] = useState<number | string>("");
  const [newMinStock, setNewMinStock] = useState<number | string>("");

  const handleAddOrUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newItemName || !newSku || !newStock || !newMinStock) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    if (editingProduct) {
      // Update existing product
      setProducts(products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: newItemName,
              sku: newSku,
              stock: Number(newStock),
              minStock: Number(newMinStock),
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : p
      ));
      setEditingProduct(null);
    } else {
      // Add new product
      const newId = Math.max(...products.map(p => p.id)) + 1;
      const newProduct: ProductInventory = {
        id: newId,
        name: newItemName,
        sku: newSku,
        stock: Number(newStock),
        minStock: Number(newMinStock),
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      setProducts([...products, newProduct]);
    }

    setNewItemName("");
    setNewSku("");
    setNewStock("");
    setNewMinStock("");
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("정말로 이 품목을 삭제하시겠습니까?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleEditClick = (product: ProductInventory) => {
    setEditingProduct(product);
    setNewItemName(product.name);
    setNewSku(product.sku);
    setNewStock(product.stock);
    setNewMinStock(product.minStock);
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
          <h1 className="text-2xl font-semibold mb-6">품목 관리</h1>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{editingProduct ? "품목 수정" : "새 품목 추가"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddOrUpdateProduct} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemName">품목명</Label>
                    <Input
                      id="itemName"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={newSku}
                      onChange={(e) => setNewSku(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">재고 수량</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minStock">최소 재고</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={newMinStock}
                      onChange={(e) => setNewMinStock(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {editingProduct ? "품목 수정" : "품목 추가"}
                  </Button>
                  {editingProduct && (
                    <Button type="button" variant="outline" onClick={() => setEditingProduct(null)} className="w-full mt-2">
                      취소
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>품목 목록</CardTitle>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <p>등록된 품목이 없습니다.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>품목명</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>재고</TableHead>
                        <TableHead>최소 재고</TableHead>
                        <TableHead>마지막 업데이트</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>{product.minStock}</TableCell>
                          <TableCell>{product.lastUpdated}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleEditClick(product)}>
                              <CheckIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                              <TrashIcon className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
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
