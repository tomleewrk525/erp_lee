# erp-system/components/ui/breadcrumb.tsx

## 컴포넌트 개요

`shadcn/ui`의 Breadcrumb 컴포넌트는 사용자의 현재 페이지 위치를 계층적으로 표시하여 내비게이션 경로를 시각적으로 보여줍니다. 웹 애플리케이션에서 사용자가 쉽게 현재 위치를 파악하고 이전 단계로 돌아갈 수 있도록 돕습니다.

## 사용법

일반적으로 `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator` 및 `BreadcrumbPage`와 같은 하위 컴포넌트들과 함께 사용됩니다.

## 예시

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function PageBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```