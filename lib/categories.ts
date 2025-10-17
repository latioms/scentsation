import { databases } from './appwrite';
import { Query } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const CATEGORIES_COLLECTION_ID = 'categories'; // ID de la collection des catégories

export interface Category {
  $id: string;
  categoryname: string;
  $createdAt: string;
}

// Fonction pour récupérer toutes les catégories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      CATEGORIES_COLLECTION_ID,
      [Query.orderAsc('categoryname')] // Tri par ordre alphabétique
    );
    
    return response.documents as unknown as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fonction pour créer une nouvelle catégorie
export async function createCategory(categoryname: string): Promise<Category | null> {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      CATEGORIES_COLLECTION_ID,
      'unique()',
      { categoryname: categoryname.trim() }
    );
    
    return response as unknown as Category;
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
}

// Fonction pour mettre à jour une catégorie
export async function updateCategory(id: string, categoryname: string): Promise<Category | null> {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      CATEGORIES_COLLECTION_ID,
      id,
      { categoryname: categoryname.trim() }
    );
    
    return response as unknown as Category;
  } catch (error) {
    console.error('Error updating category:', error);
    return null;
  }
}

// Fonction pour supprimer une catégorie
export async function deleteCategory(id: string): Promise<boolean> {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      CATEGORIES_COLLECTION_ID,
      id
    );
    
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
}