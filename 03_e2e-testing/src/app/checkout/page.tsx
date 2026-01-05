'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedCart.length === 0) {
      router.push('/cart');
    }
    setCart(savedCart);
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // 결제 처리 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 주문 번호 생성
    const orderId = Math.floor(Math.random() * 1000000);

    // 장바구니 비우기
    localStorage.removeItem('cart');

    // 주문 완료 페이지로 이동
    router.push(`/order/${orderId}`);
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Header />
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">주문/결제</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 배송 정보 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">배송 정보</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  받는 사람
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  연락처
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="010-1234-5678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  주소
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 결제 정보 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">결제 정보</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                  카드 번호
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  required
                  placeholder="1234-5678-9012-3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium mb-2">
                    만료일
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    required
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    required
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 주문 요약 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">주문 요약</h2>
            
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{(item.price * item.quantity).toLocaleString()}원</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">총 결제금액:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 text-lg font-semibold disabled:bg-gray-400"
          >
            {loading ? '결제 처리중...' : '결제하기'}
          </button>
        </form>
      </div>
    </div>
  );
}
