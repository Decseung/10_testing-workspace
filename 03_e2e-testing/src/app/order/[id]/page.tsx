'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

export default function OrderCompletePage() {
  const params = useParams();
  const orderId = params.id;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
        <div className="text-green-600 text-6xl mb-6">✓</div>
        
        <h1 className="text-2xl font-bold mb-4">주문이 완료되었습니다</h1>
        
        <p className="text-gray-600 mb-2">주문번호</p>
        <p
          className="text-xl font-mono font-bold mb-6"
          data-testid="order-number"
        >
          #{orderId}
        </p>

        <p className="text-gray-600 mb-8">
          주문하신 상품은 빠르게 배송될 예정입니다.
        </p>

        <div className="space-y-3">
          <Link
            href="/products"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            쇼핑 계속하기
          </Link>
          <Link
            href="/"
            className="block w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
