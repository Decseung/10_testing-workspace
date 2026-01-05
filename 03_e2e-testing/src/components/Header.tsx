
import Link from 'next/link';

export default function Header() {

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
            E2E Test Shop
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              href="/products" 
              className={`hover:text-blue-600 text-gray-700`}
            >
              상품 보기
            </Link>
            
            <Link 
              href="/contact" 
              className={`hover:text-blue-600 text-gray-700`}
            >
              문의
            </Link>

            <Link 
              href="/cart" 
              className={`relative hover:text-blue-600 text-gray-700`}
            >
              장바구니
            </Link>

            <Link 
              href="/login" 
              className={`hover:text-blue-600 text-gray-700`}
            >
              로그인
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
