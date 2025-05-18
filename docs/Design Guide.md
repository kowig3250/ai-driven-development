# 디자인 가이드

이 문서는 AI 이미지 생성 플랫폼의 UI/UX 디자인 가이드라인을 제공합니다.

## 디자인 시스템

### 1. 색상

#### 주요 색상
- Primary: `#3B82F6` (파란색)
- Secondary: `#10B981` (녹색)
- Accent: `#8B5CF6` (보라색)

#### 상태 색상
- Success: `#10B981` (녹색)
- Error: `#EF4444` (빨간색)
- Warning: `#F59E0B` (주황색)
- Info: `#3B82F6` (파란색)

#### 중립 색상
- Background: `#FFFFFF` (흰색)
- Surface: `#F3F4F6` (연한 회색)
- Text: `#1F2937` (진한 회색)
- Border: `#E5E7EB` (회색)

### 2. 타이포그래피

#### 폰트 패밀리
- 기본: `Inter`
- 제목: `Inter`
- 코드: `JetBrains Mono`

#### 폰트 크기
- 제목 1: `2.25rem` (36px)
- 제목 2: `1.875rem` (30px)
- 제목 3: `1.5rem` (24px)
- 본문: `1rem` (16px)
- 작은 텍스트: `0.875rem` (14px)

### 3. 간격

#### 기본 간격
- xs: `0.25rem` (4px)
- sm: `0.5rem` (8px)
- md: `1rem` (16px)
- lg: `1.5rem` (24px)
- xl: `2rem` (32px)

#### 컴포넌트 간격
- 섹션 간격: `2rem` (32px)
- 요소 간격: `1rem` (16px)
- 내부 여백: `1rem` (16px)

## 컴포넌트 디자인

### 1. 헤더

#### 기본 헤더
```tsx
<header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
  <div className="container mx-auto px-4 h-full flex items-center justify-between">
    {/* 로고 */}
    <div className="flex items-center">
      <Image src="/logo.png" alt="Logo" width={64} height={64} className="w-16 h-16" />
      <span className="ml-2 text-xl font-semibold">AI Image Generator</span>
    </div>
    
    {/* 내비게이션 */}
    <nav className="flex items-center space-x-4">
      <Link href="/gallery" className="text-gray-600 hover:text-blue-500">
        내 갤러리
      </Link>
      <Link href="/generate" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        이미지 생성
      </Link>
    </nav>
  </div>
</header>
```

#### 모바일 헤더
```tsx
<header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
  <div className="container mx-auto px-4 h-full flex items-center justify-between">
    {/* 로고 */}
    <div className="flex items-center">
      <Image src="/logo.png" alt="Logo" width={64} height={64} className="w-16 h-16" />
    </div>
    
    {/* 모바일 메뉴 버튼 */}
    <button className="p-2 text-gray-600 hover:text-blue-500">
      <MenuIcon className="w-6 h-6" />
    </button>
  </div>
</header>
```

#### 헤더 스타일 가이드
- 높이: `4rem` (64px)
- 배경색: `#FFFFFF`
- 테두리: `1px solid #E5E7EB`
- 로고 크기: `4rem` (64px)
- 내비게이션 간격: `1rem` (16px)
- 버튼 패딩: `1rem` (16px)
- 모바일 브레이크포인트: `768px`

### 2. 버튼

#### 기본 버튼
```tsx
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  버튼
</button>
```

#### 비활성화 버튼
```tsx
<button className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed">
  비활성화
</button>
```

### 3. 입력 필드

#### 텍스트 입력
```tsx
<input
  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  type="text"
  placeholder="입력하세요"
/>
```

#### 텍스트 영역
```tsx
<textarea
  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  rows={4}
  placeholder="여러 줄 입력"
/>
```

### 4. 선택 필드

#### 드롭다운
```tsx
<select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
  <option value="">선택하세요</option>
  <option value="1">옵션 1</option>
  <option value="2">옵션 2</option>
</select>
```

### 5. 토스트 알림

#### 기본 토스트
```tsx
<div className="fixed bottom-4 right-4 z-50">
  <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">
    메시지
  </div>
</div>
```

#### 상태별 토스트
```tsx
const toastStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

<div className={`${toastStyles[type]} text-white px-6 py-3 rounded-lg shadow-lg`}>
  {message}
</div>
```

### 6. 이미지 프리뷰

#### 기본 프리뷰
```tsx
<div className="relative aspect-square w-full max-w-2xl mx-auto">
  <Image
    src={imageUrl}
    alt="Generated image"
    fill
    className="object-contain rounded-lg"
  />
</div>
```

#### 로딩 상태
```tsx
<div className="relative aspect-square w-full max-w-2xl mx-auto bg-gray-100 rounded-lg">
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
  </div>
</div>
```

## 레이아웃

### 1. 그리드 시스템

#### 기본 그리드
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 그리드 아이템 */}
</div>
```

#### 반응형 그리드
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* 그리드 아이템 */}
</div>
```

### 2. 컨테이너

#### 기본 컨테이너
```tsx
<div className="container mx-auto px-4">
  {/* 컨텐츠 */}
</div>
```

#### 최대 너비 컨테이너
```tsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* 컨텐츠 */}
</div>
```

## 반응형 디자인

### 1. 브레이크포인트
- sm: `640px`
- md: `768px`
- lg: `1024px`
- xl: `1280px`
- 2xl: `1536px`

### 2. 모바일 최적화
- 터치 타겟 크기: 최소 `44px`
- 폰트 크기: 최소 `16px`
- 여백: 최소 `16px`

### 3. 데스크톱 최적화
- 최대 너비: `1280px`
- 여백: `32px`
- 그리드 간격: `24px`

## 접근성

### 1. 색상 대비
- 텍스트와 배경: 최소 4.5:1
- 큰 텍스트: 최소 3:1
- UI 요소: 최소 3:1

### 2. 키보드 접근성
- 포커스 표시
- 탭 순서
- 단축키

### 3. 스크린 리더
- 적절한 ARIA 레이블
- 의미있는 대체 텍스트
- 상태 변경 알림

## 애니메이션

### 1. 전환 효과
- 기본 전환: `0.2s ease-in-out`
- 호버 효과: `0.15s ease-in-out`
- 토스트 알림: `0.3s ease-in-out`

### 2. 로딩 애니메이션
- 스피너: `1s linear infinite`
- 페이드 인: `0.3s ease-in`
- 페이드 아웃: `0.3s ease-out`

## 아이콘

### 1. 아이콘 크기
- 작은: `16px`
- 중간: `24px`
- 큰: `32px`

### 2. 아이콘 색상
- 기본: `currentColor`
- 활성: `#3B82F6`
- 비활성: `#9CA3AF`

## 이미지

### 1. 이미지 크기
- 썸네일: `150x150px`
- 중간: `300x300px`
- 큰: `600x600px`

### 2. 이미지 포맷
- 기본: `WebP`
- 대체: `JPEG`
- 투명도 필요: `PNG`

## 성능 최적화

### 1. 이미지 최적화
- 적절한 크기 사용
- 지연 로딩
- WebP 포맷 사용

### 2. 애니메이션 최적화
- GPU 가속 사용
- 불필요한 애니메이션 제거
- 성능 모니터링

### 3. 코드 최적화
- 컴포넌트 분할
- 불필요한 리렌더링 방지
- 코드 스플리팅

### 7. 변경 이력

#### 2024-06-13
- 헤더 로고 이미지를 `/logo.png`로 교체, 크기를 64px로 통일
- Next.js Image 컴포넌트의 fill + sizes 속성 일괄 적용 (경고 제거)
- 이미지 생성 API에서 스타일/색조 옵션 모두 프롬프트에 반영

## 스타일 옵션
- 이미지 스타일 선택
  - 사실주의 (realistic)
  - 만화풍 (cartoon)
  - 수채화 (watercolor)
  - 유화 (oil)
- 로고 스타일 (minimal, geometric, organic, tech, playful, corporate, artistic, abstract 등)
- 색조 조정
  - 밝은 (bright)
  - 어두운 (dark)
  - 따뜻한 (warm)
  - 차가운 (cold)
  - 단색(monochrome), 그라데이션(gradient), 파스텔톤(pastel), 선명한(vibrant), 차분한(muted), 금속성(metallic) 등

**모든 스타일/색조 옵션은 이미지 생성 프롬프트에 자동으로 반영됩니다.**
예: "minimal style, bright color tone" 등으로 프롬프트가 보강됨

### 3. 이미지 생성 프로세스
- 비동기 이미지 생성 처리
- 실시간 생성 상태 모니터링
- 토스트 알림을 통한 작업 상태 표시
  - 생성 시작
  - 생성 완료
  - 오류 발생
- 스타일/색조 옵션이 프롬프트에 반영되어 API로 전달됨

#### 2024-06-13
- 스타일/색조 옵션이 프롬프트에 모두 반영되도록 API 및 UI 로직 개선
- 로고 스타일 옵션 추가 및 문서화
- 이미지 컴포넌트 fill+sizes 속성 적용 가이드 추가
- 헤더 로고 이미지 64px로 통일 및 예시 코드 수정