// 사용자 정보 타입
export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
}

// 상품 정보 타입
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string[];
  stock: number;
}

/**
 * 1. 사용자 생성 함수
 * @param name 사용자 이름
 * @param email 사용자 이메일
 * @param age 사용자 나이
 * @returns 생성된 User 타입의 객체
 */
export function createUser(name: string, email: string, age?: number): User {
  return {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
    age,
    isActive: true,
  };
}

/**
 * 2. 사용자 이메일 검증 함수
 * @param email 검증할 이메일 주소
 * @returns 이메일 주소가 유효한지 여부
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 주소의 일반적인 형식(문자@문자.문자)을 검사하는 정규식
  return emailRegex.test(email);
}

/**
 * 3. 할인가격 계산 함수
 * @param price 할인 전 가격
 * @param discountRate 할인율 (0~100)
 * @returns 할인 적용 가격
 */
export function calculateDiscountPrice(
  price: number,
  discountRate: number
): number {
  if (discountRate < 0 || discountRate > 100) {
    throw new Error("할인값은 0 ~ 100 사이여야 한다.");
  }
  return price * (1 - discountRate / 100);
}

/**
 * 4. 상품 필터링 함수
 * @param products 필터링할 상품 원본 배열
 * @param category 필터링할 카테고리
 * @returns 필터링된 특정 카테고리의 상품 배열 (새로운 참조값을 가지는 배열)
 */
export function filterProductsByCategory(
  products: Product[],
  category: string
): Product[] {
  return products.filter((product) => product.category === category);
}

/**
 * 5. 장바구니 총 금액 계산 함수
 * @param products 장바구니 상품 배열
 * @returns 장바구니 총 금액
 */
export function calculateTotalPrice(products: Product[]): number {
  return products.reduce((total, product) => total + product.price, 0);
}

/**
 * 6. 상품 검색 함수
 * @param products 검색할 상품 원본 배열
 * @param keyword 검색할 키워드
 * @returns 키워드가 포함된 상품 배열 (새로운 참조값을 가지는 배열)
 */
export function searchProducts(
  products: Product[],
  keyword: string
): Product[] {
  return products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
}

/**
 * 7. 재고 확인 함수
 * @param product 재고 확인할 상품
 * @param quantity 재고 확인할 수량
 * @returns 재고 확인 결과
 */
export function checkStock(product: Product, quantity: number): boolean {
  return product.stock >= quantity;
}

/**
 * 8. 사용자 나이 카테고리 반환 함수
 * @param age 사용자 나이
 * @returns 사용자 나이 카테고리
 */
export function getAgeCategory(age: number): string | null {
  if (age < 0) return null;
  if (age < 13) return "어린이";
  if (age < 20) return "청소년";
  if (age < 65) return "성인";
  return "노인";
}

/**
 * 9. 가격 범위 필터링 함수
 * @param products 필터링할 상품 원본 배열
 * @param minPrice 최소 가격
 * @param maxPrice 최대 가격
 * @returns 가격 범위 내의 상품 배열 (새로운 참조값을 가지는 배열)
 */
export function filterByPriceRange(
  products: Product[],
  minPrice: number,
  maxPrice: number
): Product[] {
  return products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
}

/**
 * 10. 평균 가격 계산 함수
 * @param products 평균 가격 계산할 상품 원본 배열
 * @returns 평균 가격
 */
export function calculateAveragePrice(products: Product[]): number {
  const total = products.reduce((sum, product) => sum + product.price, 0);
  return total / products.length;
}
