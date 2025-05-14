'use client';

import { mockCommunityPosts } from '@/lib/mock-data';
import { PostCard } from './PostCard';

export function CommunitySection() {
  return (
    <div className="space-y-6">
      {mockCommunityPosts.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </div>
  );
} 