'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }

  function updateQuantity(id: number, quantity: number) {
    const newCart = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  }

  function removeItem(id: number) {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">장바구니</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">장바구니가 비어있습니다</p>
            <Link
              href="/products"
              className="text-blue-600 hover:underline"
            >
              쇼핑 계속하기
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow divide-y">
              {cart.map((item) => (
                <div key={item.id} className="p-6 flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0"></div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.price.toLocaleString()}원</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label htmlFor={`quantity-${item.id}`} className="sr-only">
                      수량
                    </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded"
                      aria-label="수량"
                    />
                  </div>

                  <div className="text-right w-24">
                    <p className="font-bold">
                      {(item.price * item.quantity).toLocaleString()}원
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800 px-2"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">총 금액:</span>
                <span
                  className="text-2xl font-bold text-blue-600"
                  data-testid="total-price"
                >
                  {totalPrice.toLocaleString()}원
                </span>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold"
              >
                구매하기
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
