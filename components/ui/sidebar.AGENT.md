# erp-system/components/ui/sidebar.tsx

## 컴포넌트 개요

`shadcn/ui`의 Sidebar 컴포넌트는 애플리케이션의 주요 내비게이션 또는 보조 콘텐츠를 담는 데 사용되는 사이드 패널입니다. `collapsible` 속성을 통해 접기/펼치기 기능을 제공하여 반응형 레이아웃에 유용합니다.

## 사용법

`Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarTrigger`, `SidebarInset`, `SidebarProvider`와 같은 하위 컴포넌트들과 함께 사용됩니다. `SidebarProvider`는 사이드바의 상태를 관리하고, `SidebarTrigger`는 사이드바를 토글하는 데 사용됩니다.

## 예시

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { IconHome } from "@tabler/icons-react"

function AppLayout() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/">
                  <IconHome />
                  <span>홈</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        {/* SidebarFooter, NavUser 등 */}
      </Sidebar>
      {/* 메인 콘텐츠 영역 */}
    </SidebarProvider>
  )
}
```