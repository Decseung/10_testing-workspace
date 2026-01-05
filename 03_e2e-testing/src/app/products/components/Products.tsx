'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/data';

interface ProductsProps {
  initialProducts: Product[];
  initialSearch: string;
}

export default function Products({ initialProducts, initialSearch }: ProductsProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [isPending, startTransition] = useTransition();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    
    startTransition(() => {
      // URL 변경으로 서버 컴포넌트 리렌더링
      router.push(`/products${search ? `?search=${search}` : ''}`);
    });
  }

  return (
    <>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="상품 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isPending ? '검색중...' : '검색'}
          </button>
        </div>
      </form>

      {isPending ? (
        <div className="text-center py-12">
          <p className="text-gray-600">로딩중...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {initialProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => (window.location.href = `/products/${product.id}`)}
            >
              <div className="aspect-square bg-gray-200 rounded-t-lg flex items-center justify-center">
                <span className="text-gray-400">이미지</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <p className="text-lg font-bold text-blue-600">
                  {product.price.toLocaleString()}원
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {!isPending && initialProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">검색 결과가 없습니다.</p>
        </div>
      )}
    </>
  );
}
