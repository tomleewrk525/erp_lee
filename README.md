# 웹 ERP 시스템 (Web ERP System)

## 1. 프로젝트 개요
이 프로젝트는 Next.js와 TypeScript 기반의 웹 ERP 시스템으로, 인사, 재고, 구매, 영업 등 다양한 비즈니스 프로세스 관리 기능을 제공합니다. UI는 shadcn/ui 스타일의 컴포넌트, TanStack Table 등을 활용하며, 역할 기반의 모듈화된 폴더 구조를 가집니다.

## 2. 주요 기능
- **인사 관리(HR)**: 인사 정보, 근태, 급여, 퇴직금 관리
- **회계/경리**: 매입매출, 전자세금계산서, 경영자 보고서 등 17개 기능
- **그룹웨어**: 전자결재, 클라우드 스토리지, 업무 공유 등 9개 기능
- **구매 관리**: 구매 계획, 발주, 입고 관리
- **재고 유통**: 품목, 재고, 주문, 창고 관리
- **영업 관리**: 파트너, 영업 기회, 견적/주문 관리

## 3. 기술 스택
- **Framework**: Next.js
- **Language**: TypeScript
- **UI**: shadcn/ui, Tailwind CSS, TanStack Table
- **Package Manager**: pnpm

## 4. 시작하기 (Getting Started)

개발 서버를 실행하려면 아래 명령어를 입력하세요:

```bash
pnpm install
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 주소로 접속하여 결과를 확인하세요.

## 5. 테스트 (Testing)
- 워크스페이스의 특정 패키지에 대한 모든 테스트를 실행합니다:
  ```bash
  pnpm turbo run test --filter <project_name>
  ```
- 특정 테스트에만 집중하려면 Vitest 패턴을 사용합니다:
  ```bash
  pnpm vitest run -t "<test_name>"
  ```
- 파일을 이동하거나 임포트를 변경한 후에는 린트 검사를 실행하여 규칙을 준수하는지 확인하세요:
  ```bash
  pnpm lint --filter <project_name>
  ```

## 6. 개발 환경 팁

- **`pnpm dlx turbo run where <project_name>`**: `ls`로 스캔하는 대신 패키지 디렉토리로 바로 이동합니다.
  - **이유**: 복잡한 모노레포 구조에서 특정 패키지의 실제 폴더 위치를 빠르게 찾을 수 있습니다. `cd` 명령어와 함께 사용하여 원하는 패키지로 즉시 이동하는 데 유용합니다.

- **`pnpm install --filter <project_name>`**: 패키지를 워크스페이스에 추가하여 Vite, ESLint, TypeScript가 인식하도록 합니다.
  - **이유**: 모노레포 내의 모든 패키지가 아닌, 지정된 단일 패키지에만 의존성을 설치할 때 사용합니다. 이를 통해 설치 시간을 단축하고 특정 패키지의 의존성만 관리할 수 있어, IDE나 린터가 해당 패키지를 정확히 인식하고 분석하는 데 도움을 줍니다.

- **`pnpm create vite@latest <project_name> -- --template react-ts`**: TypeScript 검사를 바로 사용할 수 있는 새 React + Vite 패키지를 생성합니다.
  - **이유**: 표준적인 React + TypeScript 프로젝트를 빠르게 생성하는 명령어입니다. Vite를 사용하여 빠른 개발 서버를 구축하고, `react-ts` 템플릿을 통해 타입스크립트 설정, `tsconfig.json` 파일, 기본 타입 정의가 자동으로 완료되므로, 수동 설정의 번거로움 없이 바로 타입-세이프(type-safe) 개발을 시작할 수 있습니다.
