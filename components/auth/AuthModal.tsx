'use client';

import { useState, useEffect, useCallback } from 'react';
import { SignIn, SignUp } from "@clerk/nextjs";

interface AuthModalProps {
  isOpen: boolean;
  onCloseAction: () => Promise<void>;
}

export function AuthModal({ isOpen, onCloseAction }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 모달 열기/닫기 처리
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // 다음 프레임에서 애니메이션 시작
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      // 애니메이션 완료 후 언마운트
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 300); // 트랜지션 시간과 동일하게 설정
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCloseAction();
    }
  }, [onCloseAction]);

  useEffect(() => {
    if (isMounted) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMounted, handleKeyDown]);

  if (!isMounted) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 300ms ease-in-out',
        willChange: 'opacity'
      }}
      onClick={() => onCloseAction()}
    >
      <div 
        className="bg-white rounded-lg p-8 w-full max-w-md relative"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 300ms ease-in-out',
          willChange: 'transform, opacity'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => onCloseAction()}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="닫기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex mb-6 border-b">
          <button
            className={`flex-1 py-2 text-center transition-colors ${
              activeTab === 'sign-in'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('sign-in')}
          >
            로그인
          </button>
          <button
            className={`flex-1 py-2 text-center transition-colors ${
              activeTab === 'sign-up'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('sign-up')}
          >
            회원가입
          </button>
        </div>

        <div className="mt-4">
          {activeTab === 'sign-in' ? (
            <SignIn routing="hash" />
          ) : (
            <SignUp routing="hash" />
          )}
        </div>
      </div>
    </div>
  );
} 