# erp-system/components/ui/tabs.tsx

## 컴포넌트 개요

`shadcn/ui`의 Tabs 컴포넌트는 여러 섹션의 콘텐츠를 단일 영역에 표시하면서 탭을 통해 전환할 수 있도록 합니다. 복잡한 정보를 깔끔하게 정리하고 사용자에게 필요한 콘텐츠에 쉽게 접근할 수 있도록 돕습니다.

## 사용법

`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`와 같은 하위 컴포넌트들을 사용하여 구현됩니다. `defaultValue` 또는 `value` prop으로 활성화된 탭을 제어하며, 각 `TabsTrigger`는 고유한 `value`를 가집니다.

## 예시

```tsx
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

function UserSettingsTabs() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="password">비밀번호</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        계정 설정을 변경할 수 있습니다.
      </TabsContent>
      <TabsContent value="password">
        비밀번호를 변경할 수 있습니다.
      </TabsContent>
    </Tabs>
  )
}
```