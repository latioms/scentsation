'use client';

import { Card } from '@/components/ui/card';
import { Categorie } from '@/types/product';

export default function CreateCategoryForm() {
  const categories: Categorie[] = ['Parfums', 'Huiles de Parfum', 'Déodorants'];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Catégories disponibles</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          Les catégories suivantes sont actuellement définies dans votre système.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category}
              className="p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <span className="font-medium">{category}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-neutral-50 dark:bg-neutral-900 border-dashed">
        <div className="text-center space-y-2">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            💡 Les catégories sont définies dans le système de types
          </p>
          <p className="text-xs text-neutral-500">
            Pour ajouter de nouvelles catégories, modifiez le fichier <code className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 rounded">types/product.ts</code>
          </p>
        </div>
      </Card>
    </div>
  );
}
