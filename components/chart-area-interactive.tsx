"use client"

import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts" // Bar, BarChart 대신 Area, AreaChart 사용

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { mockProductData } from "@/lib/mock-product-data" // mockProductData 임포트

export const description = "An interactive chart for product inventory and sales trends"

// 월별 모의 판매 데이터
const mockSalesData = [
  { month: "Jan", sales: 15000 },
  { month: "Feb", sales: 18000 },
  { month: "Mar", sales: 22000 },
  { month: "Apr", sales: 20000 },
  { month: "May", sales: 25000 },
  { month: "Jun", sales: 28000 },
  { month: "Jul", sales: 30000 },
];

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [chartType, setChartType] = React.useState("stock") // 기본값: 재고 수준

  const processProductInventoryData = () => {
    return mockProductData.map((product) => ({
      name: product.name,
      stock: product.stock,
    }))
  }

  const processSalesTrendsData = () => {
    return mockSalesData.map(data => ({
      month: data.month,
      sales: data.sales,
    }))
  }

  const chartData = chartType === "stock" ? processProductInventoryData() : processSalesTrendsData();

  const chartConfig = {
    stock: {
      label: "재고 수량",
      color: "hsl(var(--primary))",
    },
    sales: {
      label: "월별 매출",
      color: "hsl(var(--chart-2))", // Sales에 맞는 색상
    },
    // mockProductData의 name 속성을 동적으로 사용
    ...mockProductData.reduce((acc, product) => {
      acc[product.name] = { label: product.name, color: `hsl(${Math.floor(Math.random() * 360)} 70% 50%)` };
      return acc;
    }, {} as ChartConfig),
    // mockSalesData의 month 속성을 동적으로 사용
    ...mockSalesData.reduce((acc, data) => {
      acc[data.month] = { label: data.month, color: `hsl(${Math.floor(Math.random() * 360)} 70% 50%)` };
      return acc;
    }, {} as ChartConfig),
  } satisfies ChartConfig;

  const chartTitle = chartType === "stock" ? "제품별 재고 수준" : "월별 판매량 추이";
  const chartDescription = chartType === "stock" ? "각 제품의 현재 재고 수량" : "지난 7개월간의 판매량 추이";

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {chartDescription}
          </span>
          <span className="@[540px]/card:hidden">{chartTitle}</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={chartType}
            onValueChange={setChartType}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="stock">재고 수준</ToggleGroupItem>
            <ToggleGroupItem value="sales">판매량 추이</ToggleGroupItem>
          </ToggleGroup>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="차트 유형 선택"
            >
              <SelectValue placeholder="차트 유형 선택" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="stock" className="rounded-lg">
                재고 수준
              </SelectItem>
              <SelectItem value="sales" className="rounded-lg">
                판매량 추이
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {chartType === "stock" ? (
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="stock" fill="var(--color-stock)" radius={8} />
            </BarChart>
          ) : (
            <AreaChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month" // Sales data uses 'month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="sales" // Sales data uses 'sales'
                type="natural"
                fill="var(--color-sales)"
                fillOpacity={0.6}
                stroke="var(--color-sales)"
                stackId="a"
              />
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}