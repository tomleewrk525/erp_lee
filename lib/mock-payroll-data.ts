/**
 * @file mock-payroll-data.ts
 * @description 급여 관리 페이지에서 사용되는 급여 기록의 목업(Mock-up) 데이터를 정의합니다.
 *              백엔드 API가 없는 환경에서 프론트엔드 개발을 위해 사용됩니다.
 */

/**
 * @typedef {'완료' | '처리중'} PayrollStatus
 * @description 급여 지급 기록의 상태를 나타내는 타입.
 */
export type PayrollStatus = "완료" | "처리중";

/**
 * @interface PayrollRecord
 * @description 단일 급여 지급 기록을 나타내는 인터페이스.
 * @property {number} id - 기록의 고유 ID.
 * @property {number} employeeId - 직원의 ID.
 * @property {string} paymentDate - 급여 지급일 (YYYY-MM-DD 형식).
 * @property {string} period - 급여 귀속 월 (YYYY-MM 형식).
 * @property {number} baseSalary - 기본급.
 * @property {number} bonus - 상여금.
 * @property {number} totalEarnings - 총 지급액 (기본급 + 상여금).
 * @property {number} incomeTax - 소득세.
 * @property {number} insurance - 보험료.
 * @property {number} totalDeductions - 총 공제액 (소득세 + 보험료).
 * @property {number} netPay - 실지급액 (총 지급액 - 총 공제액).
 * @property {PayrollStatus} status - 급여 처리 상태.
 */
export interface PayrollRecord {
  id: number;
  employeeId: number;
  paymentDate: string;
  period: string; // e.g., "2024-07"
  baseSalary: number;
  bonus: number;
  totalEarnings: number;
  incomeTax: number;
  insurance: number;
  totalDeductions: number;
  netPay: number;
  status: PayrollStatus;
}

/**
 * @const mockPayrollRecords
 * @description 테스트 및 개발용 급여 기록 목업 데이터 배열.
 */
export const mockPayrollRecords: PayrollRecord[] = [
  {
    id: 1,
    employeeId: 1,
    paymentDate: "2024-07-25",
    period: "2024-07",
    baseSalary: 4000000,
    bonus: 500000,
    totalEarnings: 4500000,
    incomeTax: 450000,
    insurance: 150000,
    totalDeductions: 600000,
    netPay: 3900000,
    status: "완료",
  },
  {
    id: 2,
    employeeId: 2,
    paymentDate: "2024-07-25",
    period: "2024-07",
    baseSalary: 5000000,
    bonus: 0,
    totalEarnings: 5000000,
    incomeTax: 550000,
    insurance: 200000,
    totalDeductions: 750000,
    netPay: 4250000,
    status: "완료",
  },
  {
    id: 3,
    employeeId: 3,
    paymentDate: "2024-07-25",
    period: "2024-07",
    baseSalary: 3000000,
    bonus: 0,
    totalEarnings: 3000000,
    incomeTax: 280000,
    insurance: 120000,
    totalDeductions: 400000,
    netPay: 2600000,
    status: "완료",
  },
  {
    id: 4,
    employeeId: 4,
    paymentDate: "2024-07-25",
    period: "2024-07",
    baseSalary: 8000000,
    bonus: 1000000,
    totalEarnings: 9000000,
    incomeTax: 1200000,
    insurance: 350000,
    totalDeductions: 1550000,
    netPay: 7450000,
    status: "완료",
  },
  {
    id: 5,
    employeeId: 5,
    paymentDate: "2024-07-25",
    period: "2024-07",
    baseSalary: 3500000,
    bonus: 200000,
    totalEarnings: 3700000,
    incomeTax: 350000,
    insurance: 140000,
    totalDeductions: 490000,
    netPay: 3210000,
    status: "완료",
  },
];
