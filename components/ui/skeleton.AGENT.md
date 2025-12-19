# erp-system/components/ui/skeleton.tsx

## 컴포넌트 개요

`shadcn/ui`의 Skeleton 컴포넌트는 콘텐츠가 로드되는 동안 자리 표시자를 표시하는 데 사용됩니다. 사용자에게 시각적인 로딩 상태를 제공하여 대기 시간을 줄이는 데 도움이 됩니다.

## 사용법

데이터를 불러오는 동안 UI의 특정 부분을 Skeleton 컴포넌트로 대체하여 사용자 경험을 향상시킬 수 있습니다.

## 예시

```tsx
import { Skeleton } from "@/components/ui/skeleton"

function LoadingState() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```