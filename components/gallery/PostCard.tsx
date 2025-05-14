'use client';

import Image from 'next/image';
import { mockCommunityPosts } from '@/lib/mock-data';

type PostType = typeof mockCommunityPosts[0];

interface PostCardProps {
  post: PostType;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex items-center space-x-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={post.userProfile}
            alt={post.userName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{post.userName}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="relative aspect-video">
        <Image
          src={post.imageUrl}
          alt={post.prompt}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <p className="text-gray-700 mb-4">{post.prompt}</p>
        
        <div className="flex items-center space-x-6 text-gray-500">
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={post.isLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{post.likes}</span>
          </button>
          
          <button className="flex items-center space-x-1 hover:text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{post.comments}</span>
          </button>
          
          <button className="flex items-center space-x-1 hover:text-yellow-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={post.isScrapped ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>{post.scraps}</span>
          </button>
        </div>
      </div>
    </div>
  );
} 