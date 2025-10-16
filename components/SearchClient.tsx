'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { databases } from '@/lib/appwrite';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { Query } from 'appwrite';

export default function SearchClient() {
	const [searchQuery, setSearchQuery] = useState('');
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchQuery.trim()) {
				searchProducts(searchQuery);
			} else {
				setProducts([]);
				setHasSearched(false);
			}
		}, 300); // Debounce de 300ms

		return () => clearTimeout(delayDebounceFn);
	}, [searchQuery]);

	const searchProducts = async (query: string) => {
		setLoading(true);
		setHasSearched(true);

		try {
			const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
			const collectionId = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID as string;

			// Récupérer tous les produits (avec pagination si nécessaire)
			const allProductsResponse = await databases.listDocuments(
				databaseId,
				collectionId,
				[Query.limit(100)]
			);

			// Filtrer localement par titre ou marque
			const searchLower = query.toLowerCase();
			const filtered = allProductsResponse.documents.filter((doc: any) => {
				const titre = (doc.titre || '').toLowerCase();
				const marque = (doc.marque || '').toLowerCase();
				return titre.includes(searchLower) || marque.includes(searchLower);
			});

			const formattedProducts: Product[] = filtered.map((doc: any) => ({
				id: doc.$id,
				titre: doc.titre || '',
				marque: doc.marque || '',
				description: doc.description || '',
				sexe: doc.sexe || 'Mixte',
				contenance: doc.contenance || '',
				prix: doc.prix || 0,
				categorie: doc.categorie || '',
				thumbnail: doc.thumbnail || '',
				images: doc.images || [],
				likes: doc.likes || 0,
				inStock: doc.inStock !== false,
				isNew: doc.isNew || false,
				isBestSeller: doc.isBestSeller || false,
			}));

			setProducts(formattedProducts);
		} catch (error) {
			console.error('Erreur lors de la recherche:', error);
			setProducts([]);
		} finally {
			setLoading(false);
		}
	};

	const clearSearch = () => {
		setSearchQuery('');
		setProducts([]);
		setHasSearched(false);
	};

	return (
		<div className="relative min-h-screen flex-1 items-center justify-center bg-background">
			{/* Hero Section avec Barre de Recherche */}
			<div className="relative bg-gradient-to-b  from-muted/50 to-background py-16 md:py-24 ">
				<div className="container mx-auto max-w-7xl px-4">
					<div className="max-w-3xl mx-auto">
						{/* Titre */}
						<h1 className="text-4xl md:text-5xl font-medium font-serif text-center mb-4">
							Rechercher un parfum
						</h1>
						<p className="text-muted-foreground text-center mb-8">
							Trouvez votre parfum, par marque ou par nom
						</p>

						{/* Barre de Recherche */}
						<div className="relative">
							<div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
								<Search className="w-5 h-5" />
							</div>

							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Rechercher par marque ou nom du parfum..."
								className="w-full pl-12 pr-12 py-4 text-lg border-2 rounded-full bg-background focus:outline-none focus:border-primary transition-colors shadow-lg"
							/>

							{searchQuery && (
								<button
									onClick={clearSearch}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
									aria-label="Effacer la recherche"
								>
									<X className="w-5 h-5" />
								</button>
							)}
						</div>

						{/* Indicateur de chargement */}
						{loading && (
							<p className="text-center text-muted-foreground mt-4">
								Recherche en cours...
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Résultats de Recherche */}
			<div className="container mx-auto max-w-7xl px-4 py-12">
				{hasSearched && !loading && (
					<div className="mb-8">
						<h2 className="text-center text-2xl font-semibold">
							{products.length > 0 ? (
								<>
									{products.length} résultat{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
								</>
							) : (
								'Aucun résultat trouvé'
							)}
						</h2>
						{products.length === 0 && (
							<p className="text-center text-muted-foreground mt-2">
								Essayez une autre recherche ou vérifiez l'orthographe
							</p>
						)}
					</div>
				)}

				{/* Grille de Produits */}
				{products.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
