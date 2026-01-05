import Header from "@/components/Header";
import { getProducts } from "@/lib/data";
import Products from "./components/Products";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const search = (await searchParams).search;
  const products = await getProducts(search);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Products initialProducts={products} initialSearch={search || ""} />
      </main>
    </div>
  );
}
