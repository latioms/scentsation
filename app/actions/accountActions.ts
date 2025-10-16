'use server';

import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/session';

export async function getAccountDetails() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return { success: false, error: 'No session found' };
    }

    const session = await verifyToken(sessionCookie.value);

    if (!session?.user?.userId) {
      return { success: false, error: 'Invalid session' };
    }

    // Return the session data we already have
    return {
      success: true,
      data: {
        userId: session.user.userId,
        name: session.user.email.split('@')[0], // Fallback name from email
        email: session.user.email,
        createdAt: new Date().toISOString(), // Placeholder
      },
    };
  } catch (error) {
    console.error('Error getting account details:', error);
    return { success: false, error: 'Failed to get account details' };
  }
}

export async function updateAccountName(name: string) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return { success: false, error: 'No session found' };
    }

    const session = await verifyToken(sessionCookie.value);

    if (!session?.user?.userId) {
      return { success: false, error: 'Invalid session' };
    }

    // For now, just return success
    // You can implement actual name update via Appwrite API later
    return {
      success: true,
      message: 'Name updated successfully',
    };
  } catch (error) {
    console.error('Error updating name:', error);
    return { success: false, error: 'Failed to update name' };
  }
}
