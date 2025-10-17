import { isAdmin } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';
import CategoriesManagerSimple from '@/components/admin/CategoriesManagerSimple';

// Forcer le rendu dynamique car cette page utilise des cookies pour l'authentification
export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="p-6">
      <CategoriesManagerSimple />
    </div>
  );
}
