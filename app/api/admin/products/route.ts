import { NextRequest, NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';
import { requireAdmin } from '@/lib/adminAuth';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const PRODUCTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!;

// GET - Récupérer tous les produits
export async function GET() {
  try {
    await requireAdmin();

    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      [Query.orderDesc('$createdAt'), Query.limit(100)]
    );

    return NextResponse.json(response.documents);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des produits' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau produit
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const data = await request.json();

    // Créer le produit avec tous les attributs disponibles dans Appwrite
    const productData = {
      titre: data.titre,
      marque: data.marque,
      description: data.description,
      sexe: data.sexe,
      contenance: data.contenance,
      prix: data.prix,
      categorie: data.categorie,
      thumbnail: data.thumbnail,
      images: data.images || [],
      likes: data.likes || 0,
      inStock: data.inStock !== undefined ? data.inStock : true,
      isNew: data.isNew || false,
      isBestSeller: data.isBestSeller || false,
    };

    const product = await databases.createDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      ID.unique(),
      productData
    );

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du produit' },
      { status: 500 }
    );
  }
}
