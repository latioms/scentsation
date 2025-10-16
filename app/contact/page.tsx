"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const DashedLine = ({
	orientation = "horizontal",
	className,
}: {
	orientation?: "horizontal" | "vertical"
	className?: string
}) => {
	const isHorizontal = orientation === "horizontal"

	return (
		<div className={cn("text-muted-foreground relative", isHorizontal ? "h-px w-full" : "h-full w-px", className)}>
			<div
				className={cn(
					isHorizontal
						? [
							"h-px w-full",
							"bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
							"[mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]",
						]
						: [
							"h-full w-px",
							"bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_8px)]",
							"[mask-image:linear-gradient(180deg,transparent,black_25%,black_75%,transparent)]",
						],
				)}
			/>
		</div>
	)
}

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		const formData = new FormData(e.currentTarget)
		const data = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			message: formData.get("message") as string,
		}

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})

			if (!response.ok) {
				throw new Error("Failed to send message")
			}

			toast.success("Message envoyé !", {
				description: "Nous vous répondrons dans les plus brefs délais.",
			})

			// Reset form
			e.currentTarget.reset()
		} catch (error) {
			toast.error("Erreur", {
				description: "Une erreur est survenue. Veuillez réessayer.",
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className="bg-linear-to-b via-background to-background relative mx-2.5 mt-2.5 rounded-b-[36px] rounded-t-2xl from-[#c9a882]/20 py-32 lg:mx-4">
			<div className="container max-w-2xl mx-auto">
				<h1 className="text-center text-4xl font-serif font-light tracking-tight lg:text-5xl">Contactez-nous</h1>
				<p className="text-muted-foreground mt-4 text-center font-light leading-relaxed lg:mx-auto">
					Nous sommes là pour répondre à toutes vos questions sur nos fragrances.
				</p>

				<div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
					<div>
						<h2 className="font-semibold">Boutique</h2>
						<p className="text-muted-foreground mt-3 text-sm">
							Paris, France
							<br />
							Disponible en ligne
						</p>
					</div>

					<div>
						<h2 className="font-semibold">Email</h2>
						<div className="mt-3">
							<a href="mailto:contact@scentsation.com" className="text-muted-foreground hover:text-foreground text-sm">
								contact@scentsation.com
							</a>
						</div>
					</div>

					<div>
						<h2 className="font-semibold">Suivez-nous</h2>
						<div className="mt-3 flex gap-6 lg:gap-10">
							<a
								href="https://twitter.com/scentsation"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground"
							>
								<svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
								</svg>
							</a>
							<a
								href="https://tiktok.com/@scentsation"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground"
							>
								<svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
								</svg>
							</a>
						</div>
					</div>
				</div>

				<DashedLine className="my-12" />

				{/* Contact Form */}
				<div className="mx-auto">
					<h2 className="text-lg font-semibold">Envoyez-nous un message</h2>
					<form onSubmit={handleSubmit} className="mt-8 space-y-5">
						<div className="space-y-2">
							<Label htmlFor="name">Nom complet</Label>
							<Input id="name" name="name" placeholder="Prénom et nom" required />
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" placeholder="votre@email.com" required />
						</div>
						<div className="space-y-2">
							<Label htmlFor="message">Votre message</Label>
							<Textarea
								id="message"
								name="message"
								placeholder="Écrivez votre message"
								className="min-h-[120px] resize-none"
								required
							/>
						</div>

						<div className="flex justify-end">
							<Button
								size="lg"
								type="submit"
								disabled={isSubmitting}
								className="bg-[#8b7355] hover:bg-[#6d5a44] text-white"
							>
								{isSubmitting ? "Envoi..." : "Envoyer"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}
