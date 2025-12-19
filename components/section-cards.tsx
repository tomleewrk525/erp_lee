import {
  IconCheck,
  IconHourglass,
  IconListDetails,
  IconPackage,
  IconAlertTriangle,
  IconBuildingFactory,
  IconCurrencyDollar,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { mockProductData } from "@/lib/mock-product-data"

export function SectionCards() {
  const totalUniqueProducts = mockProductData.length
  const totalStockQuantity = mockProductData.reduce(
    (sum, product) => sum + product.stock,
    0
  )
  const lowStockItems = mockProductData.filter(
    (product) => product.stock < product.minStock
  ).length
  const inProductionBatches = 3 // Placeholder
  const monthlySalesRevenue = 125000 // Placeholder
  const lowStockProducts = mockProductData.filter(
    (product) => product.stock < product.minStock
  )

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-6">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Products (SKUs)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalUniqueProducts}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconPackage />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Unique cleaning products managed
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Stock Quantity</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalStockQuantity}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconListDetails />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Sum of all product units
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Low Stock Items Count</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {lowStockItems}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconAlertTriangle />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Products below minimum threshold
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card col-span-2"> {/* This card spans two columns */}
        <CardHeader>
          <CardDescription>Low Stock Products</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {lowStockProducts.length === 0 ? "모든 제품 재고 충분" : "재고 부족 품목"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconAlertTriangle />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          {lowStockProducts.length > 0 ? (
            <ul className="space-y-1 text-sm">
              {lowStockProducts.map(product => (
                <li key={product.id} className="flex justify-between">
                  <span>{product.name} (SKU: {product.sku})</span>
                  <span className="font-medium text-red-500">{product.stock} / {product.minStock}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">현재 재고가 부족한 품목이 없습니다.</p>
          )}
        </CardContent>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>In-Production Batches</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {inProductionBatches}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconBuildingFactory />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active manufacturing processes
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Sales Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${monthlySalesRevenue.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCurrencyDollar />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Estimated revenue this month
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


