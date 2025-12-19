# LCP 성능 향상 전략

Largest Contentful Paint (LCP)는 웹 페이지의 주요 콘텐츠가 로드되는 시간을 측정하는 핵심 웹 지표입니다. 이 문서에서는 ERP 시스템의 LCP 성능을 향상시키기 위한 전략을 설명합니다.

## 현재 LCP 분석 요약

- **LCP 요소**: 현재 LCP 요소는 텍스트 (`H1` 태그)로 식별되었습니다.
- **LCP 시간**: 286ms
- **Time to First Byte (TTFB)**: 54ms (LCP 시간의 18.7%)
- **Element Render Delay**: 233ms (LCP 시간의 81.3%)

`Element Render Delay`가 LCP 시간의 대부분을 차지하고 있으며, 이는 초기 응답 후 브라우저가 페이지 렌더링에 많은 시간을 소비하고 있음을 나타냅니다. 이는 렌더링 차단 리소스나 메인 스레드를 차단하는 JavaScript 실행, 복잡한 레이아웃/스타일링 때문일 수 있습니다.

## LCP 개선 권장 사항

### 1. Critical CSS 최적화

초기 렌더링에 필요한 최소한의 CSS(Critical CSS)만을 동기적으로 로드하고, 나머지 CSS는 지연 로드합니다.

- **Critical CSS 식별 및 인라인**:
    - "폴드 위(Above-the-fold)" 콘텐츠, 즉 사용자가 페이지에 접속했을 때 스크롤 없이 볼 수 있는 영역에 필요한 CSS를 식별합니다.
    - Next.js의 기능을 활용하여 이 Critical CSS를 HTML 문서 내 `<style>` 태그로 인라인하여 별도의 네트워크 요청 없이 즉시 적용되도록 합니다.
- **사용하지 않는 CSS 제거 (PurgeCSS / Tailwind JIT)**:
    - Tailwind CSS를 사용하는 경우, 프로덕션 빌드 시 PurgeCSS 또는 Tailwind JIT(Just-In-Time) 모드를 사용하여 실제로 사용되는 CSS만 번들에 포함되도록 합니다. 이를 통해 CSS 파일 크기를 최소화합니다.

### 2. Font 최적화

웹 폰트는 렌더링을 차단할 수 있으므로 효율적으로 로드해야 합니다.

- **`next/font` 사용**:
    - Next.js 13 이상에서 제공하는 `@next/font`를 사용하여 Google Fonts 또는 로컬 폰트를 최적화합니다. 이는 자동으로 폰트를 자체 호스팅하고, `font-display: optional`을 적용하며, 폰트 요청을 미리 로드(preload)하여 레이아웃 이동(CLS)을 방지하고 LCP를 개선합니다.
- **폰트 미리 로드**:
    - LCP 요소에 사용되는 폰트가 외부 폰트인 경우, `<link rel="preload" as="font" crossOrigin="anonymous">` 태그를 사용하여 해당 폰트를 미리 로드하여 렌더링 지연을 줄입니다.

### 3. Render-Blocking JavaScript 최소화

과도한 JavaScript 실행은 메인 스레드를 차단하여 LCP를 지연시킬 수 있습니다.

- **사용하지 않는 JavaScript 제거**:
    - 번들 분석 도구(예: Webpack Bundle Analyzer)를 사용하여 번들 크기를 분석하고, 초기 페이지 로드에 필요하지 않은 JavaScript 코드를 식별하여 제거하거나 분할합니다.
- **비핵심 JavaScript 지연 로드**:
    - 초기 렌더링에 필수적이지 않은 JavaScript 파일에 `defer` 또는 `async` 속성을 추가합니다.
    - Next.js의 `next/script` 컴포넌트를 사용하여 외부 스크립트를 효율적으로 로드합니다.
        - `strategy="beforeInteractive"`: 초기 HTML 로드 후, 페이지가 대화형이 되기 전에 스크립트를 로드합니다. (Critical)
        - `strategy="afterInteractive"` (기본값): 페이지가 대화형이 된 후 스크립트를 로드합니다. (Non-critical)
        - `strategy="lazyOnload"`: 브라우저 유휴 시간 동안 스크립트를 로드합니다. (Less critical)

### 4. 서버 컴포넌트 활용 (Server Components)

- LCP 요소가 정적인 텍스트(`H1` 태그)인 경우, 해당 콘텐츠가 클라이언트 측 JavaScript의 실행을 기다리지 않고 바로 브라우저에 전송될 수 있도록 Server Components 또는 Static Site Generation(SSG)을 적극적으로 활용합니다.
- 초기 HTML에 LCP 콘텐츠가 포함되도록 하여 클라이언트 측 하이드레이션으로 인한 지연을 최소화합니다. (Next.js는 기본적으로 SSR/SSG를 지원하며, "use client" 지시어 없이 작성된 컴포넌트는 Server Component로 간주됩니다.)

## 추가 점검 사항

- **이미지 최적화**: 페이지에 사용되는 모든 이미지가 최적화되어 있는지 확인합니다. `next/image` 컴포넌트를 사용하여 이미지 크기 조정, 지연 로딩, 최적화된 형식(WebP 등) 변환을 자동화합니다. (현재 LCP 요소는 이미지가 아니지만, 전반적인 로딩 성능에 영향).
- **TTFB 개선**: 서버 응답 시간을 단축하기 위해 서버 캐싱, CDN 사용, 데이터베이스 쿼리 최적화 등을 고려합니다. (현재 TTFB는 54ms로 양호한 편이지만, 더 개선될 수 있습니다.)
- **렌더링 성능 디버깅**: Chrome DevTools의 Performance 탭에서 메인 스레드 활동을 더 자세히 분석하여 어떤 스크립트 실행이나 레이아웃 작업이 렌더링을 지연시키는지 정확히 파악하고 최적화합니다.

이러한 전략들을 적용하여 ERP 시스템의 LCP 성능을 효과적으로 개선할 수 있습니다.
