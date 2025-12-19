/**
 * @file app-sidebar.tsx
 * @description 애플리케이션의 메인 사이드바 컴포넌트.
 *              전역 내비게이션 구조를 정의하고, 다양한 업무 모듈로의 접근을 제공합니다.
 *              shadcn/ui의 Sidebar 컴포넌트를 기반으로 하며, navMain, navDocuments, navSecondary 등의 데이터를 사용하여 메뉴를 구성합니다.
 */

"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconCash,
  IconShoppingCart,
  IconClock,
  IconUserScan,
  IconFileInvoice,
  IconBuildingFactory,
  IconBox,
  IconPackage,
  IconBuildingWarehouse,
  IconCoins,
  IconChartLine,
  IconBuildingStore,
  IconTruckDelivery,
  IconBarcode,
  IconHash,
  IconReceipt2, // Sales/Marketing 카테고리 아이콘
  IconReceipt, // 구매(입고) 아이콘
  IconFilePencil, // 견적요청 아이콘
  IconClipboardText, // 발주계획 아이콘
  IconGauge, // MRP 아이콘
  IconPrinter, // 발주서 아이콘
  IconTruckLoading, // 판매(출고) 아이콘
  IconFileText, // 거래명세서 아이콘
  IconFileDollar, // 견적/주문관리 아이콘
  IconCashRegister, // 포스(POS) 아이콘
  IconTools, // A/S관리 아이콘
  IconMedicalCross, // 의료기기 공급내역보고 아이콘
  IconTarget,
  IconCreditCard, // 카드/PG사 연동 아이콘 추가
  IconBriefcase, // 그룹웨어 아이콘 추가
  IconShare, // 업무공유 아이콘 추가
  IconSignature, // 전자결재 아이콘 추가
  IconCloud, // 클라우드 스토리지 아이콘 추가
  IconHeadset, // 원격지원 아이콘 추가
  IconCalendar, // 일정관리 아이콘 추가
  IconCheckbox, // 투표/설문조사 아이콘 추가
  IconSteeringWheel, // 차량운행일지 아이콘 추가
  IconArrowsMaximize, // Add for expand all
  IconArrowsMinimize, // Add for collapse all
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { useLanguage } from "../contexts/language-context" // Import useLanguage
import { getTranslation } from "../lib/i18n" // Import getTranslation

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// 사이드바 메뉴 데이터를 정의하는 객체입니다.
// 각 카테고리(예: HR/Payroll, Sales/Marketing)와 해당 카테고리 내의 하위 메뉴 항목들을 포함합니다.
// navMain은 주요 업무 모듈, navClouds는 클라우드 관련 기능, navSecondary는 설정/도움말 등 보조 기능을 담당합니다.
const data = {
  // 메인 내비게이션 항목들을 정의합니다.
  // 각 객체는 단일 메뉴 항목이거나, 'items' 속성을 포함하여 하위 메뉴를 가진 카테고리를 나타낼 수 있습니다.
  // 'url'이 '#'인 항목은 클릭 시 바로 페이지로 이동하지 않고 하위 메뉴를 토글하는 카테고리 역할을 합니다.
  navMain: [
    {
      title: "sidebar_dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "sidebar_hr_payroll_category",
      url: "#", // HR/Payroll 카테고리 자체에는 직접적인 페이지가 없음
      icon: IconUsers,
      items: [
        {
          title: "sidebar_hr_payroll_management",
          url: "/hr/payroll",
          icon: IconCash,
        },
        {
          title: "sidebar_hr_online_payroll_inquiry",
          url: "/hr/payroll-inquiry",
          icon: IconSearch,
        },
        {
          title: "sidebar_hr_attendance_management",
          url: "/hr/attendance",
          icon: IconClock,
        },
        {
          title: "sidebar_hr_personnel_management",
          url: "/hr/personnel",
          icon: IconUserScan,
        },
        {
          title: "sidebar_hr_year_end_tax_settlement",
          url: "/hr/yearend-tax",
          icon: IconFileInvoice,
        },
        {
          title: "sidebar_hr_severance_management",
          url: "/hr/severance",
          icon: IconFileDollar,
        },
      ],
    },
    {
      title: "sidebar_groupware_category",
      url: "#",
      icon: IconBriefcase,
      items: [
        { title: "sidebar_groupware_collaboration", url: "/groupware/collaboration", icon: IconShare },
        { title: "sidebar_groupware_e_approval", url: "/groupware/e-approval", icon: IconSignature },
        { title: "sidebar_groupware_cloud_storage", url: "/groupware/cloud-storage", icon: IconCloud },
        { title: "sidebar_groupware_remote_support", url: "/groupware/remote-support", icon: IconHeadset },
        { title: "sidebar_groupware_crm", url: "/groupware/crm", icon: IconUsers },
        { title: "sidebar_groupware_schedule_management", url: "/groupware/schedule", icon: IconCalendar },
        { title: "sidebar_groupware_time_attendance", url: "/groupware/time-attendance", icon: IconClock },
        { title: "sidebar_groupware_surveys", url: "/groupware/surveys", icon: IconCheckbox },
        { title: "sidebar_groupware_vehicle_log", url: "/groupware/vehicle-log", icon: IconSteeringWheel },
      ],
    },
    {
      title: "sidebar_sales_marketing_category",
      url: "#",
      icon: IconReceipt2,
      items: [
        {
          title: "sidebar_sales_customer_management",
          url: "/sales-mgmt/partners?type=customer",
          icon: IconUsers,
        },
        {
          title: "sidebar_sales_outbound",
          url: "/sales-mgmt/sales-outbound",
          icon: IconTruckLoading,
        },
        {
          title: "sidebar_sales_transaction_statement",
          url: "/sales-mgmt/transaction-statement",
          icon: IconFileText,
        },
        {
          title: "sidebar_sales_quotation_order_management",
          url: "/sales-mgmt/quotation-order-management",
          icon: IconFileDollar,
        },
        {
          title: "sidebar_sales_pos",
          url: "/sales-mgmt/pos",
          icon: IconCashRegister,
        },
        {
          title: "sidebar_sales_ar_management",
          url: "/sales-mgmt/ar-management",
          icon: IconCash,
        },
        {
          title: "sidebar_sales_shipment_management",
          url: "/sales-mgmt/shipment-management",
          icon: IconTruckDelivery,
        },
        {
          title: "sidebar_sales_after_sales_management",
          url: "/sales-mgmt/after-sales-management",
          icon: IconTools,
        },
        {
          title: "sidebar_sales_shopping_mall_management",
          url: "/sales-mgmt/shopping-mall-management",
          icon: IconShoppingCart,
        },
        {
          title: "sidebar_sales_medical_device_report",
          url: "/sales-mgmt/medical-device-report",
          icon: IconMedicalCross,
        },
        {
          title: "sidebar_sales_invoice_packing_list",
          url: "/sales-mgmt/invoice-packing-list",
          icon: IconFileInvoice,
        },
        {
          title: "sidebar_sales_plan",
          url: "/sales-mgmt/sales-plan",
          icon: IconTarget,
        },
      ],
    },
    {
      title: "sidebar_inventory_distribution_category",
      url: "#", // Inventory/Distribution 카테고리 자체에는 직접적인 페이지가 없음
      icon: IconPackage,
      items: [
        {
          title: "sidebar_inventory_item_management",
          url: "/inventory-dist/item-management",
          icon: IconBox,
        },
        {
          title: "sidebar_inventory_movement",
          url: "/inventory-dist/inventory-movement",
          icon: IconDatabase, // IconDatabase는 이미 임포트되어 있음
        },
        {
          title: "sidebar_inventory_ledger_report",
          url: "/inventory-dist/inventory-ledger",
          icon: IconReport,
        },
        {
          title: "sidebar_inventory_warehouse_management",
          url: "/inventory-dist/warehouse-management",
          icon: IconBuildingWarehouse,
        },
        {
          title: "sidebar_inventory_unit_price_management",
          url: "/inventory-dist/unit-price-management",
          icon: IconCoins,
        },
        {
          title: "sidebar_inventory_profit_management",
          url: "/inventory-dist/profit-management",
          icon: IconChartLine,
        },
        {
          title: "sidebar_inventory_store_management",
          url: "/inventory-dist/store-management",
          icon: IconBuildingStore,
        },
        {
          title: "sidebar_inventory_online_ordering",
          url: "/inventory-dist/online-ordering",
          icon: IconShoppingCart,
        },
        {
          title: "sidebar_inventory_order_management",
          url: "/inventory-dist/order-management",
          icon: IconTruckDelivery,
        },
        {
          title: "sidebar_inventory_barcode",
          url: "/inventory-dist/barcode",
          icon: IconBarcode,
        },
        {
          title: "sidebar_inventory_serial_lot_management",
          url: "/inventory-dist/serial-lot-management",
          icon: IconHash,
        },
        {
          title: "sidebar_inventory_wms",
          url: "/inventory-dist/wms",
          icon: IconBuildingWarehouse,
        },
      ],
    },
    {
      title: "sidebar_purchase_order_category",
      url: "#",
      icon: IconShoppingCart, // 구매/발주 카테고리 아이콘
      items: [
        {
          title: "sidebar_purchase_goods_receipt",
          url: "/purchase-mgmt/goods-receipt",
          icon: IconReceipt,
        },
        {
          title: "sidebar_purchase_vendor_management",
          url: "/sales-mgmt/partners?type=vendor", // 이동된 경로
          icon: IconUsers,
        },
        {
          title: "sidebar_purchase_rfq",
          url: "/purchase-mgmt/rfq",
          icon: IconFilePencil,
        },
        {
          title: "sidebar_purchase_planning",
          url: "/purchase-mgmt/purchase-planning",
          icon: IconClipboardText,
        },
        {
          title: "sidebar_purchase_mrp",
          url: "/purchase-mgmt/mrp",
          icon: IconGauge,
        },
        {
          title: "sidebar_purchase_order_document",
          url: "/purchase-mgmt/po-document",
          icon: IconPrinter,
        },
      ],
    },
    {
      title: "sidebar_accounting_finance_category",
      url: "#",
      icon: IconChartBar, // A suitable icon for accounting/finance
      items: [
        { title: "sidebar_accounting_management_reports", url: "/accounting/management-reports", icon: IconReport },
        { title: "sidebar_accounting_easy_input", url: "/accounting/easy-input", icon: IconFilePencil },
        { title: "sidebar_accounting_ar_ap", url: "/accounting/ar-ap", icon: IconListDetails },
        { title: "sidebar_accounting_expense_control", url: "/accounting/expense-control", icon: IconCash },
        { title: "sidebar_accounting_bank_integration", url: "/accounting/bank-integration", icon: IconDatabase },
        { title: "sidebar_accounting_payment_integration", url: "/accounting/payment-integration", icon: IconCreditCard },
        { title: "sidebar_accounting_nts_integration", url: "/accounting/nts-integration", icon: IconBuildingFactory },
        { title: "sidebar_accounting_e_tax_invoice", url: "/accounting/e-tax-invoice", icon: IconFileInvoice },
        { title: "sidebar_accounting_vat_report", url: "/accounting/vat-report", icon: IconFileDescription },
        { title: "sidebar_accounting_fund_planning", url: "/accounting/fund-planning", icon: IconChartLine },
        { title: "sidebar_accounting_budget_management", url: "/accounting/budget-management", icon: IconReport },
        { title: "sidebar_accounting_fixed_assets", url: "/accounting/fixed-assets", icon: IconBuildingFactory },
        { title: "sidebar_accounting_fx_management", url: "/accounting/fx-management", icon: IconCoins },
        { title: "sidebar_accounting_trade_management", url: "/accounting/trade-management", icon: IconTruckDelivery },
        { title: "sidebar_accounting_non_profit_accounting", url: "/accounting/non-profit-accounting", icon: IconUsers },
        { title: "sidebar_accounting_chart_of_accounts", url: "/accounting/chart-of-accounts", icon: IconSettings },
        { title: "sidebar_accounting_contract_management", url: "/accounting/contract-management", icon: IconFileDescription },
      ],
    },

  ],
  navClouds: [ // 이전에 있던 Lifecycle, Analytics, Projects, Team 등은 제거
    {
      title: "sidebar_clouds_capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "sidebar_clouds_active_proposals",
          url: "#",
        },
        {
          title: "sidebar_clouds_archived",
          url: "#",
        },
      ],
    },
    {
      title: "sidebar_clouds_proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "sidebar_clouds_active_proposals",
          url: "#",
        },
        {
          title: "sidebar_clouds_archived",
          url: "#",
        },
      ],
    },
    {
      title: "sidebar_clouds_prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "sidebar_clouds_active_proposals",
          url: "#",
        },
        {
          title: "sidebar_clouds_archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "sidebar_secondary_settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "sidebar_secondary_get_help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "sidebar_secondary_search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

/**
 * @component AppSidebar
 * @description 애플리케이션의 전체 사이드바 레이아웃을 렌더링하는 메인 컴포넌트입니다.
 *              SidebarProvider를 통해 사이드바의 상태(열림/닫힘)를 관리하고,
 *              NavMain, NavDocuments, NavSecondary 컴포넌트에 데이터를 전달하여 실제 메뉴를 구성합니다.
 * @param {React.ComponentProps<typeof Sidebar>} props - Sidebar 컴포넌트가 받는 모든 prop.
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [allOpen, setAllOpen] = React.useState(true); // State to control all submenus
  const { language } = useLanguage(); // Get current language
  // Mock user data for demonstration purposes to satisfy the NavUser component's prop requirements.
  // In a real application, this data would come from an authentication context or be fetched.
  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://github.com/shadcn.png", // Example avatar
  };

  const toggleAll = () => {
    setAllOpen(prev => !prev);
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu className="flex-row justify-between"> {/* Added flex-row justify-between */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">{getTranslation(language, 'app_brand_name')}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem> {/* New menu item for the toggle button */}
            <SidebarMenuButton onClick={toggleAll} tooltip={allOpen ? getTranslation(language, 'common_collapse_all') : getTranslation(language, 'common_expand_all')}>
              {allOpen ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} allOpen={allOpen} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={mockUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
