# erp-system/components/ui/tooltip.tsx

## 컴포넌트 개요

`shadcn/ui`의 Tooltip 컴포넌트는 UI 요소에 마우스를 올렸을 때 추가적인 정보나 설명을 간략하게 표시하는 데 사용됩니다. 공간을 절약하면서 사용자에게 필요한 컨텍스트를 제공하여 인터페이스의 사용성을 높입니다.

## 사용법

`Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`와 같은 하위 컴포넌트들을 사용하여 구현됩니다. `TooltipProvider`는 툴팁의 상태를 관리하고, `TooltipTrigger`에 마우스를 올리면 `TooltipContent`가 표시됩니다.

## 예시

```tsx
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
}
 from "@/components/ui/tooltip"

function InfoButtonWithTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">마우스 오버</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>여기에 유용한 정보가 있습니다.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```