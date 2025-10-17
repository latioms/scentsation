'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { getAllProducts, deleteProduct } from '@/lib/products';

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    try {
      const success = await deleteProduct(id);

      if (success) {
        setProducts(products.filter(p => p.$id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Aucun produit</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          Commencez par créer votre premier produit
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.$id} className="overflow-hidden group hover:shadow-lg transition-shadow">
          <div className="aspect-square relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.titre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            {product.isNew && (
              <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-semibold rounded">
                Nouveau
              </span>
            )}
            {product.isBestSeller && (
              <span className="absolute top-2 right-2 px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded">
                Best Seller
              </span>
            )}
          </div>
          
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{product.titre}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{product.marque}</p>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">{product.categorie}</span>
              <span className="font-semibold text-primary">{product.prix.toLocaleString()} XAF</span>
            </div>
            
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">
                {product.sexe}
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">
                {product.contenance}
              </span>
              <span className={`px-2 py-1 rounded ${
                product.inStock 
                  ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300' 
                  : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
              }`}>
                {product.inStock ? 'En stock' : 'Rupture'}
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1">
                Modifier
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDelete(product.$id)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
