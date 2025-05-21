'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CommunityFeedCardProps } from '@/types';
import { useCallback } from 'react';

export function CommunityFeedCard({ post }: CommunityFeedCardProps) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    requestAnimationFrame(() => {
      router.push(`/post/${post.postId}`);
    });
  }, [router, post.postId]);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow will-change-transform"
      onClick={handleClick}
    >
      <div className="relative aspect-square">
        <Image
          src={post.imageURL}
          alt={post.prompt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          quality={75}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={post.userProfile}
              alt={post.userName}
              fill
              className="object-cover"
              sizes="32px"
              loading="lazy"
              quality={75}
            />
          </div>
          <span className="font-medium text-sm">{post.userName}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{post.prompt}</p>
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <span>좋아요 {post.likes}</span>
          <span>댓글 {post.comments}</span>
        </div>
      </div>
    </div>
  );
} 