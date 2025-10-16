import { NextRequest, NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite';
import { requireAdmin } from '@/lib/adminAuth';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const PRODUCTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!;

// DELETE - Supprimer un produit
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await requireAdmin();

    await databases.deleteDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      params.id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du produit' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un produit
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await requireAdmin();

    const data = await request.json();

    const product = await databases.updateDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      params.id,
      data
    );

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du produit' },
      { status: 500 }
    );
  }
}
