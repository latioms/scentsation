import { getSession } from './session';

export async function isAdmin(): Promise<boolean> {
  try {
    const session = await getSession();
    
    if (!session || !session.user) {
      return false;
    }

    const adminEmail = process.env.ADMIN_EMAIL_ID;
    
    return session.user.email === adminEmail;
  } catch (error) {
    console.error('Admin check error:', error);
    return false;
  }
}

export async function requireAdmin() {
  const admin = await isAdmin();
  
  if (!admin) {
    throw new Error('Accès non autorisé');
  }
  
  return true;
}
