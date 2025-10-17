import { isAdmin } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';
import CategoriesManagerSimple from '@/components/admin/CategoriesManagerSimple';

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
