'use client';

import { useState } from 'react';
import { CommunityFeedCard } from '@/components/CommunityFeedCard';
import { mockPosts } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [posts] = useState(mockPosts);
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 이미지 생성 요청 시 오류 페이지로 이동
    router.push('/error');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* 제목 섹션 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI로 상상을 현실로 만드세요.</h1>
        <p className="text-gray-600">프롬프트를 입력하고 AI가 당신의 상상을 이미지로 만들어드립니다.</p>
      </div>

      {/* 이미지 생성 섹션 */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-2/3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="이미지를 생성할 프롬프트를 입력하세요"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-2/3">
            <button
              type="submit"
              disabled={!prompt.trim()}
              className={`w-full px-4 py-2 rounded-lg transition-colors ${
                prompt.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              이미지 생성
            </button>
          </div>
        </div>
      </form>

      {/* 커뮤니티 피드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <CommunityFeedCard key={post.postId} post={post} />
        ))}
      </div>
    </main>
  );
}
