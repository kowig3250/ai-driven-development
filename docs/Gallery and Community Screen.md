## 갤러리 관리 및 커뮤니티 공유 화면 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

- **파일 위치**: 
  - 페이지: `app/gallery/page.tsx`
  - 컴포넌트: `/components/gallery/*`

1. **탭 네비게이션**
   - **파일 위치**: `/components/gallery/TabNavigation.tsx`
   - **UI 구성**: 
     - 상단에 "갤러리"와 "커뮤니티" 탭으로 구성
     - 활성화된 탭은 브랜드 메인 색상으로 강조
   - **상호작용**: 
     - 탭 클릭 시 해당 섹션으로 전환
     - URL 파라미터로 현재 탭 상태 유지

2. **갤러리 섹션**
   - **파일 위치**: 
     - 메인: `/components/gallery/GallerySection.tsx`
     - 이미지 카드: `/components/gallery/ImageCard.tsx`
     - 상세 모달: `/components/gallery/ImageDetailModal.tsx`
   - **UI 구성**: 
     - 그리드 레이아웃으로 이미지 표시
     - 반응형 디자인 적용
       - 모바일: 2열
       - 태블릿: 3열
       - 데스크톱: 4열
   - **이미지 카드**:
     - 이미지 썸네일
     - 생성 날짜
     - 프롬프트 미리보기
     - 공유/삭제 버튼
   - **상호작용**:
     - 이미지 클릭 시 상세 보기 모달
     - 드래그 앤 드롭으로 순서 변경
     - 체크박스로 다중 선택 가능

3. **커뮤니티 섹션**
   - **파일 위치**: 
     - 메인: `/components/gallery/CommunitySection.tsx`
     - 게시물 카드: `/components/gallery/PostCard.tsx`
     - 상호작용 버튼: `/components/gallery/InteractionButtons.tsx`
   - **UI 구성**: 
     - 피드 형태로 게시물 표시
     - 무한 스크롤 적용
   - **게시물 카드**:
     - 생성된 이미지
     - 사용자 정보 (프로필 이미지, 닉네임)
     - 프롬프트 내용
     - 좋아요, 댓글, 스크랩 수
     - 생성 날짜
   - **상호작용**:
     - 좋아요, 댓글, 스크랩 기능
     - 게시물 클릭 시 상세 페이지로 이동

4. **필터 및 정렬**
   - **파일 위치**: `/components/gallery/FilterSortBar.tsx`
   - **UI 구성**: 
     - 상단에 필터/정렬 옵션 배치
   - **필터 옵션**:
     - 날짜별
     - 스타일별
     - 좋아요 수
   - **정렬 옵션**:
     - 최신순
     - 인기순
     - 댓글순

#### 2. 사용자 흐름 및 상호작용

1. **갤러리 관리**
   - 이미지 선택 → 상세 보기/편집/삭제
   - 다중 선택 → 일괄 삭제/공유
   - 드래그 앤 드롭으로 갤러리 정리

2. **커뮤니티 상호작용**
   - 게시물 작성 → 커뮤니티 공유
   - 좋아요/댓글/스크랩 기능 사용
   - 다른 사용자의 게시물 탐색

#### 3. API 연동

1. **갤러리 API**
   - **엔드포인트**: `/api/gallery`
   - **데이터 구조**:
     ```typescript
     {
       images: {
         id: string;
         imageUrl: string;
         prompt: string;
         createdAt: string;
         style: string;
         isPublic: boolean;
       }[];
       totalCount: number;
     }
     ```

2. **커뮤니티 API**
   - **엔드포인트**: `/api/community`
   - **데이터 구조**:
     ```typescript
     {
       posts: {
         postId: string;
         userId: string;
         userName: string;
         userProfile: string;
         imageUrl: string;
         prompt: string;
         createdAt: string;
         likes: number;
         comments: number;
         scraps: number;
         isLiked: boolean;
         isScrapped: boolean;
       }[];
       totalCount: number;
     }
     ```

#### 4. 테스트 항목

1. **갤러리 기능**
   - 이미지 그리드 표시 확인
   - 이미지 상세 보기 확인
   - 다중 선택 및 일괄 작업 확인
   - 드래그 앤 드롭 기능 확인

2. **커뮤니티 기능**
   - 게시물 피드 표시 확인
   - 좋아요/댓글/스크랩 기능 확인
   - 무한 스크롤 동작 확인
   - 필터/정렬 기능 확인

3. **반응형 디자인**
   - 다양한 화면 크기에서 레이아웃 확인
   - 모바일 환경에서의 사용성 확인

---

### 백엔드 기능명세서

#### 1. 갤러리 API

- **파일 위치**: `app/api/gallery/route.ts`
- **기능**:
  - 사용자의 이미지 목록 조회
  - 이미지 삭제
  - 이미지 공개/비공개 설정
  - 이미지 순서 변경

#### 2. 커뮤니티 API

- **파일 위치**: `app/api/community/route.ts`
- **기능**:
  - 게시물 목록 조회
  - 게시물 작성/수정/삭제
  - 좋아요/댓글/스크랩 처리
  - 사용자별 활동 내역 조회

#### 3. 테스트 항목

1. **API 엔드포인트**
   - 데이터 조회/수정/삭제 확인
   - 권한 검증 확인
   - 에러 처리 확인
   - 페이지네이션 확인

2. **데이터 정합성**
   - 이미지 메타데이터 저장 확인
   - 사용자 활동 기록 확인
   - 통계 데이터 정확성 확인 