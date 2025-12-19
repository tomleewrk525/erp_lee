"use client"

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation"; // useSearchParams 임포트
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BusinessPartner {
  id: number;
  name: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  type: "Customer" | "Vendor";
}

export default function PartnersPage() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as "Customer" | "Vendor") || "Customer";

  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [type, setType] = useState<"Customer" | "Vendor">(initialType); // 초기 타입 설정
  const [partners, setPartners] = useState<BusinessPartner[]>([
    // 초기 모의 데이터 추가 (테스트용)
    { id: 1, name: "청소용품 상사", contactPerson: "김영희", contactEmail: "kim@cleaning.com", contactPhone: "010-1111-2222", type: "Customer" },
    { id: 2, name: "클린 솔루션", contactPerson: "박철수", contactEmail: "park@cleansol.com", contactPhone: "010-3333-4444", type: "Customer" },
    { id: 3, name: "케미컬 원료 공급", contactPerson: "이지은", contactEmail: "lee@chem.com", contactPhone: "010-5555-6666", type: "Vendor" },
    { id: 4, name: "물류 파트너사", contactPerson: "최민준", contactEmail: "choi@logistics.com", contactPhone: "010-7777-8888", type: "Vendor" },
  ]);

  // URL 쿼리 파라미터 변경 시 타입 상태 업데이트
  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactPerson || !contactEmail || !contactPhone) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    const newPartner: BusinessPartner = {
      id: partners.length + 1,
      name,
      contactPerson,
      contactEmail,
      contactPhone,
      type,
    };

    setPartners([...partners, newPartner]);
    setName("");
    setContactPerson("");
    setContactEmail("");
    setContactPhone("");
  };

  const filteredPartners = useMemo(() => {
    return partners.filter(partner => partner.type === type);
  }, [partners, type]);

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
          <h1 className="text-2xl font-semibold mb-6">
            {type === "Customer" ? "판매 거래처 관리" : "구매 거래처 관리"}
          </h1>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{type === "Customer" ? "새 판매 거래처 추가" : "새 구매 거래처 추가"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">거래처명</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">담당자</Label>
                    <Input
                      id="contactPerson"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">이메일</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">연락처</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>거래처 유형</Label>
                    <RadioGroup
                      value={type}
                      onValueChange={(value: "Customer" | "Vendor") => setType(value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Customer" id="type-customer" />
                        <Label htmlFor="type-customer">판매 거래처</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Vendor" id="type-vendor" />
                        <Label htmlFor="type-vendor">구매 거래처</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button type="submit">
                    {type === "Customer" ? "판매 거래처 추가" : "구매 거래처 추가"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{type === "Customer" ? "판매 거래처 목록" : "구매 거래처 목록"}</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredPartners.length === 0 ? (
                  <p>등록된 {type === "Customer" ? "판매" : "구매"} 거래처가 없습니다.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>거래처명</TableHead>
                        <TableHead>담당자</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>연락처</TableHead>
                        <TableHead>유형</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPartners.map((partner) => (
                        <TableRow key={partner.id}>
                          <TableCell>{partner.id}</TableCell>
                          <TableCell>{partner.name}</TableCell>
                          <TableCell>{partner.contactPerson}</TableCell>
                          <TableCell>{partner.contactEmail}</TableCell>
                          <TableCell>{partner.contactPhone}</TableCell>
                          <TableCell>{partner.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
