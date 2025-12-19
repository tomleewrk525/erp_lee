# erp-system/components/ui/table.tsx

## 컴포넌트 개요

`shadcn/ui`의 Table 컴포넌트는 데이터를 행과 열로 구성하여 표시하는 데 사용됩니다. 데이터 집합을 구조화하고 가독성 있게 보여주는 데 최적화되어 있습니다.

## 사용법

`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`과 같은 하위 컴포넌트들을 사용하여 HTML `<table>` 태그와 유사하게 테이블을 구성합니다.

## 예시

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
]

function InvoicesTable() {
  return (
    <Table>
      <TableCaption>최근 인보이스 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">인보이스</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>결제 방식</TableHead>
          <TableHead className="text-right">금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>총 합계</TableCell>
          <TableCell className="text-right">$750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
```