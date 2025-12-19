"use client"

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OnlineOrderingPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 lg:p-6">
          <h1 className="text-2xl font-semibold mb-6">온라인 수발주 시스템</h1>
          <p>온라인으로 주문을 받고 처리하는 시스템 페이지입니다. 고객/매장으로부터의 주문 접수 및 관리 기능이 추가될 예정입니다.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
