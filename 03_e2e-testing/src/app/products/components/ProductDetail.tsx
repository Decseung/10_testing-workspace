'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/data';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  function handleAddToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => router.back()}
        className="text-blue-600 hover:underline mb-6"
      >
        ← 뒤로 가기
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-2xl">상품 이미지</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-6">카테고리: {product.category}</p>
          <p className="text-3xl font-bold text-blue-600 mb-8">
            {product.price.toLocaleString()}원
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold"
          >
            장바구니 담기
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          장바구니에 추가되었습니다
        </div>
      )}
    </main>
  );
}
