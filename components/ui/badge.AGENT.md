# erp-system/components/ui/badge.tsx

## 컴포넌트 개요

`shadcn/ui`의 Badge 컴포넌트는 작은 레이블이나 태그를 표시하는 데 사용됩니다. 상태, 카테고리 또는 간단한 속성을 나타낼 때 유용합니다.

## 사용법

다양한 스타일과 크기로 배지를 렌더링할 수 있습니다. `variant` prop을 통해 모양을 변경할 수 있습니다.

## 예시

```tsx
import { Badge } from "@/components/ui/badge"

function StatusDisplay({ status }) {
  let variant: "default" | "secondary" | "outline" | "destructive" = "default";
  if (status === "pending") variant = "secondary";
  if (status === "error") variant = "destructive";
  if (status === "new") variant = "outline";

  return <Badge variant={variant}>{status}</Badge>
}
```