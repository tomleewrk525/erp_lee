/**
 * @file attendance/page.tsx
 * @description 근태 관리 페이지를 담당하는 컴포넌트입니다.
 *              직원들의 출퇴근 기록 조회 및 휴가 신청/승인 기능을 제공합니다.
 *              shadcn/ui의 Tabs, Table, Dialog 컴포넌트와 tanstack/react-table 라이브러리를 활용합니다.
 */

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
import { MoreHorizontal, ChevronDown, PlusCircle } from "lucide-react"

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
  DropdownMenuCheckboxItem,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Employee, mockEmployees } from "@/lib/mock-employee-data"
import { 
  AttendanceRecord, 
  LeaveRequest,
  mockAttendanceRecords,
  mockLeaveRequests,
  AttendanceStatus,
  LeaveStatus,
  LeaveType,
} from "@/lib/mock-attendance-data"
import { useLanguage, Language } from '../../../contexts/language-context'; // Import useLanguage and Language type
import { getTranslation } from '../../../lib/i18n'; // Import getTranslation

/**
 * @function getEmployeeName
 * @description 직원 ID를 기반으로 직원 이름을 조회하는 헬퍼 함수.
 * @param {number} employeeId - 조회할 직원의 ID.
 * @returns {string} 직원의 이름 또는 'N/A' (찾을 수 없는 경우).
 */
const getEmployeeName = (employeeId: number, language: Language) => {
    return mockEmployees.find(e => e.id === employeeId)?.name || getTranslation(language, 'common_na');
};

/**
 * @component AttendanceTable
 * @description 출퇴근 기록을 표시하고 관리하는 데이터 테이블 컴포넌트입니다.
 * @param {object} props
 * @param {AttendanceRecord[]} props.data - 표시할 출퇴근 기록 데이터 배열.
 */
const AttendanceTable = ({ data }: { data: AttendanceRecord[] }) => {
  const { language } = useLanguage(); // Initialize language for AttendanceTable
  // 테이블의 정렬 상태 관리.
  const [sorting, setSorting] = React.useState<SortingState>([])
  // 테이블의 컬럼 필터 상태 관리.
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  // tanstack/react-table을 위한 컬럼 정의.
  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      accessorKey: "date",
      header: "날짜",
    },
    {
      accessorKey: "employeeId",
      header: "직원",
      cell: ({ row }) => getEmployeeName(row.getValue("employeeId")),
    },
    {
      accessorKey: "clockIn",
      header: "출근 시간",
    },
    {
      accessorKey: "clockOut",
      header: "퇴근 시간",
    },
    {
      accessorKey: "status",
      header: "상태",
      cell: ({ row }) => {
        const status = row.getValue("status") as AttendanceStatus;
        // 근무 상태에 따라 뱃지(Badge) 스타일을 다르게 적용합니다.
        const variant = {
            "정상": "default",
            "지각": "destructive",
            "조퇴": "secondary",
            "결근": "outline",
        }[status] || "default"
        return <Badge variant={variant as any}>{status}</Badge>
      }
    },
  ];

  // useReactTable 훅을 사용하여 테이블 인스턴스를 생성합니다.
  // 데이터, 컬럼 정의, 정렬, 필터링, 페이지네이션 등의 기능을 관리합니다.
  const table = useReactTable({
    data,
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
  });

  return (
    <div className="w-full">
        {/* 직원 이름으로 검색 필터 */}
        <div className="flex items-center justify-between py-4">
            <Input
              placeholder="직원 이름으로 검색..."
              value={(table.getColumn("employeeId")?.getFilterValue() as string) ?? ""}
              onChange={(event) => {
                // 입력된 이름으로 직원 ID를 찾아 필터링합니다.
                const employee = mockEmployees.find(e => e.name.toLowerCase().includes(event.target.value.toLowerCase()));
                table.getColumn("employeeId")?.setFilterValue(employee ? employee.id : "undefined");
              }}
              className="max-w-sm"
            />
        </div>
      {/* 출퇴근 기록 데이터 테이블 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* 페이지네이션 컨트롤 */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
            variant="outline" size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        >이전</Button>
        <Button
            variant="outline" size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        >다음</Button>
      </div>
    </div>
  );
};

/**
 * @component LeaveApprovalTable
 * @description 휴가 신청 목록을 표시하고 관리자(또는 특정 권한 사용자)가 승인/반려할 수 있는 데이터 테이블 컴포넌트입니다.
 * @param {object} props
 * @param {LeaveRequest[]} props.data - 표시할 휴가 신청 데이터 배열.
 * @param {(id: number, status: LeaveStatus) => void} props.onStatusChange - 휴가 신청 상태 변경 시 호출될 콜백 함수.
 */
const LeaveApprovalTable = ({ data, onStatusChange }: { data: LeaveRequest[], onStatusChange: (id: number, status: LeaveStatus) => void }) => {
    
    // tanstack/react-table을 위한 컬럼 정의.
    const columns: ColumnDef<LeaveRequest>[] = [
      { accessorKey: "employeeId", header: "직원", cell: ({ row }) => getEmployeeName(row.getValue("employeeId")) },
      { accessorKey: "leaveType", header: "휴가 종류" },
      { accessorKey: "startDate", header: "시작일" },
      { accessorKey: "endDate", header: "종료일" },
      { accessorKey: "reason", header: "사유" },
      { accessorKey: "status", header: "상태",
        cell: ({ row }) => {
            const status = row.getValue("status") as LeaveStatus;
            // 휴가 상태에 따라 뱃지(Badge) 스타일을 다르게 적용합니다.
            const variant = {
                "대기": "secondary",
                "승인": "default",
                "반려": "destructive",
            }[status] || "default";
            return <Badge variant={variant as any}>{status}</Badge>;
        }
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const request = row.original;
          // '대기' 상태의 휴가 신청에 대해서만 승인/반려 버튼을 표시합니다.
          if (request.status !== '대기') return null;
          return (
            <div className="space-x-2">
              <Button size="sm" onClick={() => onStatusChange(request.id, '승인')}>승인</Button>
              <Button size="sm" variant="destructive" onClick={() => onStatusChange(request.id, '반려')}>반려</Button>
            </div>
          )
        },
      },
    ];
  
    // useReactTable 훅을 사용하여 테이블 인스턴스를 생성합니다.
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  
    return (
        <div className="rounded-md border mt-6">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                            ))}
                        </TableRow>
                    )) : (
                        <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">결과가 없습니다.</TableCell></TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

/**
 * @component AttendancePage
 * @description 근태 관리 기능을 제공하는 메인 페이지 컴포넌트입니다.
 *              '출퇴근 기록' 탭과 '휴가 관리' 탭으로 구성되어 있으며,
 *              출퇴근 기록 조회, 휴가 신청 및 승인 기능을 담당합니다.
 */
export default function AttendancePage() {
  // 출퇴근 기록 목록 상태. 초기값은 lib/mock-attendance-data.ts에서 가져옵니다.
  const [attendanceRecords, setAttendanceRecords] = React.useState(mockAttendanceRecords);
  // 휴가 신청 기록 목록 상태. 초기값은 lib/mock-attendance-data.ts에서 가져옵니다.
  const [leaveRequests, setLeaveRequests] = React.useState(mockLeaveRequests);
  
  /**
   * @function handleLeaveApply
   * @description 휴가 신청 폼 제출을 처리하는 함수입니다.
   *              폼 데이터를 기반으로 새로운 휴가 신청 객체를 생성하여 휴가 신청 목록에 추가합니다.
   *              직원 ID는 예시를 위해 1로 가정합니다.
   */
  const handleLeaveApply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // For simplicity, assuming employeeId 1 is applying
    const newRequest: LeaveRequest = {
      id: leaveRequests.length > 0 ? Math.max(...leaveRequests.map(e => e.id)) + 1 : 1,
      employeeId: 1, 
      leaveType: formData.get("leaveType") as LeaveType,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      reason: formData.get("reason") as string,
      status: "대기",
    };
    setLeaveRequests(prev => [newRequest, ...prev]);
    alert("휴가 신청이 완료되었습니다.");
    (event.target as HTMLFormElement).reset();
  };

  /**
   * @function handleLeaveStatusChange
   * @description 휴가 신청의 상태(승인/반려)를 변경하는 함수입니다.
   * @param {number} id - 상태를 변경할 휴가 신청의 ID.
   * @param {LeaveStatus} status - 변경할 새로운 휴가 상태('승인' 또는 '반려').
   */
  const handleLeaveStatusChange = (id: number, status: LeaveStatus) => {
    setLeaveRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
  };


  return (
    <SidebarProvider
      style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)" } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col p-4 lg:p-6">
            <h1 className="text-2xl font-semibold mb-6">근태 관리</h1>
            {/* '출퇴근 기록'과 '휴가 관리' 두 가지 주요 기능을 탭으로 구분하여 제공합니다. */}
            <Tabs defaultValue="attendance" className="w-full">
                {/* 탭 헤더 목록 */}
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="attendance">출퇴근 기록</TabsTrigger>
                    <TabsTrigger value="leave">휴가 관리</TabsTrigger>
                </TabsList>
                
                {/* 출퇴근 기록 탭 컨텐츠 */}
                <TabsContent value="attendance">
                    <AttendanceTable data={attendanceRecords} />
                </TabsContent>

                {/* 휴가 관리 탭 컨텐츠 */}
                <TabsContent value="leave">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">휴가 신청하기</h3>
                            {/* 휴가 신청 폼 */}
                            <form onSubmit={handleLeaveApply} className="space-y-4 p-4 border rounded-md">
                                <div className="space-y-2">
                                    <Label htmlFor="leaveType">휴가 종류</Label>
                                    <Select name="leaveType" required>
                                        <SelectTrigger><SelectValue placeholder="휴가 종류를 선택하세요" /></SelectTrigger>
                                        <SelectContent>
                                            {(["연차", "병가", "경조사", "오전반차", "오후반차"] as LeaveType[]).map(type => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="startDate">시작일</Label>
                                        <Input id="startDate" name="startDate" type="date" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="endDate">종료일</Label>
                                        <Input id="endDate" name="endDate" type="date" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reason">휴가 사유</Label>
                                    <Textarea id="reason" name="reason" placeholder="휴가 사유를 입력하세요." required />
                                </div>
                                <Button type="submit" className="w-full">신청하기</Button>
                            </form>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">휴가 신청 현황 및 승인</h3>
                            {/* 휴가 승인/반려 테이블 */}
                            <LeaveApprovalTable data={leaveRequests} onStatusChange={handleLeaveStatusChange} />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}