import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          환영합니다
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Next.js E2E 테스트 실습을 위한 샘플 쇼핑몰입니다.
        </p>
        <div className="text-center">
          <Link
            href="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            쇼핑 시작하기
          </Link>
        </div>
      </main>
    </div>
  );
}
