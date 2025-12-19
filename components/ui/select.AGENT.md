# erp-system/components/ui/select.tsx

## 컴포넌트 개요

`shadcn/ui`의 Select 컴포넌트는 드롭다운 목록에서 단일 옵션을 선택할 수 있도록 하는 폼 컨트롤입니다. 기본 HTML `<select>` 태그보다 더 풍부한 스타일링과 사용자 경험을 제공합니다.

## 사용법

`Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`, `SelectSeparator`와 같은 하위 컴포넌트들과 함께 사용됩니다. `value`와 `onValueChange`를 통해 선택된 값을 제어할 수 있습니다.

## 예시

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function FruitSelector() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="과일 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>과일</SelectLabel>
          <SelectItem value="apple">사과</SelectItem>
          <SelectItem value="banana">바나나</SelectItem>
          <SelectItem value="grape">포도</SelectItem>
          <SelectItem value="pineapple">파인애플</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
```