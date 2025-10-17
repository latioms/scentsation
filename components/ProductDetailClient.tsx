'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { Minus, Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import LikeButton from '@/components/LikeButton';

interface ProductDetailClientProps {
	product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState(product.contenance);
	const [openSections, setOpenSections] = useState({
		information: false,
		benefits: false,
		ingredients: false,
	});

	const allImages = [product.thumbnail, ...(product.images || [])];

	// Exemple de tailles disponibles (à adapter selon vos données)
	const availableSizes = Array.from(new Set([product.contenance])).sort();

	const toggleSection = (section: keyof typeof openSections) => {
		setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
	};

	const handleQuantityChange = (delta: number) => {
		const newQuantity = quantity + delta;
		if (newQuantity >= 1 && newQuantity <= 99) {
			setQuantity(newQuantity);
		}
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('fr-FR').format(price) + ' XAF';
	};

	const handleWhatsAppOrder = () => {
		const phoneNumber = '237655863245'; // Numéro de la vendeuse
		const message = `Bonjour, je veux ${quantity} ${quantity > 1 ? 'exemplaires' : 'exemplaire'} de ${product.titre} (${product.marque}).\n\nMerci de confirmer la disponibilité.`;

		const encodedMessage = encodeURIComponent(message);
		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
		
		window.open(whatsappUrl, '_blank');
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8 lg:mt-16 max-w-6xl">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
					{/* Section Images */}
					<div className="space-y-4">
						{/* Image principale */}
						<div className="relative aspect-square bg-gray-100 rounded-sm overflow-hidden max-w-md mx-auto lg:max-w-full">
							<Image
								src={allImages[selectedImage]}
								alt={product.titre}
								fill
								className="object-cover"
								priority
							/>
							{/* Bouton like */}
							<div className="absolute p-2 top-4 right-4  m-auto rounded-full text-center">
								<LikeButton
									productId={product.$id}
									iconClassName="w-5 h-5"
									initialCount={product.likes}
								/>
							</div>
						</div>

						{/* Miniatures */}
						{allImages.length > 1 && (
							<div className="flex gap-2 overflow-x-auto justify-center lg:justify-start">
								{allImages.map((image, index) => (
									<button
										key={index}
										onClick={() => setSelectedImage(index)}
										className={`relative flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-transparent'
											}`}
									>
										<Image
											src={image}
											alt={`${product.titre} - ${index + 1}`}
											fill
											className="object-contain p-1"
										/>
									</button>
								))}
							</div>
						)}
					</div>

					{/* Section Détails */}
					<div className="space-y-5 mx-auto max-w-md  lg:max-w-full lg:mx-0">
						{/* Titre et Prix */}
						<div>
							<div className='flex justify-between'>
								<h3 className='lg:p-2 rounded-xs lg:bg-muted text-sm text-muted-foreground'>{product.categorie}</h3>
								<LikeButton
									productId={product.$id}
									className="p-1 hover:bg-accent rounded-full"
									iconClassName="w-5 h-5"
									showCount={true}
									initialCount={product.likes}
								/>
							</div>
							<div className="flex items-center justify-between mt-4">
								<h1 className="text-4xl font-semi-bold xl:font-serif text-foreground mb-2">{product.titre}</h1>
								<p className="text-2xl font-semibold text-foreground">{formatPrice(product.prix)}</p>
							</div>
						</div>

						{/* Description courte */}
						<p className="text-sm text-muted-foreground leading-relaxed">
							{product.description}
						</p>

						{/* Sélecteur de taille */}
						<div>
							<h3 className="text-sm font-medium text-foreground mb-2">Size</h3>
							<div className="flex gap-2">
								{availableSizes.map((size) => (
									<button
										key={size}
										onClick={() => setSelectedSize(size)}
										className={`px-5 py-2 border rounded-md transition-colors text-sm ${selectedSize === size
											? 'border-foreground bg-foreground text-background'
											: 'border-input bg-background hover:border-foreground'
											}`}
									>
										{size}
									</button>
								))}
							</div>
						</div>

						{/* Quantité et Bouton Ajouter */}
						<div className="flex items-center gap-3">
							{/* Sélecteur de quantité */}
							<div className="flex items-center border border-input rounded-md">
								<button
									onClick={() => handleQuantityChange(-1)}
									className="p-2 hover:bg-accent transition-colors"
									disabled={quantity <= 1}
								>
									<Minus className="w-4 h-4" />
								</button>
								<input
									type="number"
									value={quantity}
									onChange={(e) => {
										const val = parseInt(e.target.value) || 1;
										if (val >= 1 && val <= 99) setQuantity(val);
									}}
									className="w-12 text-center border-x border-input py-2 bg-transparent text-sm"
									min="1"
									max="99"
								/>
								<button
									onClick={() => handleQuantityChange(1)}
									className="p-2 hover:bg-accent transition-colors"
									disabled={quantity >= 99}
								>
									<Plus className="w-4 h-4" />
								</button>
							</div>

							{/* Bouton Commander via WhatsApp */}
							<Button 
								onClick={handleWhatsAppOrder}
								className="flex-1 py-5 text-sm font-medium rounded-none hover:bg-green-700"
							>
								Commander
							</Button>
						</div>

						{/* Informations de livraison */}
						<p className="text-xs text-muted-foreground">
							Shipping, Exchange and Returns
						</p>

						{/* Sections collapsibles */}
						<div className="space-y-0 border-t border-border">
							{/* Information */}
							<Collapsible
								open={openSections.information}
								onOpenChange={() => toggleSection('information')}
							>
								<CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-sm font-medium hover:bg-accent/50 transition-colors px-2">
									Information
									<ChevronDown
										className={`h-4 w-4 transition-transform ${openSections.information ? 'rotate-180' : ''
											}`}
									/>
								</CollapsibleTrigger>
								<CollapsibleContent className="px-2 pb-3">
									<div className="space-y-1.5 text-xs text-muted-foreground">
										<p><strong>Marque:</strong> {product.marque}</p>
										<p><strong>Catégorie:</strong> {product.categorie}</p>
										<p><strong>Genre:</strong> {product.sexe}</p>
										<p><strong>Contenance:</strong> {product.contenance}</p>
										{product.inStock !== undefined && (
											<p><strong>Disponibilité:</strong> {product.inStock ? 'En stock' : 'Rupture de stock'}</p>
										)}
									</div>
								</CollapsibleContent>
							</Collapsible>

							<div className="border-t border-border" />

							{/* Benefits */}
							<Collapsible
								open={openSections.benefits}
								onOpenChange={() => toggleSection('benefits')}
							>
								<CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-sm font-medium hover:bg-accent/50 transition-colors px-2">
									Benefits
									<ChevronDown
										className={`h-4 w-4 transition-transform ${openSections.benefits ? 'rotate-180' : ''
											}`}
									/>
								</CollapsibleTrigger>
								<CollapsibleContent className="px-2 pb-3">
									<ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
										<li>Longue tenue et parfum intense</li>
										<li>Ingrédients de qualité premium</li>
										<li>Convient pour un usage quotidien</li>
										<li>Senteur raffinée et élégante</li>
									</ul>
								</CollapsibleContent>
							</Collapsible>

							<div className="border-t border-border" />

							{/* Ingredients */}
							<Collapsible
								open={openSections.ingredients}
								onOpenChange={() => toggleSection('ingredients')}
							>
								<CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-sm font-medium hover:bg-accent/50 transition-colors px-2">
									Ingredients
									<ChevronDown
										className={`h-4 w-4 transition-transform ${openSections.ingredients ? 'rotate-180' : ''
											}`}
									/>
								</CollapsibleTrigger>
								<CollapsibleContent className="px-2 pb-3">
									<p className="text-xs text-muted-foreground">
										Notes de tête, notes de cœur et notes de fond soigneusement sélectionnées
										pour créer une expérience olfactive unique et mémorable.
									</p>
								</CollapsibleContent>
							</Collapsible>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
