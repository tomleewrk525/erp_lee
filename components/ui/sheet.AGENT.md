# erp-system/components/ui/sheet.tsx

## 컴포넌트 개요

`shadcn/ui`의 Sheet 컴포넌트는 화면 가장자리에서 미끄러져 들어오는 패널(사이드바, 서랍과 유사)로, 추가적인 콘텐츠나 설정을 표시하는 데 사용됩니다. Drawer와 유사하지만, 주로 데스크톱 환경에서 더 복잡한 내용을 담을 때 사용됩니다.

## 사용법

`Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose`와 같은 하위 컴포넌트들과 함께 사용됩니다. `side` prop을 통해 어느 쪽에서 시트가 나타날지 지정할 수 있습니다.

## 예시

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function SidePanelForm() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">설정 편집</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>설정</SheetTitle>
          <SheetDescription>
            애플리케이션 설정을 변경합니다. 변경 사항은 즉시 반영됩니다.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              이름
            </Label>
            <Input id="name" value="홍길동" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              사용자명
            </Label>
            <Input id="username" value="@gildong" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">변경 사항 저장</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
```