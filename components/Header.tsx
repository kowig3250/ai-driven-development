'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* 로고 섹션 */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="AI Image Generator Logo"
            width={64}
            height={64}
            className="w-16 h-16"
          />
          <span className="ml-2 text-xl font-semibold hidden md:block">
            AI Image Generator
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link
            href="/gallery"
            className={`text-gray-600 hover:text-blue-500 transition-colors ${
              isActive('/gallery') ? 'text-blue-500' : ''
            }`}
          >
            내 갤러리
          </Link>
          <Link
            href="/generate"
            className={`text-gray-600 hover:text-blue-500 transition-colors ${
              isActive('/generate') ? 'text-blue-500' : ''
            }`}
          >
            이미지 생성
          </Link>
          <div className="flex items-center space-x-2">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  로그인
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  회원가입
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-blue-500"
          onClick={toggleMobileMenu}
          aria-label="메뉴 열기"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200">
          <nav className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <Link
              href="/gallery"
              className={`py-2 text-gray-600 hover:text-blue-500 transition-colors ${
                isActive('/gallery') ? 'text-blue-500' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              내 갤러리
            </Link>
            <Link
              href="/generate"
              className={`py-2 text-gray-600 hover:text-blue-500 transition-colors ${
                isActive('/generate') ? 'text-blue-500' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              이미지 생성
            </Link>
            <div className="flex flex-col space-y-2 py-2">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    로그인
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    회원가입
                  </button>
                </SignUpButton>
              </SignedOut>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 