import { isAdmin } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';
import { getProductById } from '@/lib/products';
import EditProductClient from '@/components/admin/EditProductClient';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect('/admin/login');
  }

  const product = await getProductById(params.id);

  if (!product) {
    redirect('/admin/produits');
  }

  return (
    <div className="p-6">
      <EditProductClient product={product} />
    </div>
  );
}
