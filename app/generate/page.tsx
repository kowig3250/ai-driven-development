'use client';

import { useState } from 'react';
import { mockGeneratedImage } from '@/lib/mock-data';
import { PromptInput } from '@/components/generate/prompt-input';
import { StyleOptions } from '@/components/generate/style-options';
import { GenerateButton } from '@/components/generate/generate-button';
import { GeneratedImagePreview } from '@/components/generate/generated-image-preview';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<typeof mockGeneratedImage | null>(null);

  const handleGenerate = async () => {
    if (prompt.length < 10) return;
    
    setIsGenerating(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedImage(mockGeneratedImage);
    setIsGenerating(false);
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        <PromptInput
          prompt={prompt}
          onPromptChange={setPrompt}
        />

        <StyleOptions
          selectedStyle={selectedStyle}
          selectedColor={selectedColor}
          onStyleChange={setSelectedStyle}
          onColorChange={setSelectedColor}
        />

        <GenerateButton
          prompt={prompt}
          isGenerating={isGenerating}
          onClick={handleGenerate}
        />

        {generatedImage && (
          <GeneratedImagePreview
            generatedImage={generatedImage}
          />
        )}
      </div>
    </main>
  );
} 