# erp-system/components/ui/toggle-group.tsx

## 컴포넌트 개요

`shadcn/ui`의 ToggleGroup 컴포넌트는 여러 토글 버튼을 그룹으로 묶어 사용자가 하나 또는 여러 옵션을 선택할 수 있도록 합니다. 라디오 그룹과 유사하게 단일 선택 모드를 지원하거나, 체크박스 그룹처럼 다중 선택 모드를 지원할 수 있습니다.

## 사용법

`ToggleGroup`은 `type` (단일/다중), `defaultValue`, `value`, `onValueChange` 등의 prop을 통해 동작을 제어하며, `ToggleGroupItem`을 자식으로 포함합니다. 각 `ToggleGroupItem`은 고유한 `value`를 가집니다.

## 예시

```tsx
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { IconBold, IconItalic, IconUnderline } from "@tabler/icons-react"

function TextFormattingTools() {
  return (
    <ToggleGroup type="multiple" defaultValue={["bold"]}>
      <ToggleGroupItem value="bold" aria-label="글자 굵게">
        <IconBold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="기울임꼴">
        <IconItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="밑줄">
        <IconUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```