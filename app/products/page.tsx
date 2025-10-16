import ProductsClient from '@/components/products-client';
import { getAllProducts } from '@/lib/products';

export default async function ProductsPage() {
  const products = await getAllProducts();

  return <ProductsClient products={products} />;
}
