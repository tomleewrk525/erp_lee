# erp-system/components/ui/textarea.tsx

## 컴포넌트 개요

`shadcn/ui`의 Textarea 컴포넌트는 여러 줄의 텍스트를 입력할 수 있는 폼 컨트롤입니다. 사용자의 긴 입력을 받을 때 유용합니다.

## 사용법

일반적인 HTML `<textarea>` 태그와 유사하게 사용하며, `ref` 및 기타 HTML 속성을 전달할 수 있습니다.

## 예시

```tsx
import { Textarea } from "@/components/ui/textarea"

function CommentForm() {
  return (
    <Textarea placeholder="여기에 댓글을 입력하세요." />
  )
}
```