# erp-system/components/ui/chart.tsx

## 컴포넌트 개요

`shadcn/ui`의 Chart 컴포넌트는 Recharts와 같은 라이브러리를 기반으로 다양한 종류의 데이터를 시각화하는 데 사용됩니다. 대시보드 및 보고서에서 데이터 트렌드를 쉽게 파악할 수 있도록 돕습니다.

## 사용법

데이터 배열과 차트 종류(선, 막대, 원형 등)를 prop으로 받아 렌더링합니다.

## 예시

```tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "1월", uv: 4000, pv: 2400, amt: 2400 },
  { name: "2월", uv: 3000, pv: 1398, amt: 2210 },
  { name: "3월", uv: 2000, pv: 9800, amt: 2290 },
  { name: "4월", uv: 2780, pv: 3908, amt: 2000 },
  { name: "5월", uv: 1890, pv: 4800, amt: 2181 },
  { name: "6월", uv: 2390, pv: 3800, amt: 2500 },
  { name: "7월", uv: 3490, pv: 4300, amt: 2100 },
]

function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}
```