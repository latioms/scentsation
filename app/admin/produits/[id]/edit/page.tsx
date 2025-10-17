import { isAdmin } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';
import { getProductById } from '@/lib/products';
import EditProductClient from '@/components/admin/EditProductClient';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    redirect('/admin/produits');
  }

  return (
    <div className="p-6">
      <EditProductClient product={product} />
    </div>
  );
}
