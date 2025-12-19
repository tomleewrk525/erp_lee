# erp-system/components/ui/label.tsx

## 컴포넌트 개요

`shadcn/ui`의 Label 컴포넌트는 폼 컨트롤(예: `Input`, `Checkbox`)에 대한 설명을 제공하여 사용자 인터페이스의 접근성과 명확성을 향상시킵니다. HTML `<label>` 태그를 기반으로 하며, `htmlFor` 속성을 통해 관련 폼 컨트롤과 연결됩니다.

## 사용법

대부분의 경우 폼 필드와 함께 사용되며, `htmlFor` 속성으로 해당 폼 필드의 `id`를 지정합니다.

## 예시

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function EmailInputForm() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">이메일</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
```