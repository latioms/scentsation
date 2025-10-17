import { isAdmin } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';
import ProductsListSimple from '@/components/admin/ProductsListSimple';

// Forcer le rendu dynamique car cette page utilise des cookies pour l'authentification
export const dynamic = 'force-dynamic';

export default async function ProduitsPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Produits</h1>
      <ProductsListSimple />
    </div>
  );
}
