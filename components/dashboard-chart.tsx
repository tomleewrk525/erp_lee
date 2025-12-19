"use client"

import dynamic from 'next/dynamic'
import { Card } from "@/components/ui/card"

const ChartAreaInteractive = dynamic(
  () => import('@/components/chart-area-interactive').then(mod => mod.ChartAreaInteractive),
  {
    loading: () => <Card className="aspect-auto h-[322px] w-full animate-pulse" />,
    ssr: false
  }
)

export function DashboardChart() {
  return <ChartAreaInteractive />
}
