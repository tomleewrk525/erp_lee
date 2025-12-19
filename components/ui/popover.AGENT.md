# erp-system/components/ui/popover.tsx

## 컴포넌트 개요

`shadcn/ui`의 Popover 컴포넌트는 UI 요소 위에 정보를 표시하거나 추가적인 상호작용을 제공하는 작은 오버레이입니다. 클릭 시 나타나고, 외부를 클릭하면 닫히는 형태로 사용됩니다.

## 사용법

`Popover`, `PopoverTrigger`, `PopoverContent`와 같은 하위 컴포넌트들을 사용하여 구현됩니다. `PopoverTrigger`가 클릭될 때 `PopoverContent`가 표시됩니다.

## 예시

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function UserSettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">설정 열기</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">크기</h4>
            <p className="text-sm text-muted-foreground">
              팝오버의 크기를 설정합니다.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">너비</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">최대 너비</Label>
              <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">높이</Label>
              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```