"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import LikeButton from "@/components/LikeButton"
import { getAllProducts } from "@/lib/products"

export function FeaturedProducts() {
	const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchProducts() {
			try {
				const data = await getAllProducts()
				// Récupérer les 5 produits les plus récents
				const recent = data
					.filter((p: Product) => p.isNew || p.isBestSeller)
					.slice(0, 5)

				// Si on n'a pas assez de produits "new", compléter avec les autres
				if (recent.length < 5) {
					const remaining = data
						.filter((p: Product) => !recent.find((r: Product) => r.$id === p.$id))
						.slice(0, 5 - recent.length)
					setFeaturedProducts([...recent, ...remaining])
				} else {
					setFeaturedProducts(recent)
				}
			} catch (error) {
				console.error('Erreur lors du chargement des produits:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [])

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('fr-FR').format(price) + ' XAF'
	}

	if (loading) {
		return (
			<section className="py-16 md:py-20 bg-[#c9a882] ">
				<div className="container mx-auto px-4 max-w-7xl">
					<div className="animate-pulse">
						<div className="h-8 bg-neutral-200 rounded w-32 mb-8"></div>
						<div className="flex gap-4 overflow-hidden">
							{[1, 2, 3, 4, 5].map((i) => (
								<div key={i} className="flex-none w-[280px] md:w-[320px]">
									<div className="bg-neutral-200 rounded-lg h-[400px]"></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		)
	}

	if (featuredProducts.length === 0) {
		return null
	}

	return (
		<section className="py-16 md:py-20 bg-[#c9a882] ">
			<div className="container mx-auto px-4 max-w-7xl">
				<h2 className="text-2xl font-light mb-8 text-neutral-900">En vedette</h2>

				{/* Horizontal scrollable container */}
				<div className="relative">
					<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
						{featuredProducts.map((product, index) => (
							<Link
								key={product.$id}
								href={`/products/${product.$id}`}
								className="group flex-none w-[280px] md:w-[320px] snap-start"
							>
								<div className="bg-neutral-100 rounded-none overflow-hidden transition-all duration-300 hover:shadow-lg">
									{/* Image container */}
									<div className="relative aspect-square  p-8">
										{/* New or BestSeller badge */}
										{product.isNew && (
											<div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-light text-neutral-900 shadow-sm">
												Nouveau
											</div>
										)}
										{!product.isNew && product.isBestSeller && (
											<div className="absolute top-3 left-3 bg-amber-100 px-3 py-1 rounded-full text-xs font-light text-neutral-900 shadow-sm">
												Best Seller
											</div>
										)}

										{/* Heart icon */}
										<div
											className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-neutral-50 transition-colors"
											onClick={(e) => {
												e.preventDefault()
											}}
										>
											<LikeButton
												productId={product.$id}
												iconClassName="w-4 h-4"
												initialCount={product.likes}
											/>
										</div>

										{/* Product image */}
										<div className="relative w-full h-full">
											<Image
												src={product.thumbnail}
												alt={product.titre}
												fill
												className="object-contain group-hover:scale-105 transition-transform duration-300"
											/>
										</div>
									</div>

									{/* Product info */}
									<div className="p-4 flex items-center justify-between">
										<div>
											<h3 className="font-light text-neutral-900 text-sm mb-1 line-clamp-1">
												{product.titre}
											</h3>
											<p className="text-xs text-neutral-500">{product.marque}</p>
										</div>
										<p className="font-light text-neutral-900 text-sm">
											{formatPrice(product.prix)}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>

				{/* View all button */}
				<div className="mt-8 text-center">
					<Button
						asChild
						variant="outline"
						className="border-neutral-300 rounded-none hover:bg-neutral-100 bg-transparent"
					>
						<Link href="/products">Voir tous les produits</Link>
					</Button>
				</div>
			</div>

			<style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
		</section>
	)
}
