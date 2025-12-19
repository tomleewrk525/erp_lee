# erp-system/components/ui/dialog.tsx

## 컴포넌트 개요

`shadcn/ui`의 Dialog 컴포넌트는 사용자에게 중요한 정보, 확인 메시지 또는 양식을 모달 형태로 표시하는 데 사용됩니다. 배경을 어둡게 처리하여 사용자의 주의를 집중시키고 특정 작업을 완료하도록 유도합니다.

## 사용법

`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`와 같은 하위 컴포넌트들과 함께 사용됩니다.

## 예시

```tsx
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function AlertDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">정보 표시</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>알림</DialogTitle>
          <DialogDescription>
            중요한 정보가 있습니다. 확인해 주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>이것은 다이얼로그 콘텐츠입니다.</p>
        </div>
        <DialogFooter>
          <Button type="submit">확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```