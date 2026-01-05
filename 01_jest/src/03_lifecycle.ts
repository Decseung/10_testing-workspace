// 상품 정보 타입
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

// 장바구니 아이템 타입
export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

// ============================================
// 1. LocalStorage 관련 함수들
// ============================================

/**
 * localStorage에 장바구니 저장
 */
export function saveCartToLocalStorage(cart: CartItem[]): void {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * localStorage에서 장바구니 가져오기
 */
export function getCartFromLocalStorage(): CartItem[] {
  const cartStr = localStorage.getItem("cart");
  return cartStr ? JSON.parse(cartStr) : [];
}

/**
 * localStorage 장바구니 초기화
 */
export function clearCartFromLocalStorage(): void {
  localStorage.removeItem("cart");
}

// ============================================
// 2. 장바구니 관리 함수들 (localStorage 기반)
// ============================================

/**
 * 장바구니에 상품 추가
 */
export function addToCart(product: Product, quantity: number = 1): CartItem[] {
  const cart = getCartFromLocalStorage();

  const existingItem = cart.find((item) => item.productId === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity,
    });
  }

  saveCartToLocalStorage(cart);
  return cart;
}

/**
 * 장바구니에서 상품 제거
 */
export function removeFromCart(productId: number): CartItem[] {
  const cart = getCartFromLocalStorage();
  const updatedCart = cart.filter((item) => item.productId !== productId);
  saveCartToLocalStorage(updatedCart);
  return updatedCart;
}

/**
 * 장바구니 총 금액 계산
 */
export function calculateCartTotal(): number {
  const cart = getCartFromLocalStorage();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * 장바구니 상품 개수
 */
export function getCartItemCount(): number {
  const cart = getCartFromLocalStorage();
  return cart.reduce((count, item) => count + item.quantity, 0);
}
