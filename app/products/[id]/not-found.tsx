import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">Produit introuvable</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Le produit que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/products">
            <Button>Voir tous les produits</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
