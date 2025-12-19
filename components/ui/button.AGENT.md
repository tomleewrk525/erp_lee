# erp-system/components/ui/button.tsx

## 컴포넌트 개요

`shadcn/ui`의 Button 컴포넌트는 사용자가 클릭하여 액션을 트리거하는 데 사용됩니다. 다양한 스타일과 크기를 지원하여 애플리케이션의 디자인 시스템에 맞게 유연하게 사용할 수 있습니다.

## 사용법

`variant` (스타일), `size` (크기), `asChild` (하위 컴포넌트로 렌더링) 등의 prop을 통해 버튼의 모양과 동작을 제어할 수 있습니다.

## 예시

```tsx
import { Button } from "@/components/ui/button"

function ActionButtons() {
  return (
    <div className="flex gap-2">
      <Button>기본 버튼</Button>
      <Button variant="secondary">보조 버튼</Button>
      <Button variant="outline" size="sm">작은 외곽선 버튼</Button>
      <Button variant="destructive">위험 버튼</Button>
      <Button asChild>
        <a href="/dashboard">링크 버튼</a>
      </Button>
    </div>
  )
}
```