import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/adminAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';

// Forcer le rendu dynamique car cette page utilise des cookies pour l'authentification
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect('/admin/login');
  }

  return <AdminDashboard />;
}
