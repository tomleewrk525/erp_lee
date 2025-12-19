"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { ActivityTable } from "@/components/activity-table"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { DashboardChart } from "@/components/dashboard-chart"
import { useLanguage } from '../../contexts/language-context'; // Import useLanguage
import { getTranslation } from '../../lib/i18n'; // Import getTranslation

export default function Page() {
  const { language } = useLanguage();
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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <DashboardChart />
              </div>
              <DataTable />
              <div className="px-4 lg:px-6"> {/* New div for ActivityTable */}
                <h2 className="text-xl font-semibold mb-4">{getTranslation(language, 'dashboard_recent_activities_title')}</h2>
                <ActivityTable />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

