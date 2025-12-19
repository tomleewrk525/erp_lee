"use client"

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MedicalDeviceReportPage() {
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
          <h1 className="text-2xl font-semibold mb-6">의료기기 공급내역보고</h1>
          <p>의료기기 제품의 공급 내역을 기록하고 보고서를 생성하는 페이지입니다. 규제 준수를 위한 보고서 기능이 추가될 예정입니다.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
