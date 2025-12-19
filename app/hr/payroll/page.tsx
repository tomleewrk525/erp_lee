"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, PlusCircle, CalendarDays } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Employee, mockEmployees } from "@/lib/mock-employee-data"
import { 
  PayrollRecord, 
  mockPayrollRecords,
  PayrollStatus,
} from "@/lib/mock-payroll-data"
import { useLanguage } from '../../../contexts/language-context'; // Import useLanguage
import { getTranslation } from '../../../lib/i18n'; // Import getTranslation
import { Language } from '../../../contexts/language-context'; // Import Language type

const getEmployeeName = (employeeId: number, language: Language) => {
    return mockEmployees.find(e => e.id === employeeId)?.name || getTranslation(language, 'common_na');
};

export default function PayrollPage() {
  const { language } = useLanguage();
  const [payrollRecords, setPayrollRecords] = React.useState<PayrollRecord[]>(mockPayrollRecords);
  const [isGeneratePayrollDialogOpen, setIsGeneratePayrollDialogOpen] = React.useState(false);
  const [isPayslipDetailDialogOpen, setIsPayslipDetailDialogOpen] = React.useState(false);
  const [selectedPayslip, setSelectedPayslip] = React.useState<PayrollRecord | null>(null);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const columns: ColumnDef<PayrollRecord>[] = [
    {
      accessorKey: "paymentDate",
      header: getTranslation(language, "payroll_col_payment_date"),
    },
    {
      accessorKey: "period",
      header: getTranslation(language, "payroll_col_period"),
    },
    {
      accessorKey: "employeeId",
      header: getTranslation(language, "payroll_col_employee"),
      cell: ({ row }) => getEmployeeName(row.getValue("employeeId"), language),
    },
    {
      accessorKey: "totalEarnings",
      header: getTranslation(language, "payroll_col_total_earnings"),
      cell: ({ row }) => (
        <div className="text-right">{(row.getValue("totalEarnings") as number).toLocaleString()}원</div>
      ),
    },
    {
      accessorKey: "totalDeductions",
      header: getTranslation(language, "payroll_col_total_deductions"),
      cell: ({ row }) => (
        <div className="text-right">{(row.getValue("totalDeductions") as number).toLocaleString()}원</div>
      ),
    },
    {
      accessorKey: "netPay",
      header: getTranslation(language, "payroll_col_net_pay"),
      cell: ({ row }) => (
        <div className="text-right font-medium">{(row.getValue("netPay") as number).toLocaleString()}원</div>
      ),
    },
    {
      accessorKey: "status",
      header: getTranslation(language, "payroll_col_status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as PayrollStatus;
        const variant = {
            "완료": "default",
            "처리중": "secondary",
        }[status] || "default"
        return <Badge variant={variant as any}>{getTranslation(language, `payroll_status_${status === "완료" ? "completed" : "in_progress"}`)}</Badge>
      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payroll = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{getTranslation(language, "common_open_menu")}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{getTranslation(language, "common_actions")}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {
                setSelectedPayslip(payroll);
                setIsPayslipDetailDialogOpen(true);
              }}>
                {getTranslation(language, "payroll_view_payslip")}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">{getTranslation(language, "payroll_cancel_payment")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: payrollRecords,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleGeneratePayroll = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const year = formData.get("year") as string;
    const month = formData.get("month") as string;
    const period = `${year}-${month}`;
    const paymentDate = `${year}-${month}-25`; // Assuming 25th of the month

    const newRecords: PayrollRecord[] = mockEmployees.map(employee => {
        const baseSalary = 3000000 + (employee.id * 100000); // Mock salary calculation
        const bonus = (employee.id % 2 === 0) ? 200000 : 0;
        const totalEarnings = baseSalary + bonus;
        const incomeTax = Math.floor(totalEarnings * 0.1); // Mock tax
        const insurance = Math.floor(totalEarnings * 0.05); // Mock insurance
        const totalDeductions = incomeTax + insurance;
        const netPay = totalEarnings - totalDeductions;

        return {
            id: payrollRecords.length > 0 ? Math.max(...payrollRecords.map(r => r.id)) + 1 + employee.id : 1 + employee.id, // Ensure unique ID
            employeeId: employee.id,
            paymentDate,
            period,
            baseSalary,
            bonus,
            totalEarnings,
            incomeTax,
            insurance,
            totalDeductions,
            netPay,
            status: "완료",
        };
    });

    setPayrollRecords(prev => [...newRecords, ...prev]);
    setIsGeneratePayrollDialogOpen(false);
    alert(getTranslation(language, "payroll_alert_generate_success", { period }));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));


  return (
    <SidebarProvider
      style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)" } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col p-4 lg:p-6">
            <h1 className="text-2xl font-semibold mb-6">{getTranslation(language, "payroll_page_title")}</h1>
            
            <div className="w-full">
                <div className="flex items-center justify-between py-4">
                    <Input
                      placeholder={getTranslation(language, "payroll_search_employee_placeholder")}
                      value={(table.getColumn("employeeId")?.getFilterValue() as string) ?? ""}
                      onChange={(event) => {
                        const employee = mockEmployees.find(e => e.name.toLowerCase().includes(event.target.value.toLowerCase()));
                        table.getColumn("employeeId")?.setFilterValue(employee ? employee.id : "undefined");
                      }}
                      className="max-w-sm"
                    />
                    <Dialog open={isGeneratePayrollDialogOpen} onOpenChange={setIsGeneratePayrollDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" /> {getTranslation(language, "payroll_button_new_payroll")}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{getTranslation(language, "payroll_dialog_title_generate_payroll")}</DialogTitle>
                                <DialogDescription>
                                    {getTranslation(language, "payroll_dialog_description_select_month")}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleGeneratePayroll}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="year" className="text-right">{getTranslation(language, "payroll_label_year")}</Label>
                                        <Select name="year" defaultValue={String(currentYear)}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder={getTranslation(language, "payroll_select_placeholder_year")} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {years.map(y => <SelectItem key={y} value={y}>{y}{getTranslation(language, "common_year_suffix")}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="month" className="text-right">{getTranslation(language, "payroll_label_month")}</Label>
                                        <Select name="month" defaultValue={String(new Date().getMonth() + 1).padStart(2, '0')}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder={getTranslation(language, "payroll_select_placeholder_month")} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {months.map(m => <SelectItem key={m} value={m}>{m}{getTranslation(language, "common_month_suffix")}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">{getTranslation(language, "payroll_button_generate")}</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
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
                              {getTranslation(language, "payroll_no_results")}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      {getTranslation(language, "common_previous")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      {getTranslation(language, "common_next")}
                    </Button>
                  </div>
            </div>

            {/* Payslip Detail Dialog */}
            <Dialog open={isPayslipDetailDialogOpen} onOpenChange={setIsPayslipDetailDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{getTranslation(language, "payroll_payslip_dialog_title")}</DialogTitle>
                        <DialogDescription>
                            {getTranslation(language, "payroll_payslip_dialog_description", {
                              employeeName: getEmployeeName(selectedPayslip?.employeeId || 0, language),
                              period: selectedPayslip?.period || '',
                            })}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedPayslip && (
                        <div className="grid gap-4 py-4 text-sm">
                            <div className="grid grid-cols-2 items-center">
                                <Label>{getTranslation(language, "payroll_payslip_label_payment_date")}</Label>
                                <div>{selectedPayslip.paymentDate}</div>
                            </div>
                            <div className="grid grid-cols-2 items-center">
                                <Label>{getTranslation(language, "payroll_payslip_label_period")}</Label>
                                <div>{selectedPayslip.period}</div>
                            </div>
                            <div className="grid grid-cols-2 items-center">
                                <Label>{getTranslation(language, "payroll_payslip_label_base_salary")}</Label>
                                <div className="text-right">{selectedPayslip.baseSalary.toLocaleString()}원</div>
                            </div>
                            <div className="grid grid-cols-2 items-center">
                                <Label>{getTranslation(language, "payroll_payslip_label_bonus")}</Label>
                                <div className="text-right">{selectedPayslip.bonus.toLocaleString()}원</div>
                            </div>
                            <div className="grid grid-cols-2 items-center font-bold">
                                <Label>{getTranslation(language, "payroll_payslip_label_total_earnings")}</Label>
                                <div className="text-right">{selectedPayslip.totalEarnings.toLocaleString()}원</div>
                            </div>
                            <div className="grid grid-cols-2 items-center mt-4">
                                <Label>{getTranslation(language, "payroll_payslip_label_income_tax")}</Label>
                                <div className="text-right">{selectedPayslip.incomeTax.toLocaleString()}원</div>
                            </div>
                            <div className="grid grid-cols-2 items-center">
                                <Label>{getTranslation(language, "payroll_payslip_label_insurance")}</Label>
                                <div className="text-right">{selectedPayslip.insurance.toLocaleString()}원</div>
                            </div>
                             <div className="grid grid-cols-2 items-center font-bold">
                                <Label>{getTranslation(language, "payroll_payslip_label_total_deductions")}</Label>
                                <div className="text-right">{selectedPayslip.totalDeductions.toLocaleString()}원</div>
                            </div>
                            <div className="grid grid-cols-2 items-center font-bold text-lg mt-4">
                                <Label>{getTranslation(language, "payroll_payslip_label_net_pay")}</Label>
                                <div className="text-right text-primary">{selectedPayslip.netPay.toLocaleString()}원</div>
                            </div>
                            <div className="grid grid-cols-2 items-center mt-4">
                                <Label>{getTranslation(language, "payroll_payslip_label_status")}</Label>
                                <div><Badge variant={selectedPayslip.status === "완료" ? "default" : "secondary"}>{getTranslation(language, `payroll_status_${selectedPayslip.status === "완료" ? "completed" : "in_progress"}`)}</Badge></div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsPayslipDetailDialogOpen(false)}>{getTranslation(language, "common_close")}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}