# erp-system/components/ui/checkbox.tsx

## 컴포넌트 개요

`shadcn/ui`의 Checkbox 컴포넌트는 사용자가 여러 옵션 중 하나 이상을 선택할 수 있도록 하는 표준 양식 컨트롤입니다.

## 사용법

`checked` 상태와 `onCheckedChange` 핸들러를 통해 체크박스의 상태를 제어할 수 있습니다. `id`와 `label`을 함께 사용하여 접근성을 향상시킬 수 있습니다.

## 예시

```tsx
import { Checkbox } from "@/components/ui/checkbox"

function TaskItem({ taskId, taskName, isCompleted, onToggle }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={`task-${taskId}`} checked={isCompleted} onCheckedChange={onToggle} />
      <label
        htmlFor={`task-${taskId}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {taskName}
      </label>
    </div>
  )
}
```