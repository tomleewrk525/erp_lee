# erp-system/components/ui/toggle.tsx

## 컴포넌트 개요

`shadcn/ui`의 Toggle 컴포넌트는 사용자가 활성화 또는 비활성화 상태를 전환할 수 있는 버튼과 유사한 컨트롤입니다. 단일 옵션의 켜짐/꺼짐 상태를 나타낼 때 유용합니다.

## 사용법

`pressed` (활성화 상태)와 `onPressedChange` (상태 변경 핸들러) prop을 통해 토글의 상태를 제어할 수 있습니다. `variant` (스타일)와 `size` (크기)를 통해 모양을 변경할 수 있습니다.

## 예시

```tsx
import { Toggle } from "@/components/ui/toggle"
import { IconBold } from "@tabler/icons-react"

function BoldToggle() {
  const [isBold, setIsBold] = React.useState(false);

  return (
    <Toggle
      aria-label="Toggle bold"
      pressed={isBold}
      onPressedChange={setIsBold}
    >
      <IconBold className="h-4 w-4" />
    </Toggle>
  )
}
```