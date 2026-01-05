import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { getProduct } from '@/lib/data';
import ProductDetail from '../components/ProductDetail';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = await getProduct(Number((await params).id));

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductDetail product={product} />
    </div>
  );
}
