'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { databases } from '@/lib/appwrite';

// Définir directement l'interface Category
interface Category {
  $id: string;
  categoryname: string;
  $createdAt: string;
}

export default function CategoriesManagerSimple() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form states
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Variables d'environnement
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const categoriesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID || 'categories';

  // Charger les catégories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      
      if (!databaseId || !categoriesCollectionId) {
        console.error('Missing environment variables:', { databaseId: !!databaseId, categoriesCollectionId: !!categoriesCollectionId });
        setError('Configuration incorrecte');
        return;
      }
      
      console.log('Loading categories with:', { databaseId, categoriesCollectionId });
      
      const response = await databases.listDocuments(
        databaseId,
        categoriesCollectionId,
      );
      
      if (!response || !response.documents) {
        console.error('Invalid response:', response);
        setError('Réponse invalide');
        return;
      }
      
      const cats = response.documents as unknown as Category[];
      setCategories(cats);
      setError('');
    } catch (err) {
      console.error('Erreur chargement catégories:', err);
      setError('Impossible de charger les catégories');
    } finally {
      setLoading(false);
    }
  };

  // Ajouter une catégorie
  const handleAdd = async () => {
    if (!newCategoryName.trim()) {
      setError('Le nom de la catégorie est requis');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      if (!databaseId || !categoriesCollectionId) {
        setError('Configuration incorrecte');
        return;
      }
      
      const response = await databases.createDocument(
        databaseId,
        categoriesCollectionId,
        'unique()',
        { categoryname: newCategoryName.trim() }
      );
      
      if (response) {
        setSuccess('Catégorie ajoutée avec succès !');
        setNewCategoryName('');
        setIsAdding(false);
        await loadCategories();
        
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Erreur lors de l\'ajout de la catégorie');
      }
    } catch (err) {
      console.error('Erreur ajout:', err);
      setError('Erreur lors de l\'ajout de la catégorie');
    } finally {
      setSubmitting(false);
    }
  };

  // Modifier une catégorie
  const handleEdit = async (id: string) => {
    if (!editingName.trim()) {
      setError('Le nom de la catégorie est requis');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      if (!databaseId || !categoriesCollectionId) {
        setError('Configuration incorrecte');
        return;
      }
      
      const response = await databases.updateDocument(
        databaseId,
        categoriesCollectionId,
        id,
        { categoryname: editingName.trim() }
      );
      
      if (response) {
        setSuccess('Catégorie modifiée avec succès !');
        setEditingId(null);
        setEditingName('');
        await loadCategories();
        
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Erreur lors de la modification');
      }
    } catch (err) {
      console.error('Erreur modification:', err);
      setError('Erreur lors de la modification');
    } finally {
      setSubmitting(false);
    }
  };

  // Supprimer une catégorie
  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      if (!databaseId || !categoriesCollectionId) {
        setError('Configuration incorrecte');
        return;
      }
      
      await databases.deleteDocument(
        databaseId,
        categoriesCollectionId,
        id
      );
      
      setSuccess('Catégorie supprimée avec succès !');
      await loadCategories();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Erreur suppression:', err);
      setError('Erreur lors de la suppression. Vérifiez qu\'aucun produit n\'utilise cette catégorie.');
    } finally {
      setSubmitting(false);
    }
  };

  // Commencer l'édition
  const startEdit = (category: Category) => {
    setEditingId(category.$id);
    setEditingName(category.categoryname);
    setIsAdding(false);
  };

  // Annuler l'édition
  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  // Annuler l'ajout
  const cancelAdd = () => {
    setIsAdding(false);
    setNewCategoryName('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Catégories</h2>
          <p className="text-gray-500 text-sm mt-1">
            {categories.length} catégorie{categories.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle catégorie
          </Button>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Formulaire d'ajout */}
      {isAdding && (
        <Card className="p-4 border-2 border-pink-200 bg-pink-50/50">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Nom de la catégorie..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              autoFocus
              disabled={submitting}
            />
            <Button
              onClick={handleAdd}
              disabled={submitting || !newCategoryName.trim()}
              className="bg-green-500 hover:bg-green-600"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              onClick={cancelAdd}
              disabled={submitting}
              variant="outline"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Liste des catégories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card
            key={category.$id}
            className="p-4 hover:shadow-md transition-shadow"
          >
            {editingId === category.$id ? (
              // Mode édition
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEdit(category.$id)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  autoFocus
                  disabled={submitting}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(category.$id)}
                    disabled={submitting || !editingName.trim()}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                    size="sm"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Valider
                  </Button>
                  <Button
                    onClick={cancelEdit}
                    disabled={submitting}
                    variant="outline"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              // Mode affichage
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">
                    {category.categoryname}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(category.$createdAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                
                <div className="flex gap-2 ml-3">
                  <Button
                    onClick={() => startEdit(category)}
                    variant="outline"
                    size="sm"
                    disabled={submitting}
                    className="hover:bg-blue-50"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(category.$id)}
                    variant="outline"
                    size="sm"
                    disabled={submitting}
                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* État vide */}
      {categories.length === 0 && !isAdding && (
        <Card className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Plus className="w-16 h-16 mx-auto opacity-20" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Aucune catégorie
          </h3>
          <p className="text-gray-500 mb-4">
            Commencez par créer votre première catégorie
          </p>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Créer une catégorie
          </Button>
        </Card>
      )}
    </div>
  );
}