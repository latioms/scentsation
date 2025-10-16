'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Product, Sexe, Categorie } from '@/types/product';
import ImageUploader from './ImageUploader';
import MultiImageUploader from './MultiImageUploader';
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';

interface CreateProductFormProps {
  onSuccess?: () => void;
}

interface Category {
  $id: string;
  categoryname: string;
}

export default function CreateProductForm({ onSuccess }: CreateProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const [formData, setFormData] = useState({
    titre: '',
    marque: '',
    description: '',
    sexe: 'Mixte' as Sexe,
    contenance: '50',
    prix: '',
    categorie: '' as string, // Changé pour accepter n'importe quelle string
    thumbnail: '',
    images: [] as string[],
    inStock: true,
    isNew: false,
    isBestSeller: false,
  });

  // Charger les catégories au montage du composant
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'categories',
        [Query.orderAsc('categoryname')] // Ordre alphabétique
      );
      const cats = response.documents as unknown as Category[];
      setCategories(cats);
      
      // Si aucune catégorie n'est sélectionnée, sélectionner la première
      if (cats.length > 0 && !formData.categorie) {
        setFormData(prev => ({ ...prev, categorie: cats[0].categoryname }));
      }
    } catch (err) {
      console.error('Erreur chargement catégories:', err);
      setMessage({ type: 'error', text: 'Impossible de charger les catégories' });
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Vérifier que l'image principale est uploadée
      if (!formData.thumbnail) {
        setMessage({ type: 'error', text: 'Veuillez uploader une image principale' });
        setLoading(false);
        return;
      }

      // Vérifier qu'une catégorie est sélectionnée
      if (!formData.categorie) {
        setMessage({ type: 'error', text: 'Veuillez sélectionner une catégorie' });
        setLoading(false);
        return;
      }

      // Créer l'objet produit avec tous les attributs
      const product = {
        titre: formData.titre,
        marque: formData.marque,
        description: formData.description,
        sexe: formData.sexe,
        contenance: formData.contenance + 'ml', // Ajouter "ml" automatiquement
        prix: parseFloat(formData.prix),
        categorie: formData.categorie,
        thumbnail: formData.thumbnail,
        images: formData.images,
        likes: 0,
        inStock: formData.inStock,
        isNew: formData.isNew,
        isBestSeller: formData.isBestSeller,
      };

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Produit créé avec succès!' });
        // Réinitialiser le formulaire
        setFormData({
          titre: '',
          marque: '',
          description: '',
          sexe: 'Mixte',
          contenance: '50',
          prix: '',
          categorie: categories.length > 0 ? categories[0].categoryname : '',
          thumbnail: '',
          images: [],
          inStock: true,
          isNew: false,
          isBestSeller: false,
        });
        
        setTimeout(() => {
          onSuccess?.();
        }, 1500);
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la création du produit' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la création du produit' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 sm:p-6 max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Titre */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Titre *</label>
            <input
              type="text"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: Sauvage"
              required
            />
          </div>

          {/* Marque */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Marque *</label>
            <input
              type="text"
              value={formData.marque}
              onChange={(e) => setFormData({ ...formData, marque: e.target.value })}
              className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: Dior"
              required
            />
          </div>

          {/* Sexe */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sexe *</label>
            <select
              value={formData.sexe}
              onChange={(e) => setFormData({ ...formData, sexe: e.target.value as Sexe })}
              className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Mixte">Mixte</option>
            </select>
          </div>

          {/* Catégorie */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Catégorie *</label>
            {loadingCategories ? (
              <div className="w-full px-4 py-2 rounded-md border bg-background text-gray-500">
                Chargement des catégories...
              </div>
            ) : categories.length === 0 ? (
              <div className="w-full px-4 py-2 rounded-md border bg-red-50 text-red-600 text-sm">
                Aucune catégorie disponible. Veuillez d'abord créer des catégories.
              </div>
            ) : (
              <select
                value={formData.categorie}
                onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.$id} value={cat.categoryname}>
                    {cat.categoryname}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Contenance */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Contenance (ml) *</label>
            <input
              type="number"
              value={formData.contenance}
              onChange={(e) => {
                const value = e.target.value;
                // Ne garder que les chiffres positifs
                if (value === '' || parseInt(value) > 0) {
                  setFormData({ ...formData, contenance: value });
                }
              }}
              className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: 50, 100"
              min="1"
              required
            />
          </div>

          {/* Prix */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Prix (XAF) *</label>
            <input
              type="number"
              value={formData.prix}
              onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
              className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: 25000"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
            placeholder="Description du produit..."
            required
          />
        </div>

        {/* Upload Image Principale */}
        <ImageUploader
          label="Image principale"
          required
          currentImage={formData.thumbnail}
          onImageUploaded={(url) => setFormData({ ...formData, thumbnail: url })}
        />

        {/* Upload thumbnails Additionnelles */}
        <MultiImageUploader
          currentImages={formData.images}
          onImagesUploaded={(urls) => setFormData({ ...formData, images: urls })}
          maxImages={4}
        />

        {/* Options */}
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">En stock</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isNew}
              onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
              className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Nouveau</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isBestSeller}
              onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
              className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Best Seller</span>
          </label>
        </div>

        {message && (
          <div className={`p-4 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200' 
              : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Création...' : 'Créer le produit'}
          </Button>
          <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
            Annuler
          </Button>
        </div>
      </form>
    </Card>
  );
}
