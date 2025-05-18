import { Post } from '@/types';
import { StyleType } from '@/types/style';

export const mockPosts: Post[] = [
  {
    postId: '1',
    imageURL: 'https://picsum.photos/id/1/400/400',
    userName: 'user1',
    userProfile: 'https://picsum.photos/id/1/32/32',
    createdAt: '2024-03-20 14:30',
    prompt: '아름다운 바다 위의 일몰',
    styleOptions: {
      style: 'realistic',
      quality: 'high',
      aspectRatio: '1:1'
    },
    likes: 120,
    comments: 15,
    scraps: 8,
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '2',
    imageURL: 'https://picsum.photos/id/2/400/400',
    userName: 'user2',
    userProfile: 'https://picsum.photos/id/2/32/32',
    createdAt: '2024-03-20 15:00',
    prompt: '숲속의 마법 같은 오두막',
    styleOptions: {
      style: 'fantasy',
      quality: 'high',
      aspectRatio: '1:1'
    },
    likes: 85,
    comments: 12,
    scraps: 5,
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '3',
    imageURL: 'https://picsum.photos/id/3/400/400',
    userName: 'user3',
    userProfile: 'https://picsum.photos/id/3/32/32',
    createdAt: '2024-03-20 15:30',
    prompt: '미래 도시의 네온 사인',
    styleOptions: {
      style: 'cyberpunk',
      quality: 'high',
      aspectRatio: '1:1'
    },
    likes: 200,
    comments: 25,
    scraps: 15,
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '4',
    imageURL: 'https://picsum.photos/id/1035/400/300',
    userName: 'art_lover',
    userProfile: 'https://picsum.photos/id/1035/32/32',
    createdAt: '2024-03-20 16:00',
    prompt: '추상적인 기하학적 패턴',
    styleOptions: {
      style: 'abstract',
      quality: 'high',
      aspectRatio: '1:1'
    },
    likes: 156,
    comments: 12,
    scraps: 6,
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '5',
    imageURL: 'https://picsum.photos/id/1039/400/300',
    userName: 'design_master',
    userProfile: 'https://picsum.photos/id/1039/32/32',
    createdAt: '2024-03-20 16:30',
    prompt: '미니멀한 디자인 요소들',
    styleOptions: {
      style: 'minimal',
      quality: 'high',
      aspectRatio: '1:1'
    },
    likes: 342,
    comments: 45,
    scraps: 23,
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '6',
    imageURL: 'https://picsum.photos/id/1043/400/300',
    userName: 'pixel_perfect',
    userProfile: 'https://picsum.photos/id/1043/32/32',
    createdAt: '2024-03-20 17:00',
    prompt: '픽셀 아트 스타일의 캐릭터',
    styleOptions: {
      style: 'pixel-art',
      quality: 'high',
      aspectRatio: '1:1'
    },
    likes: 98,
    comments: 7,
    scraps: 4,
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '7',
    imageURL: 'https://picsum.photos/id/1047/400/300',
    userName: 'visual_creator',
    userProfile: 'https://picsum.photos/id/1047/32/32',
    createdAt: '2024-03-20 17:30',
    prompt: '수채화 스타일의 풍경화',
    styleOptions: {
      style: 'watercolor',
      quality: 'high',
      aspectRatio: '1:1'
    },
    likes: 267,
    comments: 33,
    scraps: 17,
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '8',
    imageURL: 'https://picsum.photos/id/1051/400/300',
    userName: 'art_innovator',
    userProfile: 'https://picsum.photos/id/1051/32/32',
    createdAt: '2024-03-20 18:00',
    prompt: '디지털 아트 스타일의 초상화',
    styleOptions: {
      style: 'digital-art',
      quality: 'high',
      aspectRatio: '1:1'
    },
    likes: 189,
    comments: 21,
    scraps: 9,
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '9',
    imageURL: 'https://picsum.photos/id/1055/400/300',
    userName: 'creative_mind',
    userProfile: 'https://picsum.photos/id/1055/32/32',
    createdAt: '2024-03-20 18:30',
    prompt: '3D 렌더링 스타일의 오브젝트',
    styleOptions: {
      style: '3d',
      quality: 'high',
      aspectRatio: '1:1'
    },
    likes: 145,
    comments: 18,
    scraps: 7,
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '10',
    imageURL: 'https://picsum.photos/id/1059/400/300',
    userName: 'digital_artist',
    userProfile: 'https://picsum.photos/id/1059/32/32',
    createdAt: '2024-03-20 19:00',
    prompt: '인상주의 스타일의 정물화',
    styleOptions: {
      style: 'impressionist',
      quality: 'high',
      aspectRatio: '1:1'
    },
    likes: 312,
    comments: 42,
    scraps: 19,
    isLiked: false,
    isScrapped: false
  }
];

export const styleOptions = {
  styles: [
    { id: 'realistic', name: '사실주의', description: '사실적인 이미지 스타일' },
    { id: 'cartoon', name: '만화풍', description: '만화 스타일의 이미지' },
    { id: 'watercolor', name: '수채화', description: '수채화 느낌의 이미지' },
    { id: 'oil', name: '유화', description: '유화 스타일의 이미지' },
  ],
  textures: [
    { id: 'smooth', name: '부드러운', description: '부드러운 텍스처' },
    { id: 'rough', name: '거친', description: '거친 텍스처' },
    { id: 'grainy', name: '그레인', description: '그레인 텍스처' },
  ],
  moods: [
    { id: 'bright', name: '밝은', description: '밝은 분위기' },
    { id: 'dark', name: '어두운', description: '어두운 분위기' },
    { id: 'warm', name: '따뜻한', description: '따뜻한 분위기' },
    { id: 'cold', name: '차가운', description: '차가운 분위기' },
  ],
};

export const mockGeneratedImage = {
  imageUrl: 'https://picsum.photos/800/800',
  generationId: 'mock-gen-123',
  status: 'success' as const,
};

export type StyleOption = typeof styleOptions;
export type GeneratedImage = typeof mockGeneratedImage;

export const mockGalleryImages = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    prompt: 'A serene landscape with mountains and a lake',
    createdAt: '2024-03-15T10:00:00Z',
    style: 'realistic',
    isPublic: true,
    tags: ['풍경', '자연', '산']
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    prompt: 'A futuristic cityscape at night',
    createdAt: '2024-03-14T15:30:00Z',
    style: 'cyberpunk',
    isPublic: false,
    tags: ['도시', '야경', '미래']
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    prompt: 'A cute cartoon character',
    createdAt: '2024-03-13T09:15:00Z',
    style: 'cartoon',
    isPublic: true,
    tags: ['캐릭터', '귀여움']
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    prompt: 'A realistic portrait of a person',
    createdAt: '2024-03-12T14:45:00Z',
    style: 'realistic',
    isPublic: true,
    tags: ['인물', '초상화']
  }
];

export const mockCommunityPosts = [
  {
    postId: '1',
    userId: 'user1',
    userName: 'Alice',
    userProfile: 'https://picsum.photos/50/50?random=1',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    prompt: 'Magical forest with glowing mushrooms and fairies',
    createdAt: '2024-03-15T11:20:00Z',
    likes: 156,
    comments: 23,
    scraps: 45,
    isLiked: false,
    isScrapped: false
  },
  {
    postId: '2',
    userId: 'user2',
    userName: 'Bob',
    userProfile: 'https://picsum.photos/50/50?random=2',
    imageUrl: 'https://picsum.photos/400/400?random=5',
    prompt: 'Underwater scene with bioluminescent creatures',
    createdAt: '2024-03-14T16:45:00Z',
    likes: 89,
    comments: 12,
    scraps: 34,
    isLiked: true,
    isScrapped: false
  },
  {
    postId: '3',
    userId: 'user3',
    userName: 'Charlie',
    userProfile: 'https://picsum.photos/50/50?random=3',
    imageUrl: 'https://picsum.photos/400/400?random=6',
    prompt: 'Steampunk airship flying through clouds',
    createdAt: '2024-03-13T14:30:00Z',
    likes: 234,
    comments: 45,
    scraps: 67,
    isLiked: false,
    isScrapped: true
  }
];

export const LOGO_STYLE_PREVIEWS: Record<StyleType, { image: string; description: string }> = {
  realistic: { image: '/mockups/realistic.jpg', description: '사실적인 이미지 스타일' },
  cartoon: { image: '/mockups/cartoon.jpg', description: '만화 스타일의 이미지' },
  watercolor: { image: '/mockups/watercolor.jpg', description: '수채화 느낌의 이미지' },
  oil: { image: '/mockups/oil.jpg', description: '유화 스타일의 이미지' },
  minimal: { image: '/mockups/minimal.jpg', description: '단순하고 깔끔한 디자인' },
  geometric: { image: '/mockups/geometric.jpg', description: '기하학적 도형을 활용한 디자인' },
  organic: { image: '/mockups/organic.jpg', description: '자연스러운 곡선과 흐름' },
  tech: { image: '/mockups/tech.jpg', description: '기술적이고 미래지향적인 디자인' },
  playful: { image: '/mockups/playful.jpg', description: '재미있고 활기찬 디자인' },
  corporate: { image: '/mockups/corporate.jpg', description: '전문적이고 신뢰감 있는 디자인' },
  artistic: { image: '/mockups/artistic.jpg', description: '예술적이고 창의적인 디자인' },
  abstract: { image: '/mockups/abstract.jpg', description: '추상적이고 현대적인 디자인' },
  'logo-minimal': { image: '/mockups/logo-minimal.svg', description: '단순하고 깔끔한 로고 디자인' },
  'logo-geometric': { image: '/mockups/logo-geometric.svg', description: '기하학적 도형을 활용한 로고' },
  'logo-organic': { image: '/mockups/logo-organic.svg', description: '자연스러운 곡선의 로고' },
  'logo-tech': { image: '/mockups/logo-tech.svg', description: '기술적이고 미래지향적인 로고' },
  'logo-playful': { image: '/mockups/logo-playful.svg', description: '재미있고 활기찬 로고' },
  'logo-corporate': { image: '/mockups/logo-corporate.svg', description: '전문적이고 신뢰감 있는 로고' },
  'logo-artistic': { image: '/mockups/logo-artistic.svg', description: '예술적이고 창의적인 로고' },
  'logo-abstract': { image: '/mockups/logo-abstract.svg', description: '추상적이고 현대적인 로고' }
}; 