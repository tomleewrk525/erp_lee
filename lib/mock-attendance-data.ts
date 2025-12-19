/**
 * @file mock-attendance-data.ts
 * @description 근태 관리 페이지에서 사용되는 출퇴근 기록 및 휴가 신청의 목업(Mock-up) 데이터를 정의합니다.
 *              백엔드 API가 없는 환경에서 프론트엔드 개발을 위해 사용됩니다.
 */

/**
 * @typedef {'정상' | '지각' | '조퇴' | '결근'} AttendanceStatus
 * @description 출퇴근 기록의 상태를 나타내는 타입.
 */
export type AttendanceStatus = "정상" | "지각" | "조퇴" | "결근";

/**
 * @typedef {'연차' | '병가' | '경조사' | '오전반차' | '오후반차'} LeaveType
 * @description 휴가 신청의 종류를 나타내는 타입.
 */
export type LeaveType = "연차" | "병가" | "경조사" | "오전반차" | "오후반차";

/**
 * @typedef {'대기' | '승인' | '반려'} LeaveStatus
 * @description 휴가 신청의 처리 상태를 나타내는 타입.
 */
export type LeaveStatus = "대기" | "승인" | "반려";

/**
 * @interface AttendanceRecord
 * @description 단일 출퇴근 기록을 나타내는 인터페이스.
 * @property {number} id - 기록의 고유 ID.
 * @property {number} employeeId - 직원의 ID.
 * @property {string} date - 기록 날짜 (YYYY-MM-DD 형식).
 * @property {string | null} clockIn - 출근 시간 (HH:MM 형식) 또는 null.
 * @property {string | null} clockOut - 퇴근 시간 (HH:MM 형식) 또는 null.
 * @property {AttendanceStatus} status - 근무 상태.
 */
export interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: AttendanceStatus;
}

/**
 * @interface LeaveRequest
 * @description 단일 휴가 신청을 나타내는 인터페이스.
 * @property {number} id - 신청의 고유 ID.
 * @property {number} employeeId - 직원의 ID.
 * @property {LeaveType} leaveType - 휴가 종류.
 * @property {string} startDate - 휴가 시작일 (YYYY-MM-DD 형식).
 * @property {string} endDate - 휴가 종료일 (YYYY-MM-DD 형식).
 * @property {string} reason - 휴가 사유.
 * @property {LeaveStatus} status - 휴가 신청의 처리 상태.
 */
export interface LeaveRequest {
  id: number;
  employeeId: number;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
}

/**
 * @const mockAttendanceRecords
 * @description 테스트 및 개발용 출퇴근 기록 목업 데이터 배열.
 */
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    employeeId: 1,
    date: "2024-07-29",
    clockIn: "08:50",
    clockOut: "18:05",
    status: "정상",
  },
  {
    id: 2,
    employeeId: 2,
    date: "2024-07-29",
    clockIn: "09:15",
    clockOut: "18:10",
    status: "지각",
  },
  {
    id: 3,
    employeeId: 3,
    date: "2024-07-29",
    clockIn: "08:58",
    clockOut: "16:30",
    status: "조퇴",
  },
  {
    id: 4,
    employeeId: 4,
    date: "2024-07-29",
    clockIn: null,
    clockOut: null,
    status: "결근",
  },
  {
    id: 5,
    employeeId: 5,
    date: "2024-07-29",
    clockIn: "09:00",
    clockOut: "18:00",
    status: "정상",
  },
];

/**
 * @const mockLeaveRequests
 * @description 테스트 및 개발용 휴가 신청 목업 데이터 배열.
 */
export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employeeId: 3,
    leaveType: "연차",
    startDate: "2024-08-05",
    endDate: "2024-08-05",
    reason: "개인 사유",
    status: "대기",
  },
  {
    id: 2,
    employeeId: 1,
    leaveType: "병가",
    startDate: "2024-07-30",
    endDate: "2024-07-31",
    reason: "감기",
    status: "승인",
  },
  {
    id: 3,
    employeeId: 5,
    leaveType: "오전반차",
    startDate: "2024-08-01",
    endDate: "2024-08-01",
    reason: "은행 방문",
    status: "반려",
  },
    {
    id: 4,
    employeeId: 2,
    leaveType: "경조사",
    startDate: "2024-08-12",
    endDate: "2024-08-14",
    reason: "가족 행사",
    status: "대기",
  },
];
