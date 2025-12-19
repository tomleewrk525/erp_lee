# erp-system/components/ui/card.tsx

## 컴포넌트 개요

`shadcn/ui`의 Card 컴포넌트는 정보를 명확하고 깔끔하게 그룹화하여 표시하는 데 사용되는 유연한 콘텐츠 컨테이너입니다. 대시보드, 목록 항목, 양식 등 다양한 UI 요소에 활용될 수 있습니다.

## 사용법

`Card`는 `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`와 같은 하위 컴포넌트들과 함께 사용하여 구조화된 콘텐츠를 제공합니다.

## 예시

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function UserProfileCard({ user }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>전화: {user.phone}</p>
        <p>주소: {user.address}</p>
      </CardContent>
      <CardFooter>
        <Button>프로필 수정</Button>
      </CardFooter>
    </Card>
  )
}
```