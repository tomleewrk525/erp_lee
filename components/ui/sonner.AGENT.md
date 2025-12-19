# erp-system/components/ui/sonner.tsx

## 컴포넌트 개요

`sonner`는 `shadcn/ui`에서 토스트 알림을 제공하는 라이브러리입니다. 사용자에게 비침해적인 알림 메시지를 표시하여 작업 완료, 오류 발생 등의 피드백을 전달할 때 사용됩니다.

## 사용법

`Toaster` 컴포넌트를 레이아웃에 배치하고, `toast()` 함수를 사용하여 알림을 트리거합니다.

## 예시

```tsx
// layout.tsx (또는 최상위 컴포넌트)
import { Toaster } from "@/components/ui/sonner"

function RootLayout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

// 다른 컴포넌트
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

function NotificationButton() {
  return (
    <Button
      onClick={() =>
        toast("이벤트가 성공적으로 저장되었습니다.", {
          description: "일요일, 2023년 12월 3일 오전 9시 00분",
          action: {
            label: "실행 취소",
            onClick: () => console.log("실행 취소"),
          },
        })
      }
    >
      알림 표시
    </Button>
  )
}
```