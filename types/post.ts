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