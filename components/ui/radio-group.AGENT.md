# erp-system/components/ui/radio-group.tsx

## 컴포넌트 개요

`shadcn/ui`의 RadioGroup 컴포넌트는 사용자가 여러 옵션 중 하나만 선택할 수 있도록 하는 폼 컨트롤입니다. 관련된 라디오 버튼들을 그룹화하여 상호 배타적인 선택을 제공합니다.

## 사용법

`RadioGroup`은 `defaultValue`, `value`, `onValueChange` prop을 통해 상태를 제어하며, `RadioGroupItem`을 자식으로 포함합니다. 각 `RadioGroupItem`은 고유한 `value`와 `id`를 가집니다.

## 예시

```tsx
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function ShippingMethodSelector() {
  return (
    <RadioGroup defaultValue="standard">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="standard" id="r1" />
        <Label htmlFor="r1">표준 배송</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="express" id="r2" />
        <Label htmlFor="r2">특급 배송</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="pickup" id="r3" />
        <Label htmlFor="r3">매장 픽업</Label>
      </div>
    </RadioGroup>
  )
}
```