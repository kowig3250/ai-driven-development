# 이미지 생성 화면

이미지 생성 화면은 사용자가 텍스트 프롬프트를 입력하고 다양한 스타일 옵션을 선택하여 AI 이미지를 생성할 수 있는 인터페이스를 제공합니다.

## 주요 기능

### 1. 프롬프트 입력
- 텍스트 영역을 통해 이미지 생성을 위한 프롬프트 입력
- 최소 10자 이상의 상세한 설명 권장
- 실시간 입력 유효성 검사

### 2. 스타일 옵션
- 이미지 스타일 선택
  - 사실주의 (realistic)
  - 만화풍 (cartoon)
  - 수채화 (watercolor)
  - 유화 (oil)
- 색조 조정
  - 밝은 (bright)
  - 어두운 (dark)
  - 따뜻한 (warm)
  - 차가운 (cold)

### 3. 이미지 생성 프로세스
- 비동기 이미지 생성 처리
- 실시간 생성 상태 모니터링
- 토스트 알림을 통한 작업 상태 표시
  - 생성 시작
  - 생성 완료
  - 오류 발생

### 4. 결과 이미지 표시
- 생성된 이미지 프리뷰
- 이미지 로딩 상태 표시
- 이미지 로드 실패 시 오류 메시지
- 이미지 다운로드 옵션

## UI 컴포넌트

### 1. 프롬프트 입력 컴포넌트
```typescript
<PromptInput
  prompt={prompt}
  onPromptChange={setPrompt}
/>
```

### 2. 스타일 옵션 컴포넌트
```typescript
<StyleOptions
  selectedStyle={selectedStyle}
  selectedColor={selectedColor}
  onStyleChangeAction={setSelectedStyle}
  onColorChangeAction={setSelectedColor}
/>
```

### 3. 이미지 프리뷰 컴포넌트
```typescript
<GeneratedImagePreview
  generatedImage={generatedImage}
/>
```

### 4. 토스트 알림 컴포넌트
```typescript
<Toast
  message={toast.message}
  type={toast.type}
  onClose={() => setToast(null)}
/>
```

## 상태 관리

### 1. 로컬 상태
```typescript
const [prompt, setPrompt] = useState('');
const [selectedStyle, setSelectedStyle] = useState('');
const [selectedColor, setSelectedColor] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [generatedImage, setGeneratedImage] = useState<{
  imageUrl: string;
  generationId: string;
  status: 'success';
} | null>(null);
const [error, setError] = useState<string | null>(null);
const [toast, setToast] = useState<{
  message: string;
  type: 'success' | 'error' | 'info';
} | null>(null);
```

### 2. 이미지 생성 프로세스
1. 프롬프트 유효성 검사
2. API 요청 전송
3. 생성 ID 수신
4. 상태 폴링 시작
5. 결과 이미지 표시

## 에러 처리

### 1. 프롬프트 관련
- 빈 프롬프트
- 최소 길이 미달
- 부적절한 내용

### 2. API 관련
- 서버 오류
- 네트워크 오류
- 타임아웃

### 3. 이미지 생성 관련
- 생성 실패
- 이미지 로드 실패
- 형식 오류

## 사용자 경험

### 1. 로딩 상태
- 버튼 비활성화
- 로딩 인디케이터
- 진행 상태 표시

### 2. 피드백
- 토스트 알림
- 에러 메시지
- 성공 메시지

### 3. 반응형 디자인
- 모바일 최적화
- 태블릿 지원
- 데스크톱 레이아웃

## 성능 최적화

### 1. 이미지 최적화
- Next.js Image 컴포넌트 사용
- 적절한 이미지 크기
- 지연 로딩

### 2. API 호출 최적화
- 폴링 간격 조정
- 캐싱 전략
- 에러 재시도

### 3. 상태 관리 최적화
- 불필요한 리렌더링 방지
- 메모이제이션
- 상태 업데이트 최적화

## 이미지 생성 화면 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

- **파일 위치**: `app/generate/page.tsx`

1. **프롬프트 입력 섹션**
   - **UI 구성**: 
     - 화면 상단에 배치된 텍스트 입력 필드
     - 전체 너비의 2/3 크기로 설정
     - 회색 배경에 테두리 없는 디자인
   - **상호작용**: 
     - 사용자가 프롬프트를 입력할 때마다 실시간 유효성 검사
     - 최소 10자 이상 입력 시에만 생성 버튼 활성화
   - **오류 처리**: 
     - 프롬프트가 너무 짧을 경우 경고 메시지 표시
     - 특수문자나 부적절한 내용 필터링

2. **이미지 생성 버튼**
   - **UI 구성**: 
     - 프롬프트 입력 필드 하단에 배치
     - 브랜드 메인 색상(#4A90E2) 사용
   - **상태 표시**:
     - 비활성화: 회색 배경
     - 활성화: 파란색 배경
     - 호버: 진한 파란색
   - **로딩 상태**:
     - 생성 중: 회전하는 로딩 아이콘 표시

3. **결과 미리보기 섹션**
   - **UI 구성**: 
     - 생성 버튼 하단에 배치
     - 이미지가 생성되기 전까지는 플레이스홀더 표시
   - **이미지 표시**:
     - 생성된 이미지는 1:1 비율로 표시
     - 이미지 품질에 따른 최적화 처리
   - **상호작용**:
     - 이미지 클릭 시 전체화면 모드
     - 우클릭으로 저장 옵션 제공

#### 2. 사용자 흐름 및 상호작용

1. **프롬프트 입력 → 이미지 생성**
   - 사용자가 프롬프트를 입력
   - 생성 버튼 클릭 시 로딩 애니메이션 표시
   - 이미지 생성 완료 시 결과 미리보기 섹션에 표시

2. **결과 이미지 처리**
   - 이미지 생성 완료 후 저장/공유 옵션 제공
   - 갤러리에 저장 또는 커뮤니티에 공유 가능

#### 3. API 연동

1. **이미지 생성 API**
   - **엔드포인트**: `/api/generate`
   - **요청 데이터**:
     ```typescript
     {
       prompt: string;
     }
     ```
   - **응답 데이터**:
     ```typescript
     {
       imageUrl: string;
       generationId: string;
       status: 'success' | 'error';
       errorMessage?: string;
     }
     ```

#### 4. 테스트 항목

1. **프롬프트 입력 필드**
   - 텍스트 입력 및 유효성 검사 확인
   - 최소 길이 제한 확인
   - 특수문자 필터링 확인

2. **이미지 생성**
   - 생성 버튼 활성화/비활성화 확인
   - 로딩 애니메이션 확인
   - API 연동 확인
   - 에러 처리 확인

3. **결과 이미지**
   - 이미지 표시 확인
   - 저장/공유 기능 확인
   - 반응형 디자인 확인

---

### 백엔드 기능명세서

#### 1. 이미지 생성 API

- **파일 위치**: `app/api/generate/route.ts`
- **기능**:
  - 프롬프트를 받아 이미지 생성 요청 처리
  - 이미지 생성 결과 반환
- **에러 처리**:
  - 프롬프트 유효성 검사
  - 이미지 생성 실패 시 에러 메시지 반환

#### 2. 테스트 항목

1. **API 엔드포인트**
   - 프롬프트 유효성 검사 확인
   - 이미지 생성 요청 처리 확인
   - 에러 처리 확인
   - 응답 데이터 형식 확인 