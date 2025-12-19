/**
 * @file nav-main.tsx
 * @description 애플리케이션의 메인 내비게이션 메뉴를 렌더링하는 컴포넌트입니다.
 *              상위 컴포넌트(AppSidebar)로부터 전달받은 메뉴 항목들을 기반으로
 *              카테고리별 하위 메뉴를 토글하고 관리하는 기능을 제공합니다.
 *              shadcn/ui의 Sidebar 컴포넌트와 그 하위 요소들을 활용하여 구현되었습니다.
 */

"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation" // Import usePathname
import { IconCirclePlusFilled, IconMail, type Icon, IconChevronDown, IconCheck } from "@tabler/icons-react"
import { useLanguage } from '../contexts/language-context'; // Import useLanguage
import { getTranslation } from '../lib/i18n'; // Import getTranslation

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

/**
 * @component NavMain
 * @description 메인 내비게이션 메뉴와 그 하위 항목들을 렌더링합니다.
 *              각 카테고리 메뉴는 클릭 시 하위 메뉴를 확장/축소할 수 있습니다.
 * @param {object} props
 * @param {Array<object>} props.items - 표시될 내비게이션 항목들의 배열.
 *        각 항목은 `title`, `url`, `icon`을 포함하거나, `items` 배열을 포함하여 카테고리를 구성할 수 있습니다.
 */
export function NavMain({
  items,
  allOpen,
}: {
  items: {
    title: string
    url?: string // url이 없을 수도 있음 (카테고리인 경우)
    icon?: Icon
    items?: {
      title: string
      url: string
      icon?: Icon
    }[]
  }[],
  allOpen: boolean; // Add allOpen prop
}) {
  const { language } = useLanguage(); // Get current language from context
  // 각 하위 메뉴(카테고리)의 열림/닫힘 상태를 관리하는 로컬 상태입니다.
  // 카테고리 'title'을 키로 사용하여 해당 카테고리가 열렸는지(true) 닫혔는지(false)를 저장합니다.
  // 초기화 시에는 모든 하위 메뉴가 기본적으로 열린 상태로 설정됩니다.
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>(() => {
    const initialOpenState: Record<string, boolean> = {};
    items.forEach(item => {
      if (item.items) { // It's a category
        initialOpenState[item.title] = allOpen; // Initialize based on allOpen
      }
    });
    return initialOpenState;
  });

  // Effect to react to changes in allOpen prop
  React.useEffect(() => {
    setOpenSubmenus(prev => {
      const newOpenState: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        newOpenState[key] = allOpen;
      });
      return newOpenState;
    });
  }, [allOpen, items]); // Include items in dependency array for completeness

  const pathname = usePathname(); // Get the current pathname

  // 하위 메뉴(카테고리)의 열림/닫힘 상태를 토글하는 함수입니다.
  const toggleSubmenu = (title: string) => {
    setOpenSubmenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>{getTranslation(language, 'quick_create')}</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <React.Fragment key={item.title}>
              <SidebarMenuItem>
                {item.items ? (
                  <SidebarMenuButton tooltip={getTranslation(language, item.title)} onClick={() => toggleSubmenu(item.title)}>
                    {item.icon && <item.icon />}
                    <span>{getTranslation(language, item.title)}</span>
                    <IconChevronDown className={`ml-auto h-4 w-4 transition-transform ${openSubmenus[item.title] ? 'rotate-180' : ''}`} />
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton tooltip={getTranslation(language, item.title)} asChild>
                    <Link href={item.url || "#"}>
                      <span className="flex items-center">
                        {item.icon && <item.icon />}
                        <span className="ml-2">{getTranslation(language, item.title)}</span>
                        {pathname === item.url && <IconCheck className="ml-auto h-4 w-4 text-red-500" />}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
              {item.items && openSubmenus[item.title] && (
                <div className="ml-6 flex flex-col gap-1">
                  {item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton tooltip={getTranslation(language, subItem.title)} asChild>
                        <Link href={subItem.url}>
                          <span className="flex items-center">
                            {subItem.icon && <subItem.icon className="h-4 w-4" />}
                            <span className="ml-2">{getTranslation(language, subItem.title)}</span>
                            {pathname === subItem.url && <IconCheck className="ml-auto h-4 w-4 text-red-500" />}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}