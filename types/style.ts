export type ColorTone = 
  | 'bright'    // 밝은
  | 'dark'      // 어두운
  | 'warm'      // 따뜻한
  | 'cold'      // 차가운
  | 'monochrome' // 단색
  | 'gradient'  // 그라데이션
  | 'pastel'    // 파스텔톤
  | 'vibrant'   // 선명한
  | 'muted'     // 차분한
  | 'metallic'; // 금속성

export type StyleType =
  | 'realistic'
  | 'cartoon'
  | 'watercolor'
  | 'oil'
  | 'minimal'
  | 'geometric'
  | 'organic'
  | 'tech'
  | 'playful'
  | 'corporate'
  | 'artistic'
  | 'abstract'
  | 'logo-minimal'
  | 'logo-geometric'
  | 'logo-organic'
  | 'logo-tech'
  | 'logo-playful'
  | 'logo-corporate'
  | 'logo-artistic'
  | 'logo-abstract';

export interface Style {
  type: StyleType;
  name: string;
  description: string;
  prompt: string;
  category: 'image' | 'logo';
}

export const STYLES: Style[] = [
  {
    type: 'realistic',
    name: '사실주의',
    description: '사실적인 이미지 스타일',
    prompt: 'photorealistic, highly detailed, natural lighting, professional photography',
    category: 'image'
  },
  {
    type: 'cartoon',
    name: '만화풍',
    description: '만화 스타일의 이미지',
    prompt: 'cartoon style, vibrant colors, bold outlines, comic book art',
    category: 'image'
  },
  {
    type: 'watercolor',
    name: '수채화',
    description: '수채화 느낌의 이미지',
    prompt: 'watercolor painting, soft colors, flowing textures, artistic',
    category: 'image'
  },
  {
    type: 'oil',
    name: '유화',
    description: '유화 스타일의 이미지',
    prompt: 'oil painting, rich textures, classical art style, detailed brushstrokes',
    category: 'image'
  },
  {
    type: 'minimal',
    name: '미니멀',
    description: '단순하고 깔끔한 디자인',
    prompt: 'minimalist design, clean lines, simple shapes, modern',
    category: 'image'
  },
  {
    type: 'geometric',
    name: '기하학적',
    description: '기하학적 도형을 활용한 디자인',
    prompt: 'geometric shapes, precise lines, mathematical patterns, structured',
    category: 'image'
  },
  {
    type: 'organic',
    name: '유기적',
    description: '자연스러운 곡선과 흐름',
    prompt: 'organic shapes, flowing lines, natural curves, fluid design',
    category: 'image'
  },
  {
    type: 'tech',
    name: '테크니컬',
    description: '기술적이고 미래지향적인 디자인',
    prompt: 'technical design, futuristic elements, digital aesthetics, modern tech',
    category: 'image'
  },
  {
    type: 'playful',
    name: '플레이풀',
    description: '재미있고 활기찬 디자인',
    prompt: 'playful design, fun elements, vibrant colors, dynamic composition',
    category: 'image'
  },
  {
    type: 'corporate',
    name: '기업용',
    description: '전문적이고 신뢰감 있는 디자인',
    prompt: 'corporate design, professional look, trustworthy appearance, business style',
    category: 'image'
  },
  {
    type: 'artistic',
    name: '아트',
    description: '예술적이고 창의적인 디자인',
    prompt: 'artistic design, creative elements, unique style, expressive',
    category: 'image'
  },
  {
    type: 'abstract',
    name: '추상',
    description: '추상적이고 현대적인 디자인',
    prompt: 'abstract design, modern art, conceptual elements, contemporary',
    category: 'image'
  },
  // 로고 스타일
  {
    type: 'logo-minimal',
    name: '미니멀 로고',
    description: '단순하고 깔끔한 로고 디자인',
    prompt: 'minimalist logo design, simple and clean, monochrome, professional',
    category: 'logo'
  },
  {
    type: 'logo-geometric',
    name: '기하학적 로고',
    description: '기하학적 도형을 활용한 로고',
    prompt: 'geometric logo design, shapes and patterns, modern, structured',
    category: 'logo'
  },
  {
    type: 'logo-organic',
    name: '유기적 로고',
    description: '자연스러운 곡선의 로고',
    prompt: 'organic logo design, flowing curves, natural shapes, fluid',
    category: 'logo'
  },
  {
    type: 'logo-tech',
    name: '테크니컬 로고',
    description: '기술적이고 미래지향적인 로고',
    prompt: 'technical logo design, futuristic, digital, high-tech',
    category: 'logo'
  },
  {
    type: 'logo-playful',
    name: '플레이풀 로고',
    description: '재미있고 활기찬 로고',
    prompt: 'playful logo design, fun, vibrant, energetic, cartoon style',
    category: 'logo'
  },
  {
    type: 'logo-corporate',
    name: '기업용 로고',
    description: '전문적이고 신뢰감 있는 로고',
    prompt: 'corporate logo design, professional, trustworthy, business',
    category: 'logo'
  },
  {
    type: 'logo-artistic',
    name: '아트 로고',
    description: '예술적이고 창의적인 로고',
    prompt: 'artistic logo design, creative, hand-drawn, unique',
    category: 'logo'
  },
  {
    type: 'logo-abstract',
    name: '추상 로고',
    description: '추상적이고 현대적인 로고',
    prompt: 'abstract logo design, modern, conceptual, unique',
    category: 'logo'
  }
]; 