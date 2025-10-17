'use client';

import { useRouter } from 'next/navigation';
import EditProductForm from '@/components/admin/EditProductForm';
import { Product } from '@/types/product';

interface EditProductClientProps {
  product: Product;
}

export default function EditProductClient({ product }: EditProductClientProps) {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/admin/produits');
  };

  const handleCancel = () => {
    router.push('/admin/produits');
  };

  return (
    <EditProductForm
      product={product}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
