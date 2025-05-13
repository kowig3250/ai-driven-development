'use client';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
}

export function PromptInput({ prompt, onPromptChange }: PromptInputProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">이미지 생성</h1>
      <textarea
        className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="이미지를 생성할 프롬프트를 입력하세요 (최소 10자)"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        rows={4}
      />
      {prompt.length > 0 && prompt.length < 10 && (
        <p className="text-red-500">프롬프트는 최소 10자 이상이어야 합니다.</p>
      )}
    </div>
  );
} 