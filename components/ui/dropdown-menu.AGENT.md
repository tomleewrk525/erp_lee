# erp-system/components/ui/dropdown-menu.tsx

## 컴포넌트 개요

`shadcn/ui`의 Dropdown Menu 컴포넌트는 토글 가능한 오버레이로, 링크된 목록의 액션이나 내비게이션을 표시합니다. 주로 메뉴 버튼을 클릭했을 때 나타나는 컨텍스트 메뉴나 드롭다운 옵션 목록으로 사용됩니다.

## 사용법

`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuShortcut` 등의 하위 컴포넌트들과 함께 사용됩니다.

## 예시

```tsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">내 계정</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>내 계정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>프로필</DropdownMenuItem>
          <DropdownMenuItem>청구</DropdownMenuItem>
          <DropdownMenuItem>설정</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>로그아웃</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```