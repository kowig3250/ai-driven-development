'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Comment, CommentModalProps } from '@/types';

export function CommentModal({ isOpen, onClose, postId, comments, onAddComment }: CommentModalProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>댓글</DialogTitle>
        </DialogHeader>

        {/* 댓글 입력 폼 */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성하세요"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            disabled={!newComment.trim()}
            className={`px-4 py-2 rounded-lg transition-colors ${
              newComment.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            작성
          </Button>
        </form>

        {/* 댓글 목록 */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
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
      </DialogContent>
    </Dialog>
  );
} 