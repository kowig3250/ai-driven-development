'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Bookmark } from 'lucide-react';

// 목업 데이터
const mockPost = {
  postId: '1',
  imageURL: 'https://picsum.photos/id/1015/800/800',
  userName: 'creative_artist',
  userProfile: 'https://picsum.photos/id/1/32/32',
  createdAt: '2024-03-20 14:30',
  prompt: 'A beautiful sunset over a calm ocean, with vibrant orange and purple hues reflecting on the water',
  styleOptions: {
    style: 'Photorealistic',
    quality: 'High',
    aspectRatio: '1:1'
  },
  likes: 120,
  comments: 15,
  scraps: 45,
  isLiked: false,
  isScrapped: false
};

// 목업 댓글 데이터
const mockComments = [
  {
    id: '1',
    content: '정말 멋진 이미지네요!',
    userName: 'user1',
    userProfile: 'https://picsum.photos/id/1/32/32',
    createdAt: '2024-03-20 14:30',
  },
  {
    id: '2',
    content: '어떤 프롬프트를 사용하셨나요?',
    userName: 'user2',
    userProfile: 'https://picsum.photos/id/2/32/32',
    createdAt: '2024-03-20 15:00',
  },
];

export default function PostDetail({ params }: { params: { postId: string } }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(mockPost.isLiked);
  const [isScrapped, setIsScrapped] = useState(mockPost.isScrapped);
  const [likes, setLikes] = useState(mockPost.likes);
  const [scraps, setScraps] = useState(mockPost.scraps);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleScrap = () => {
    setIsScrapped(!isScrapped);
    setScraps(prev => isScrapped ? prev - 1 : prev + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now().toString(),
      content: newComment,
      userName: '현재 사용자',
      userProfile: 'https://picsum.photos/id/3/32/32',
      createdAt: new Date().toLocaleString(),
    };

    setComments(prev => [...prev, newCommentObj]);
    setNewComment('');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          ← 뒤로가기
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 이미지 섹션 */}
          <div className="relative aspect-square">
            <Image
              src={mockPost.imageURL}
              alt="Generated image"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* 정보 섹션 */}
          <div className="space-y-6">
            {/* 작성자 정보 */}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={mockPost.userProfile} />
                <AvatarFallback>{mockPost.userName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{mockPost.userName}</div>
                <div className="text-sm text-gray-500">{mockPost.createdAt}</div>
              </div>
            </div>

            {/* 상호작용 버튼 */}
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 hover:text-red-500 transition-colors ${
                  isLiked ? 'fill-red-500 text-red-500' : ''
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{likes}</span>
              </button>
              <button
                className="flex items-center gap-2 hover:text-blue-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{comments.length}</span>
              </button>
              <button
                onClick={handleScrap}
                className={`flex items-center gap-2 hover:text-yellow-500 transition-colors ${
                  isScrapped ? 'fill-yellow-500 text-yellow-500' : ''
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isScrapped ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                <span>{scraps}</span>
              </button>
            </div>

            {/* 프롬프트 정보 */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">프롬프트</h3>
                <p className="text-gray-600">{mockPost.prompt}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">스타일 옵션</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500">스타일:</span>
                    <span className="ml-2">{mockPost.styleOptions.style}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">품질:</span>
                    <span className="ml-2">{mockPost.styleOptions.quality}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">비율:</span>
                    <span className="ml-2">{mockPost.styleOptions.aspectRatio}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="mt-8 space-y-4">
          <h3 className="font-semibold text-lg">댓글 {comments.length}개</h3>
          
          {/* 댓글 작성 폼 */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 작성하세요"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              작성
            </button>
          </form>

          {/* 댓글 목록 */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={comment.userProfile}
                    alt={comment.userName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{comment.userName}</span>
                    <span className="text-sm text-gray-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 