'use client';

import { useState } from 'react';
import { CommunityFeedCard } from '@/components/CommunityFeedCard';
import { mockPosts } from '@/lib/mock-data';
import { PromptInput } from '@/components/PromptInput';

export default function Home() {
  const [posts] = useState(mockPosts);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* 제목 섹션 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI로 상상을 현실로 만드세요.</h1>
        <p className="text-gray-600">프롬프트를 입력하고 AI가 당신의 상상을 이미지로 만들어드립니다.</p>
      </div>

      {/* 이미지 생성 섹션 */}
      <PromptInput />

      {/* 커뮤니티 피드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <CommunityFeedCard key={post.postId} post={post} />
        ))}
      </div>
    </main>
  );
}
