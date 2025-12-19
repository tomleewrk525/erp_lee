/**
 * @file mock-employee-data.ts
 * @description 인사 관리 및 퇴직금 관리 페이지에서 사용되는 직원 및 부서의 목업(Mock-up) 데이터를 정의합니다.
 *              백엔드 API가 없는 환경에서 프론트엔드 개발을 위해 사용됩니다.
 */

/**
 * @interface Department
 * @description 부서 정보를 나타내는 인터페이스.
 * @property {number} id - 부서의 고유 ID.
 * @property {string} name - 부서명.
 */
export interface Department {
  id: number;
  name: string;
}

/**
 * @interface Employee
 * @description 직원 정보를 나타내는 인터페이스.
 * @property {number} id - 직원의 고유 ID.
 * @property {string} name - 직원의 이름.
 * @property {string} email - 직원의 이메일 주소.
 * @property {string} phone - 직원의 전화번호.
 * @property {number} departmentId - 직원이 소속된 부서의 ID.
 * @property {string} position - 직원의 직책.
 * @property {string} hireDate - 직원의 입사일 (YYYY-MM-DD 형식).
 */
export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  departmentId: number;
  position: string;
  hireDate: string;
}

/**
 * @const mockDepartments
 * @description 테스트 및 개발용 부서 목업 데이터 배열.
 */
export const mockDepartments: Department[] = [
  { id: 1, name: "경영지원" },
  { id: 2, name: "영업" },
  { id: 3, name: "개발" },
  { id: 4, name: "마케팅" },
  { id: 5, name: "생산" },
];

/**
 * @const mockEmployees
 * @description 테스트 및 개발용 직원 목업 데이터 배열.
 *              각 직원은 고유 ID, 이름, 연락처, 부서, 직책, 입사일 정보를 포함합니다.
 */
export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "홍길동",
    email: "gildong.hong@example.com",
    phone: "010-1234-5678",
    departmentId: 2,
    position: "팀장",
    hireDate: "2022-03-01",
  },
  {
    id: 2,
    name: "이순신",
    email: "sunshin.lee@example.com",
    phone: "010-9876-5432",
    departmentId: 1,
    position: "부장",
    hireDate: "2020-07-15",
  },
  {
    id: 3,
    name: "유관순",
    email: "gwansun.yu@example.com",
    phone: "010-1111-2222",
    departmentId: 3,
    position: "대리",
    hireDate: "2023-01-10",
  },
    {
    id: 4,
    name: "세종대왕",
    email: "sejong@example.com",
    phone: "010-3333-4444",
    departmentId: 1,
    position: "대표",
    hireDate: "2018-05-20",
  },
  {
    id: 5,
    name: "신사임당",
    email: "saimdang.shin@example.com",
    phone: "010-5555-6666",
    departmentId: 4,
    position: "과장",
    hireDate: "2021-11-01",
  },
];
