import { Post } from '@/types';

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