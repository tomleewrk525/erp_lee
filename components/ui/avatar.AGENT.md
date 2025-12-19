# erp-system/components/ui/avatar.tsx

## 컴포넌트 개요

`shadcn/ui`의 Avatar 컴포넌트는 사용자 프로필 사진, 로고 또는 이니셜과 같은 원형 이미지를 표시하는 데 사용됩니다. 시각적으로 사용자를 식별하는 데 유용합니다.

## 사용법

`Avatar` 컴포넌트는 `AvatarImage`와 `AvatarFallback`을 자식으로 가집니다. 이미지가 로드되지 않을 경우 폴백(fallback)으로 이니셜 등을 표시할 수 있습니다.

## 예시

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function UserAvatar({ src, alt, fallbackText }) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  )
}
```