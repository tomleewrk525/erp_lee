"use client"

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose, // Added DialogClose here
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconDownload, IconDotsVertical, IconEye } from "@tabler/icons-react";
import { mockPayrollRecords, PayrollRecord } from "@/lib/mock-payroll-data";
import { mockEmployees, Employee } from "@/lib/mock-employee-data";
import { useLanguage } from '../../../contexts/language-context'; // Corrected import path
import { getTranslation } from '../../../lib/i18n'; // Corrected import path

// Dummy logged-in employee ID for demonstration
const loggedInEmployeeId = 1;

// Function to simulate fetching payroll records for a specific employee
const getEmployeePayrollRecords = (employeeId: number): PayrollRecord[] => {
  return mockPayrollRecords.filter(record => record.employeeId === employeeId);
};

// Function to simulate fetching employee details
const getEmployeeById = (employeeId: number): Employee | undefined => {
  return mockEmployees.find(employee => employee.id === employeeId);
};

interface PayslipPreviewDialogProps {
  record: PayrollRecord;
  employee: Employee;
  children: React.ReactNode;
}

const PayslipPreviewDialog: React.FC<PayslipPreviewDialogProps> = ({ record, employee, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{employee.name}님의 급여 명세서 ({record.period})</DialogTitle>
          <DialogDescription>
            {record.paymentDate} 지급 내역 상세
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
          <div className="flex justify-between">
            <span>지급월:</span>
            <span className="font-medium">{record.period}</span>
          </div>
          <div className="flex justify-between">
            <span>지급일:</span>
            <span className="font-medium">{record.paymentDate}</span>
          </div>
          <div className="flex justify-between">
            <span>기본급:</span>
            <span className="font-medium">{record.baseSalary.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span>상여금:</span>
            <span className="font-medium">{record.bonus.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>총 지급액:</span>
            <span>{record.totalEarnings.toLocaleString()}원</span>
          </div>
          <div className="border-t pt-2 mt-2" />
          <div className="flex justify-between">
            <span>소득세:</span>
            <span className="font-medium">{record.incomeTax.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span>보험료:</span>
            <span className="font-medium">{record.insurance.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>총 공제액:</span>
            <span>{record.totalDeductions.toLocaleString()}원</span>
          </div>
          <div className="border-t pt-2 mt-2" />
          <div className="flex justify-between font-bold text-xl text-primary">
            <span>실지급액:</span>
            <span>{record.netPay.toLocaleString()}원</span>
          </div>
        </div>
        <DialogFooter className="flex-row justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <IconDownload className="mr-2 h-4 w-4" /> 다운로드
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>다운로드 확인</AlertDialogTitle>
                <AlertDialogDescription>
                  급여 명세서 ({record.period})를 다운로드하시겠습니까?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={() => alert(`급여 명세서 (${record.period}) 다운로드 준비 중...`)}>
                  다운로드
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DialogClose asChild>
            <Button type="button" variant="secondary">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function PayrollInquiryPage() {
  const { language } = useLanguage(); // Get current language from context
  const employee = getEmployeeById(loggedInEmployeeId);
  const payrollRecords = getEmployeePayrollRecords(loggedInEmployeeId);

  // Mock year-end tax data for the employee
  const mockYearEndTaxData = {
    totalIncome: 60000000,
    totalDeductions: 15000000,
    taxPaid: 3000000,
    refundAmount: 500000,
    status: "완료",
  };

  if (!employee) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-4 lg:p-6">
        <h1 className="text-2xl font-semibold mb-6">오류: 직원 정보를 찾을 수 없습니다.</h1>
      </div>
    );
  }

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
          <h1 className="text-2xl font-semibold mb-6">{getTranslation(language, 'payroll_inquiry_title')}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {getTranslation(language, 'payroll_inquiry_description', { name: employee.name })}
          </p>

          {/* Payroll Records Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>급여 명세서</CardTitle>
              <CardDescription>귀하의 급여 지급 내역입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              {payrollRecords.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>귀속월</TableHead>
                        <TableHead>지급일</TableHead>
                        <TableHead>기본급</TableHead>
                        <TableHead>상여금</TableHead>
                        <TableHead>총 지급액</TableHead>
                        <TableHead>총 공제액</TableHead>
                        <TableHead className="text-right">실지급액</TableHead>
                        <TableHead className="text-center">상태</TableHead>
                        <TableHead className="text-center">액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payrollRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.period}</TableCell>
                          <TableCell>{record.paymentDate}</TableCell>
                          <TableCell>{record.baseSalary.toLocaleString()}원</TableCell>
                          <TableCell>{record.bonus.toLocaleString()}원</TableCell>
                          <TableCell>{record.totalEarnings.toLocaleString()}원</TableCell>
                          <TableCell>{record.totalDeductions.toLocaleString()}원</TableCell>
                          <TableCell className="text-right font-semibold">{record.netPay.toLocaleString()}원</TableCell>
                          <TableCell className="text-center">{record.status}</TableCell>
                          <TableCell className="text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                                  size="icon"
                                >
                                  <IconDotsVertical />
                                  <span className="sr-only">메뉴 열기</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-32">
                                <PayslipPreviewDialog record={record} employee={employee}>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <IconEye className="mr-2 h-4 w-4" /> 미리보기
                                  </DropdownMenuItem>
                                </PayslipPreviewDialog>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <IconDownload className="mr-2 h-4 w-4" /> 다운로드
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>다운로드 확인</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        급여 명세서 ({record.period})를 다운로드하시겠습니까?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>취소</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => alert(`급여 명세서 (${record.period}) 다운로드 준비 중...`)}>
                                        다운로드
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p>조회할 급여 명세서가 없습니다.</p>
              )}
            </CardContent>
          </Card>

          {/* Year-End Tax Section */}
          <Card>
            <CardHeader>
              <CardTitle>연말정산 자료</CardTitle>
              <CardDescription>귀하의 연말정산 관련 요약 정보입니다.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
                <span className="font-medium">총 소득:</span>
                <span>{mockYearEndTaxData.totalIncome.toLocaleString()}원</span>
              </div>
              <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
                <span className="font-medium">총 공제액:</span>
                <span>{mockYearEndTaxData.totalDeductions.toLocaleString()}원</span>
              </div>
              <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
                <span className="font-medium">기납부세액:</span>
                <span>{mockYearEndTaxData.taxPaid.toLocaleString()}원</span>
              </div>
              <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between font-semibold">
                <span>환급(납부) 예상액:</span>
                <span className={mockYearEndTaxData.refundAmount >= 0 ? "text-green-600" : "text-red-600"}>
                  {mockYearEndTaxData.refundAmount >= 0 ? "+" : "-"} {Math.abs(mockYearEndTaxData.refundAmount).toLocaleString()}원
                </span>
              </div>
              <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
                <span className="font-medium">처리 상태:</span>
                <span>{mockYearEndTaxData.status}</span>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full">
                    <IconDownload className="mr-2 h-4 w-4" /> 연말정산 자료 다운로드
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>다운로드 확인</AlertDialogTitle>
                    <AlertDialogDescription>
                      연말정산 자료를 다운로드하시겠습니까?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={() => alert("연말정산 자료 다운로드 준비 중...")}>
                      다운로드
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}