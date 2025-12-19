# erp-system/components/ui/command.tsx

## 컴포넌트 개요

`shadcn/ui`의 Command 컴포넌트는 키보드 기반의 명령 팔레트(Command Palette)를 구현하는 데 사용됩니다. 사용자가 애플리케이션 내에서 빠르게 검색하고 명령을 실행할 수 있도록 돕습니다. `cmdk` 라이브러리를 기반으로 합니다.

## 사용법

주로 검색 가능한 목록이나 명령을 표시하는 데 사용됩니다. `Command`, `CommandInput`, `CommandList`, `CommandItem`, `CommandSeparator` 등의 하위 컴포넌트와 함께 사용됩니다.

## 예시

```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

function GlobalSearch() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
```