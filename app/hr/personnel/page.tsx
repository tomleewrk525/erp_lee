/**
 * @file personnel/page.tsx
 * @description 인사 관리 페이지를 담당하는 컴포넌트입니다.
 *              직원 정보 등록 및 조회, 부서 관리 기능을 제공합니다.
 *              shadcn/ui의 Tabs, Dialog, Table 컴포넌트와 tanstack/react-table 라이브러리를 활용합니다.
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
import { PlusCircle, MoreHorizontal, ChevronDown } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Employee, Department, mockEmployees, mockDepartments } from "@/lib/mock-employee-data"

/**
 * @component PersonnelPage
 * @description 인사 관리 기능을 제공하는 메인 페이지 컴포넌트입니다.
 *              '직원 관리'와 '부서 관리' 탭으로 구성되어 있으며,
 *              각 탭에서 관련 데이터를 조회, 등록, 수정할 수 있습니다.
 */
export default function PersonnelPage() {
  // 직원 목록 상태. 초기값은 lib/mock-employee-data.ts에서 가져옵니다.
  const [employees, setEmployees] = React.useState<Employee[]>(mockEmployees);
  // 부서 목록 상태. 초기값은 lib/mock-employee-data.ts에서 가져옵니다.
  const [departments, setDepartments] = React.useState<Department[]>(mockDepartments);
  // 새 부서 추가 시 사용될 입력 필드 상태.
  const [newDepartment, setNewDepartment] = React.useState("");

  // tanstack/react-table을 위한 상태 변수들.
  // 정렬 상태.
  const [sorting, setSorting] = React.useState<SortingState>([])
  // 컬럼 필터 상태.
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  // 컬럼 가시성 상태.
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  // 행 선택 상태.
  const [rowSelection, setRowSelection] = React.useState({})
  // 직원 추가 다이얼로그의 열림/닫힘 상태.
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = React.useState(false);

  // 부서 ID를 기반으로 부서 이름을 찾아 반환하는 헬퍼 함수입니다.
  const getDepartmentName = (departmentId: number) => {
    return departments.find(d => d.id === departmentId)?.name || 'N/A';
  }

  // tanstack/react-table의 컬럼 정의.
  // 각 객체는 테이블의 한 컬럼을 나타내며, 데이터 접근 키, 헤더 이름, 셀 렌더링 방식을 정의합니다.
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "이름",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "이메일",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "departmentId",
      header: "부서",
      cell: ({ row }) => <div>{getDepartmentName(row.getValue("departmentId"))}</div>,
    },
    {
      accessorKey: "position",
      header: "직책",
      cell: ({ row }) => <div>{row.getValue("position")}</div>,
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
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(String(employee.id))}
              >
                직원 ID 복사
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>정보 수정</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">직원 삭제</DropdownMenuItem>
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

  // 새 부서를 추가하는 함수입니다.
  // 입력된 부서명이 비어있지 않은 경우, 새로운 ID를 할당하여 부서 목록에 추가합니다.
  const handleAddDepartment = () => {
    if (newDepartment.trim() === "") return;
    const newId = departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1;
    setDepartments([...departments, { id: newId, name: newDepartment.trim() }]);
    setNewDepartment("");
  };
  
  // 신규 직원을 등록하는 함수입니다.
  // 폼 제출 이벤트를 처리하고, 폼 데이터를 기반으로 새로운 직원 객체를 생성하여 직원 목록에 추가합니다.
  // 등록 후 다이얼로그를 닫습니다.
  const handleAddEmployee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEmployee: Employee = {
      id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      departmentId: Number(formData.get("departmentId")),
      position: formData.get("position") as string,
      hireDate: new Date().toISOString().split('T')[0], // 임시로 현재 날짜로 설정
    };
    setEmployees([...employees, newEmployee]);
    setIsAddEmployeeDialogOpen(false);
  };


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
        <main className="flex flex-1 flex-col p-4 lg:p-6">
            <h1 className="text-2xl font-semibold mb-6">인사 관리</h1>
            {/* '직원 관리'와 '부서 관리' 두 가지 주요 기능을 탭으로 구분하여 제공합니다. */}
            <Tabs defaultValue="employees" className="w-full">
              {/* 탭 헤더 목록 */}
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="employees">직원 관리</TabsTrigger>
                <TabsTrigger value="departments">부서 관리</TabsTrigger>
              </TabsList>
              
              {/* 직원 관리 탭 컨텐츠 */}
              <TabsContent value="employees">
                <div className="w-full">
                  {/* 검색 입력 필드 및 직원 추가, 컬럼 표시 옵션 버튼 영역 */}
                  <div className="flex items-center justify-between py-4">
                    {/* 직원 이름으로 검색 필터 */}
                    <Input
                      placeholder="이름으로 검색..."
                      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                      onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                      }
                      className="max-w-sm"
                    />
                    <div className="flex items-center space-x-2">
                      {/* 테이블 컬럼 가시성을 토글하는 드롭다운 메뉴 */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="ml-auto">
                            컬럼 표시 <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                              return (
                                <DropdownMenuCheckboxItem
                                  key={column.id}
                                  className="capitalize"
                                  checked={column.getIsVisible()}
                                  onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                  }
                                >
                                  {column.id}
                                </DropdownMenuCheckboxItem>
                              )
                            })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {/* 신규 직원 등록을 위한 다이얼로그 트리거 버튼 */}
                      <Dialog open={isAddEmployeeDialogOpen} onOpenChange={setIsAddEmployeeDialogOpen}>
                        <DialogTrigger asChild>
                          <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> 직원 추가
                          </Button>
                        </DialogTrigger>
                        {/* 신규 직원 등록 다이얼로그 컨텐츠 */}
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>신규 직원 등록</DialogTitle>
                            <DialogDescription>
                              새로운 직원의 정보를 입력해주세요.
                            </DialogDescription>
                          </DialogHeader>
                          {/* 직원 등록 폼 */}
                          <form onSubmit={handleAddEmployee}>
                            <div className="grid gap-4 py-4">
                              {/* 이름 입력 필드 */}
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">이름</Label>
                                <Input id="name" name="name" className="col-span-3" required />
                              </div>
                              {/* 이메일 입력 필드 */}
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">이메일</Label>
                                <Input id="email" name="email" type="email" className="col-span-3" required />
                              </div>
                              {/* 연락처 입력 필드 */}
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">연락처</Label>
                                <Input id="phone" name="phone" className="col-span-3" />
                              </div>
                              {/* 부서 선택 필드 */}
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="departmentId" className="text-right">부서</Label>
                                <Select name="departmentId">
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="부서를 선택하세요" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map(d => (
                                            <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                              </div>
                              {/* 직책 입력 필드 */}
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="position" className="text-right">직책</Label>
                                <Input id="position" name="position" className="col-span-3" required />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">저장하기</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  {/* 직원 목록을 표시하는 데이터 테이블 */}
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
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      이전
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      다음
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* 부서 관리 탭 컨텐츠 */}
              <TabsContent value="departments">
                <div className="w-full max-w-md mx-auto mt-8">
                    <h3 className="text-lg font-semibold mb-4">부서 목록</h3>
                    {/* 새 부서 추가 입력 필드 및 버튼 */}
                    <div className="flex items-center space-x-2 mb-4">
                        <Input 
                            placeholder="새 부서명..."
                            value={newDepartment}
                            onChange={(e) => setNewDepartment(e.target.value)}
                        />
                        <Button onClick={handleAddDepartment}>부서 추가</Button>
                    </div>
                    {/* 부서 목록 테이블 */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>부서명</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {departments.map(dep => (
                                    <TableRow key={dep.id}>
                                        <TableCell>{dep.id}</TableCell>
                                        <TableCell>{dep.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
              </TabsContent>
            </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
