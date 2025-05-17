// 게시물 관련 타입
export interface Post {
  postId: string;
  imageURL: string;
  userName: string;
  userProfile: string;
  createdAt: string;
  prompt: string;
  styleOptions: {
    style: string;
    quality: string;
    aspectRatio: string;
  };
  likes: number;
  comments: number;
  scraps: number;
  isLiked: boolean;
  isScrapped: boolean;
}

// 댓글 관련 타입
export interface Comment {
  id: string;
  content: string;
  userName: string;
  userProfile: string;
  createdAt: string;
  parentId?: string;
}

// 댓글 모달 Props 타입
export interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  comments: Comment[];
  onAddComment: (content: string) => void;
}

// 커뮤니티 피드 카드 Props 타입
export interface CommunityFeedCardProps {
  post: Post;
}

// 이미지 생성 요청 타입
export interface GenerateImageRequest {
  prompt: string;
  styleOptions?: {
    style?: string;
    quality?: string;
    aspectRatio?: string;
  };
}

// 이미지 생성 응답 타입
export interface GenerateImageResponse {
  success: boolean;
  imageURL?: string;
  error?: string;
}

// 이미지 생성 버튼 Props 타입
export interface GenerateButtonProps {
  prompt: string;
  isGenerating: boolean;
  onClickAction: () => Promise<void>;
}

// 이미지 프리뷰 Props 타입
export interface GeneratedImagePreviewProps {
  generatedImage: {
    imageUrl: string;
    generationId: string;
    status: 'success';
  };
}

// 프롬프트 입력 Props 타입
export interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
}

// 스타일 옵션 Props 타입
export interface StyleOptionsProps {
  selectedStyle: string;
  selectedColor: string;
  onStyleChangeAction: (value: string) => void;
  onColorChangeAction: (value: string) => void;
} 