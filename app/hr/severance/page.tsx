/**
 * @file severance/page.tsx
 * @description 퇴직금 관리 페이지를 담당하는 컴포넌트입니다.
 *              직원별 퇴직금 자동 계산, 중도정산, 추계액 조회 기능을 제공합니다.
 *              shadcn/ui의 Table, Dialog 컴포넌트와 tanstack/react-table 라이브러리를 활용합니다.
 */

"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, Calculator, FileText } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useLanguage } from '@/contexts/language-context'; // Import useLanguage
import { getTranslation } from '@/lib/i18n'; // Import getTranslation
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { mockEmployees, Employee } from "@/lib/mock-employee-data"

const getEmployeeName = (employeeId: number) => {
    return mockEmployees.find(e => e.id === employeeId)?.name || 'N/A';
};

/**
 * @interface SeveranceEmployee
 * @description 퇴직금 계산 및 관리에 필요한 직원 정보를 확장한 인터페이스.
 */
interface SeveranceEmployee extends Employee {
  yearsOfService: number; // 근속 연수
  estimatedSeverancePay: number; // 추정 퇴직금
  nonStatutoryPay: number; // 법정 외 퇴직금
  status: '재직' | '중도정산'; // 재직 상태 또는 중도정산 여부
}

/**
 * @function calculateSeverancePay
 * @description 직원의 입사일과 현재 상태를 기준으로 퇴직금을 추정 계산하는 함수.
 *              실제 시스템에서는 더 복잡한 평균 임금 계산 로직이 필요합니다.
 * @param {string} hireDate - 직원의 입사일 (YYYY-MM-DD 형식).
 * @param {'재직' | '중도정산'} currentStatus - 직원의 현재 상태.
 * @param {number} nonStatutoryPay - 법정 외 퇴직금 (기본값 0).
 * @returns {{ years: number, pay: number }} 근속 연수와 추정 퇴직금.
 */
const calculateSeverancePay = (hireDate: string, currentStatus: '재직' | '중도정산', nonStatutoryPay: number = 0): { years: number, pay: number } => {
  const today = new Date();
  const hire = new Date(hireDate);
  
  if (currentStatus === '중도정산') {
    // 중도정산된 직원은 추가 퇴직금 계산하지 않음 (여기서는 예시를 위해 0으로 반환)
    return { years: 0, pay: 0 };
  }

  // 근속 연수 계산 (간단화된 방식: 연도 차이만 계산)
  const yearsOfService = today.getFullYear() - hire.getFullYear();
  
  // 퇴직금 계산 (간소화된 방식: 월급 * 근속 연수)
  // 실제 퇴직금은 평균 임금, 퇴직금 산정 기간 등 복잡한 법규에 따라 계산됩니다.
  // 여기서는 목업 목적으로 고정 평균 월급을 사용합니다.
  const averageMonthlySalary = 3000000; 
  const estimatedPay = (yearsOfService * averageMonthlySalary) + nonStatutoryPay;

  return { years: yearsOfService, pay: estimatedPay };
};

/**
 * @component SeverancePage
 * @description 퇴직금 관리 기능을 제공하는 메인 페이지 컴포넌트입니다.
 *              직원별 추정 퇴직금 조회, 중도 정산 처리, 법정 외 퇴직금 반영 등의 기능을 포함합니다.
 */
export default function SeverancePage() {
  const { language } = useLanguage();
  // 직원 목록 및 퇴직금 관련 상태. 초기화 시 각 직원의 퇴직금을 추정 계산합니다.
  const [employees, setEmployees] = React.useState<SeveranceEmployee[]>(() => 
    mockEmployees.map(emp => {
      const { years, pay } = calculateSeverancePay(emp.hireDate, '재직');
      return { ...emp, yearsOfService: years, estimatedSeverancePay: pay, nonStatutoryPay: 0, status: '재직' };
    })
  );
  // 퇴직금 상세 계산/수정 다이얼로그의 열림/닫힘 상태.
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);
  // 현재 선택된 직원 정보. 다이얼로그에서 사용됩니다.
  const [selectedEmployee, setSelectedEmployee] = React.useState<SeveranceEmployee | null>(null);
  // 법정 외 퇴직금 입력 필드의 상태.
  const [nonStatutoryPayInput, setNonStatutoryPayInput] = React.useState(0);

  // tanstack/react-table을 위한 상태 변수들.
  // 정렬 상태.
  const [sorting, setSorting] = React.useState<SortingState>([])
  // 컬럼 필터 상태.
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  // 컬럼 가시성 상태.
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  // 행 선택 상태.
  const [rowSelection, setRowSelection] = React.useState({})

  // 부서 ID를 기반으로 부서 이름을 찾아 반환하는 헬퍼 함수입니다. (참고: mockEmployees 데이터에 부서 정보가 직접 포함되어 있지 않아 N/A로 표시될 수 있습니다)
  const getDepartmentName = (departmentId: number) => {
    // 실제 구현에서는 departmentId를 사용하여 departments 목록에서 이름을 찾아야 합니다.
    // 현재 mockEmployees는 department 객체를 포함하지 않으므로 임시로 'N/A'를 반환하거나 다른 방식을 사용합니다.
    return (mockEmployees as any).find((e: any) => e.departmentId === departmentId)?.department?.name || getTranslation(language, 'common_na');
  }

  /**
   * @function handleNonStatutoryPayChange
   * @description 법정 외 퇴직금 입력 필드의 변경을 처리하는 함수.
   * @param {React.ChangeEvent<HTMLInputElement>} e - 입력 필드 변경 이벤트.
   */
  const handleNonStatutoryPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNonStatutoryPayInput(Number(e.target.value));
  };

  /**
   * @function handleSaveSeveranceDetails
   * @description 퇴직금 상세 정보(법정 외 퇴직금)를 저장하는 함수.
   *              변경된 법정 외 퇴직금을 반영하여 추정 퇴직금을 다시 계산하고 직원 목록을 업데이트합니다.
   */
  const handleSaveSeveranceDetails = () => {
    if (selectedEmployee) {
      const { years, pay } = calculateSeverancePay(selectedEmployee.hireDate, selectedEmployee.status, nonStatutoryPayInput);
      setEmployees(prev => prev.map(emp => 
        emp.id === selectedEmployee.id 
          ? { ...emp, nonStatutoryPay: nonStatutoryPayInput, estimatedSeverancePay: pay, yearsOfService: years } 
          : emp
      ));
      setIsDetailDialogOpen(false); // 다이얼로그 닫기
    }
  };

  /**
   * @function handleMidTermSettlement
   * @description 특정 직원의 퇴직금을 중간 정산 처리하는 함수.
   *              직원의 상태를 '중도정산'으로 변경하고, 현재까지의 추정 퇴직금을 확정합니다.
   * @param {number} employeeId - 중간 정산할 직원의 ID.
   */
  const handleMidTermSettlement = (employeeId: number) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, status: '중도정산', estimatedSeverancePay: emp.estimatedSeverancePay + emp.nonStatutoryPay } // 중도정산 시 현재까지의 퇴직금 확정
        : emp
    ));
    alert(`${getEmployeeName(employeeId)}${getTranslation(language, 'severance_mid_term_settlement_success')}`);
  };

  /**
   * @function handleCancelMidTermSettlement
   * @description 특정 직원의 중도 정산을 취소하고, 상태를 '재직'으로 되돌립니다.
   *              추정 퇴직금은 다시 계산됩니다.
   * @param {number} employeeId - 중도 정산을 취소할 직원의 ID.
   */
  const handleCancelMidTermSettlement = (employeeId: number) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === employeeId) {
        // 상태를 '재직'으로 되돌리고 퇴직금 재계산
        const { years, pay } = calculateSeverancePay(emp.hireDate, '재직', emp.nonStatutoryPay);
        return { ...emp, status: '재직', yearsOfService: years, estimatedSeverancePay: pay };
      }
      return emp;
    }));
    alert(`${getEmployeeName(employeeId)}${getTranslation(language, 'severance_cancel_mid_term_settlement_success')}`);
  };

  // tanstack/react-table의 컬럼 정의.
  const columns: ColumnDef<SeveranceEmployee>[] = [
    {
      accessorKey: "name",
      header: getTranslation(language, 'payroll_col_employee'),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "departmentId",
      header: getTranslation(language, 'severance_col_department'),
      cell: ({ row }) => getDepartmentName(row.getValue("departmentId")),
    },
    {
      accessorKey: "position",
      header: getTranslation(language, 'severance_col_position'),
      cell: ({ row }) => <div>{row.getValue("position")}</div>,
    },
    {
      accessorKey: "hireDate",
      header: getTranslation(language, 'severance_col_hire_date'),
      cell: ({ row }) => <div>{row.getValue("hireDate")}</div>,
    },
    {
      accessorKey: "yearsOfService",
      header: getTranslation(language, 'severance_col_years_of_service'),
      cell: ({ row }) => <div>{row.original.yearsOfService}{getTranslation(language, 'common_year_suffix')}</div>,
    },
    {
      accessorKey: "estimatedSeverancePay",
      header: getTranslation(language, 'severance_col_estimated_severance_pay'),
      cell: ({ row }) => (
        <div className="text-right">
          {row.original.estimatedSeverancePay.toLocaleString()}{getTranslation(language, 'common_currency_unit')}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: getTranslation(language, 'payroll_col_status'),
      cell: ({ row }) => (
        <div>{row.original.status}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const employee = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{getTranslation(language, 'common_open_menu')}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{getTranslation(language, 'common_actions')}</DropdownMenuLabel>
              {/* 상세 계산/수정 다이얼로그를 여는 버튼 */}
              <DropdownMenuItem onClick={() => {
                setSelectedEmployee(employee);
                setNonStatutoryPayInput(employee.nonStatutoryPay); // 현재 법정 외 퇴직금으로 초기화
                setIsDetailDialogOpen(true);
              }}>
                <Calculator className="mr-2 h-4 w-4" /> {getTranslation(language, 'severance_detail_calculation_edit')}
              </DropdownMenuItem>
              {/* 재직 상태인 직원에 대해서만 중도 정산 버튼을 표시 */}
              {employee.status === '재직' && (
                <DropdownMenuItem onClick={() => handleMidTermSettlement(employee.id)} className="text-blue-600">
                  <FileText className="mr-2 h-4 w-4" /> {getTranslation(language, 'severance_mid_term_settlement')}
                </DropdownMenuItem>
              )}
              {/* 중도정산 상태인 직원에 대해서만 중도 정산 취소 버튼을 표시 */}
              {employee.status === '중도정산' && (
                <DropdownMenuItem onClick={() => handleCancelMidTermSettlement(employee.id)} className="text-red-600">
                  <FileText className="mr-2 h-4 w-4" /> {getTranslation(language, 'severance_cancel_mid_term_settlement')}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  // useReactTable 훅을 사용하여 테이블 인스턴스를 생성합니다.
  // 데이터, 컬럼 정의, 정렬, 필터링, 페이지네이션, 컬럼 가시성, 행 선택 등의 기능을 관리합니다.
  const table = useReactTable({
    data: employees,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)" } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col p-4 lg:p-6">
            <h1 className="text-2xl font-semibold mb-6">{getTranslation(language, 'sidebar_hr_severance_management')}</h1>
            
            <div className="w-full">
                {/* 직원 이름으로 검색 필터 */}
                <div className="flex items-center justify-between py-4">
                    <Input
                      placeholder={getTranslation(language, 'severance_search_employee_placeholder')}
                      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                      onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                      }
                      className="max-w-sm"
                    />
                </div>
                {/* 퇴직금 추정 목록을 표시하는 데이터 테이블 */}
                <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                              return (
                                <TableHead key={header.id}>
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                </TableHead>
                              )
                            })}
                          </TableRow>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                            <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                            >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={columns.length}
                              className="h-24 text-center"
                            >
                              {getTranslation(language, 'common_no_results')}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  {/* 페이지네이션 컨트롤 */}
                  <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      {getTranslation(language, 'common_previous')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      {getTranslation(language, 'common_next')}
                    </Button>
                  </div>
            </div>

            {/* 퇴직금 상세 계산 및 수정 다이얼로그 */}
            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{getTranslation(language, 'severance_detail_calculation_title')}</DialogTitle>
                        <DialogDescription>
                            {getEmployeeName(selectedEmployee?.id || 0)}{getTranslation(language, 'severance_detail_calculation_description')}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedEmployee && (
                        <div className="grid gap-4 py-4 text-sm">
                            <div className="grid grid-cols-3 items-center">
                                <Label>{getTranslation(language, 'payroll_col_employee')}</Label>
                                <div className="col-span-2">{selectedEmployee.name}</div>
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <Label>{getTranslation(language, 'severance_col_hire_date')}</Label>
                                <div className="col-span-2">{selectedEmployee.hireDate}</div>
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <Label>{getTranslation(language, 'severance_col_years_of_service')}</Label>
                                <div className="col-span-2">{selectedEmployee.yearsOfService}{getTranslation(language, 'common_year_suffix')}</div>
                            </div>
                            <div className="grid grid-cols-3 items-center mt-4 border-t pt-4">
                                <Label className="font-bold">{getTranslation(language, 'severance_statutory_pay_estimated')}</Label>
                                <div className="col-span-2 text-right font-bold">
                                    {(selectedEmployee.estimatedSeverancePay - selectedEmployee.nonStatutoryPay).toLocaleString()}{getTranslation(language, 'common_currency_unit')}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <Label htmlFor="nonStatutoryPayInput">{getTranslation(language, 'severance_non_statutory_pay')}</Label>
                                <Input 
                                    id="nonStatutoryPayInput" 
                                    type="number" 
                                    value={nonStatutoryPayInput} 
                                    onChange={handleNonStatutoryPayChange} 
                                    className="col-span-2 text-right"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center font-bold text-lg mt-4 border-t pt-4">
                                <Label>{getTranslation(language, 'severance_total_estimated_pay')}</Label>
                                <div className="col-span-2 text-right text-primary">
                                    {(selectedEmployee.estimatedSeverancePay - selectedEmployee.nonStatutoryPay + nonStatutoryPayInput).toLocaleString()}{getTranslation(language, 'common_currency_unit')}
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground col-span-3 mt-4">
                                {getTranslation(language, 'severance_disclaimer')}
                            </p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>{getTranslation(language, 'common_close')}</Button>
                        <Button onClick={handleSaveSeveranceDetails}>{getTranslation(language, 'common_save')}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}