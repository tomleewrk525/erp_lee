"use client"

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockEmployees, Employee } from "@/lib/mock-employee-data";
import { IconDownload } from "@tabler/icons-react";

// Dummy logged-in employee ID for demonstration
const loggedInEmployeeId = 1;

// Function to simulate fetching employee details
const getEmployeeById = (employeeId: number): Employee | undefined => {
  return mockEmployees.find(employee => employee.id === employeeId);
};

// Mock Year-End Tax Input Data Interface
interface YearEndTaxInput {
  grossIncome: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCareInsurance: number;
  employmentInsurance: number;
  personalPensionSavings: number;
  housingSavings: number;
  creditCardUsage: number;
  cashReceipts: number;
  traditionalMarketUsage: number;
  publicTransportationUsage: number;
  donation: number;
  medicalExpenses: number;
  educationExpenses: number;
  housingLoanInterest: number;
}

export default function YearendTaxPage() {
  const employee = getEmployeeById(loggedInEmployeeId);

  // Initial mock data for year-end tax input
  const [taxInput, setTaxInput] = useState<YearEndTaxInput>({
    grossIncome: 70000000,
    nationalPension: 2000000,
    healthInsurance: 1500000,
    longTermCareInsurance: 100000,
    employmentInsurance: 500000,
    personalPensionSavings: 1200000,
    housingSavings: 2400000,
    creditCardUsage: 15000000,
    cashReceipts: 5000000,
    traditionalMarketUsage: 1000000,
    publicTransportationUsage: 800000,
    donation: 500000,
    medicalExpenses: 2000000,
    educationExpenses: 1000000,
    housingLoanInterest: 3000000,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTaxInput(prev => ({ ...prev, [id]: Number(value) || 0 }));
  };

  const handleSelectChange = (id: keyof YearEndTaxInput, value: string) => {
    setTaxInput(prev => ({ ...prev, [id]: Number(value) || 0 }));
  };

  // Simplified tax calculation logic for demonstration
  const calculateTax = () => {
    const {
      grossIncome, nationalPension, healthInsurance, longTermCareInsurance, employmentInsurance,
      personalPensionSavings, housingSavings, creditCardUsage, cashReceipts,
      traditionalMarketUsage, publicTransportationUsage, donation,
      medicalExpenses, educationExpenses, housingLoanInterest
    } = taxInput;

    // --- 소득 공제 (예시) ---
    let incomeDeduction = nationalPension + healthInsurance + longTermCareInsurance + employmentInsurance; // 4대 보험
    incomeDeduction += personalPensionSavings; // 개인연금저축

    // 주택자금 공제 (주택청약저축, 주택임차차입금 원리금상환액, 장기주택저당차입금 이자상환액)
    incomeDeduction += housingSavings;
    incomeDeduction += housingLoanInterest;

    // 신용카드 등 사용액 소득공제 (초과분만 공제)
    const totalUsage = creditCardUsage + cashReceipts + traditionalMarketUsage + publicTransportationUsage;
    const minimumUsageThreshold = grossIncome * 0.25; // 총 급여의 25%
    if (totalUsage > minimumUsageThreshold) {
      incomeDeduction += (totalUsage - minimumUsageThreshold) * 0.15; // 공제율 15% (예시)
    }

    // --- 세액 공제 (예시) ---
    let taxCredit = 0;
    taxCredit += donation * 0.15; // 기부금 세액공제율 15% (예시)
    taxCredit += medicalExpenses * 0.15; // 의료비 세액공제율 15% (예시, 총급여의 3% 초과분)
    taxCredit += educationExpenses * 0.15; // 교육비 세액공제율 15% (예시)

    const taxableIncome = Math.max(0, grossIncome - incomeDeduction);
    const calculatedTax = taxableIncome * 0.06; // 과세표준 1,200만원 이하 6% (가장 낮은 세율 구간 예시)

    const finalTax = Math.max(0, calculatedTax - taxCredit);
    const actualTaxPaid = 3000000; // 기납부세액 (목업 데이터)
    const refundOrAdditionalTax = actualTaxPaid - finalTax;

    return {
      taxableIncome: Math.round(taxableIncome),
      calculatedTax: Math.round(calculatedTax),
      taxCredit: Math.round(taxCredit),
      finalTax: Math.round(finalTax),
      actualTaxPaid: actualTaxPaid,
      refundOrAdditionalTax: Math.round(refundOrAdditionalTax),
    };
  };

  const taxResults = calculateTax();

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
          <h1 className="text-2xl font-semibold mb-6">연말정산</h1>
          <p className="text-lg text-muted-foreground mb-8">
            <span className="font-semibold">{employee.name}</span>님, 연말정산 자료를 확인하고 예상 세액을 계산해 보세요.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Form Section */}
            <Card>
              <CardHeader>
                <CardTitle>연말정산 자료 입력</CardTitle>
                <CardDescription>귀하의 소득 및 공제 내역을 입력해 주세요.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="grossIncome">총 급여</Label>
                  <Input id="grossIncome" type="number" value={taxInput.grossIncome} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nationalPension">국민연금</Label>
                  <Input id="nationalPension" type="number" value={taxInput.nationalPension} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="healthInsurance">건강보험</Label>
                  <Input id="healthInsurance" type="number" value={taxInput.healthInsurance} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="employmentInsurance">고용보험</Label>
                  <Input id="employmentInsurance" type="number" value={taxInput.employmentInsurance} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="personalPensionSavings">개인연금저축</Label>
                  <Input id="personalPensionSavings" type="number" value={taxInput.personalPensionSavings} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="creditCardUsage">신용카드 사용액</Label>
                  <Input id="creditCardUsage" type="number" value={taxInput.creditCardUsage} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="donation">기부금</Label>
                  <Input id="donation" type="number" value={taxInput.donation} onChange={handleInputChange} />
                </div>
                {/* Add more input fields for other deductions */}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button onClick={() => alert("간소화 자료 불러오기 기능 개발 중...")} className="w-full">
                  간소화 자료 불러오기
                </Button>
              </CardFooter>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle>연말정산 결과</CardTitle>
                <CardDescription>입력된 자료를 바탕으로 계산된 예상 세액입니다.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">총 급여:</span>
                  <span>{taxInput.grossIncome.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">총 소득 공제액:</span>
                  <span>{(taxInput.nationalPension + taxInput.healthInsurance + taxInput.longTermCareInsurance + taxInput.employmentInsurance + taxInput.personalPensionSavings + taxInput.housingSavings + taxInput.housingLoanInterest + (taxInput.creditCardUsage + taxInput.cashReceipts + taxInput.traditionalMarketUsage + taxInput.publicTransportationUsage > taxInput.grossIncome * 0.25 ? (taxInput.creditCardUsage + taxInput.cashReceipts + taxInput.traditionalMarketUsage + taxInput.publicTransportationUsage - taxInput.grossIncome * 0.25) * 0.15 : 0)).toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">과세 표준:</span>
                  <span>{taxResults.taxableIncome.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">산출 세액:</span>
                  <span>{taxResults.calculatedTax.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">세액 공제:</span>
                  <span>{taxResults.taxCredit.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between font-bold text-lg">
                  <span>결정 세액:</span>
                  <span>{taxResults.finalTax.toLocaleString()}원</span>
                </div>
                <div className="border-t pt-2 mt-2" />
                <div className="flex items-center justify-between font-bold text-xl text-primary">
                  <span>환급(납부) 예상액:</span>
                  <span className={taxResults.refundOrAdditionalTax >= 0 ? "text-green-600" : "text-red-600"}>
                    {taxResults.refundOrAdditionalTax >= 0 ? "+" : "-"} {Math.abs(taxResults.refundOrAdditionalTax).toLocaleString()}원
                  </span>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button onClick={() => alert("연말정산 보고서 생성 기능 개발 중...")} className="w-full">
                  <IconDownload className="mr-2 h-4 w-4" /> 보고서 생성
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}