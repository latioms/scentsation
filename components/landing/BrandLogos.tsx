import Image from 'next/image'

export function FeaturedLogos() {
	const brands = [
		{ name: "Dior", logo: "/logos/christian-dior.svg", height: 40 },
		{ name: "Giorgio Armani", logo: "/logos/giorgio-armani.svg", height: 70 },
		{ name: "Chanel", logo: "/logos/chanel.svg", height: 45 },
		{ name: "Azzaro", logo: "/logos/azzaro.svg", height: 50 },
		{ name: "Tom Ford", logo: "/logos/Tom_Ford.png", height: 12 },
	]

	return (
		<section className="py-16 md:py-24 bg-background">
			<div className="container mx-auto px-4">
				<div className="text-center">
					<p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8 md:mb-12">Inspirés de</p>
					<div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 lg:gap-x-30">
						{brands.map((brand) => (
							<div
								key={brand.name}
								className="opacity-70 hover:opacity-100 transition-opacity"
							>
								<Image
									src={brand.logo}
									alt={brand.name}
									width={120}
									height={brand.height}
									className="w-auto"
									style={{ height: `${brand.height}px` }}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
