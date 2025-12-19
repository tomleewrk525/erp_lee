# erp-system/components/ui/drawer.tsx

## 컴포넌트 개요

`shadcn/ui`의 Drawer 컴포넌트는 화면 가장자리에서 미끄러져 나오는 패널로, 보조적인 정보나 사용자 입력을 받는 데 사용됩니다. 모바일 환경이나 공간 제약이 있는 경우 유용하게 활용됩니다.

## 사용법

`Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerFooter`, `DrawerClose`와 같은 하위 컴포넌트들과 함께 사용됩니다.

## 예시

```tsx
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

function MobileMenuDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">메뉴 열기</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>메뉴</DrawerTitle>
          <DrawerDescription>앱의 주요 기능에 접근합니다.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <ul>
            <li>홈</li>
            <li>설정</li>
            <li>로그아웃</li>
          </ul>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">닫기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```