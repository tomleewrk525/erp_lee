# erp-system/components/ui/separator.tsx

## 컴포넌트 개요

`shadcn/ui`의 Separator 컴포넌트는 콘텐츠 그룹을 시각적으로 분리하는 데 사용됩니다. 가로 또는 세로 방향으로 구분선을 표시하여 UI의 가독성을 높입니다.

## 사용법

`orientation` prop을 사용하여 가로(`horizontal`, 기본값) 또는 세로(`vertical`) 방향을 지정할 수 있습니다.

## 예시

```tsx
import { Separator } from "@/components/ui/separator"

function UserProfileSection() {
  return (
    <div>
      <h3>개인 정보</h3>
      <Separator className="my-2" />
      <p>이름: 홍길동</p>
      <p>이메일: hong.gildong@example.com</p>

      <h3 className="mt-4">주소 정보</h3>
      <Separator className="my-2" />
      <p>주소: 서울시 강남구</p>
      <p>우편번호: 12345</p>
    </div>
  )
}
```