import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/adminAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default async function DashboardPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect('/admin/login');
  }

  return <AdminDashboard />;
}
