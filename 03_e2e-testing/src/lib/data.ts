export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  { id: 1, name: '무선 키보드', price: 59000, category: '키보드', image: '/placeholder.jpg', description: '편안한 타이핑을 위한 무선 키보드' },
  { id: 2, name: '게이밍 마우스', price: 79000, category: '마우스', image: '/placeholder.jpg', description: '정밀한 센서의 게이밍 마우스' },
  { id: 3, name: '노트북 스탠드', price: 35000, category: '액세서리', image: '/placeholder.jpg', description: '각도 조절 가능한 노트북 스탠드' },
  { id: 4, name: 'USB-C 허브', price: 45000, category: '액세서리', image: '/placeholder.jpg', description: '다기능 USB-C 허브' },
  { id: 5, name: '기계식 키보드', price: 129000, category: '키보드', image: '/placeholder.jpg', description: '청축 기계식 키보드' },
  { id: 6, name: '무선 마우스', price: 39000, category: '마우스', image: '/placeholder.jpg', description: '저소음 무선 마우스' },
  { id: 7, name: '모니터 암', price: 65000, category: '액세서리', image: '/placeholder.jpg', description: '높이 조절 모니터 암' },
  { id: 8, name: 'USB 웹캠', price: 85000, category: '액세서리', image: '/placeholder.jpg', description: 'Full HD 웹캠' },
  { id: 9, name: '블루투스 키보드', price: 69000, category: '키보드', image: '/placeholder.jpg', description: '멀티 디바이스 블루투스 키보드' },
  { id: 10, name: '트랙볼 마우스', price: 95000, category: '마우스', image: '/placeholder.jpg', description: '손목 편한 트랙볼 마우스' },
  { id: 11, name: '마우스 패드', price: 25000, category: '액세서리', image: '/placeholder.jpg', description: '대형 게이밍 마우스 패드' },
  { id: 12, name: 'HDMI 케이블', price: 15000, category: '액세서리', image: '/placeholder.jpg', description: '4K 지원 HDMI 케이블' },
];

export async function getProducts(search?: string): Promise<Product[]> {
  // API 호출 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (search) {
    return products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return products;
}

export async function getProduct(id: number): Promise<Product | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return products.find(p => p.id === id);
}
