import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Header from "@/components/Header";
import { AuthCheck } from '@/components/auth/AuthCheck';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Image Generator",
  description: "AI로 상상을 현실로 만드세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ko">
        <body className={inter.className}>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <AuthCheck />
        </body>
      </html>
    </ClerkProvider>
  );
}
