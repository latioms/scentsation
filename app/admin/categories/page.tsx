import { isAdmin } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';
import CategoriesManager from '@/components/admin/CategoriesManager';

export default async function CategoriesPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="p-6">
      <CategoriesManager />
    </div>
  );
}
