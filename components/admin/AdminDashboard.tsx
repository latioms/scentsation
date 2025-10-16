'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CreateProductForm from './CreateProductForm';
import CategoriesManager from './CategoriesManager';
import ProductsList from './ProductsList';
import { useRouter } from 'next/navigation';

type View = 'overview' | 'create-product' | 'create-category' | 'products';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<View>('overview');
  const router = useRouter();

  const handleLogout = async () => {
    // Supprimer le cookie de session
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold">Scentsation Admin</h1>
              <nav className="hidden md:flex gap-4">
                <button
                  onClick={() => setCurrentView('overview')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'overview'
                      ? 'bg-primary text-white'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  Aperçu
                </button>
                <button
                  onClick={() => setCurrentView('products')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'products'
                      ? 'bg-primary text-white'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  Produits
                </button>
              </nav>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Bienvenue</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Gérez vos produits et catégories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('create-product')}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Créer un produit</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Ajoutez un nouveau parfum à votre catalogue
                  </p>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('create-category')}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Gérer les catégories</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Organisez vos produits par catégories
                  </p>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('products')}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Voir les produits</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Consultez et modifiez vos produits existants
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {currentView === 'create-product' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setCurrentView('overview')}>
                ← Retour
              </Button>
              <h2 className="text-3xl font-bold">Créer un produit</h2>
            </div>
            <CreateProductForm onSuccess={() => setCurrentView('products')} />
          </div>
        )}

        {currentView === 'create-category' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setCurrentView('overview')}>
                ← Retour
              </Button>
              <h2 className="text-3xl font-bold">Gérer les catégories</h2>
            </div>
            <CategoriesManager />
          </div>
        )}

        {currentView === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setCurrentView('overview')}>
                  ← Retour
                </Button>
                <h2 className="text-3xl font-bold">Produits</h2>
              </div>
              <Button onClick={() => setCurrentView('create-product')}>
                + Nouveau produit
              </Button>
            </div>
            <ProductsList />
          </div>
        )}
      </main>
    </div>
  );
}
