/**
 * @file textarea.tsx
 * @description shadcn/ui의 Textarea 컴포넌트 구현.
 *              사용자로부터 여러 줄의 텍스트 입력을 받을 수 있는 확장 가능한 텍스트 영역 필드를 제공합니다.
 *              Tailwind CSS 유틸리티 클래스를 사용하여 스타일링됩니다.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * @interface TextareaProps
 * @extends React.TextareaHTMLAttributes<HTMLTextAreaElement>
 * @description Textarea 컴포넌트가 받을 수 있는 속성들을 정의합니다.
 *              표준 HTML <textarea> 요소의 모든 속성을 상속받습니다.
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * @component Textarea
 * @description 사용자 정의 텍스트 영역 컴포넌트입니다.
 *              `React.forwardRef`를 사용하여 부모 컴포넌트로부터 ref를 전달받아 내부 `<textarea>` 요소에 적용할 수 있습니다.
 * @param {string} className - 사용자 정의 Tailwind CSS 클래스를 위한 속성.
 * @param {React.Ref<HTMLTextAreaElement>} ref - `<textarea>` 요소에 직접 접근하기 위한 ref.
 * @param {object} props - 표준 HTML `<textarea>` 요소의 나머지 모든 속성.
 * @returns {JSX.Element} 렌더링된 Textarea 컴포넌트.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
