# erp-system/components/ui/input.tsx

## 컴포넌트 개요

`shadcn/ui`의 Input 컴포넌트는 사용자로부터 한 줄의 텍스트 입력을 받는 데 사용됩니다. 다양한 타입(`text`, `email`, `password`, `number` 등)과 속성을 지원하여 유연하게 사용할 수 있습니다.

## 사용법

`type`, `placeholder`, `value`, `onChange` 등 표준 HTML input 속성을 지원합니다. `ref`를 전달하여 DOM 요소에 직접 접근할 수도 있습니다.

## 예시

```tsx
import { Input } from "@/components/ui/input"

function SearchInput({ value, onChange }) {
  return (
    <Input
      type="search"
      placeholder="검색어를 입력하세요..."
      value={value}
      onChange={onChange}
    />
  )
}
```