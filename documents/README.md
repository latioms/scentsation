# ScentSation™ - Site E-commerce de Fragrances

Site e-commerce moderne pour la vente de parfums, huiles de parfum et déodorants développé avec Next.js 15, React 19 et Tailwind CSS 4.

## 🎨 Fonctionnalités

### ✅ Implémenté

- **Navbar responsive** avec menu burger sur mobile
- **Page d'accueil** avec hero section et produits vedettes
- **Page Collections** - Tri des produits par catégorie
- **Page Products** - Filtres avancés et tri
- **Système de filtrage complet** :
  - Par catégorie (Parfums, Huiles de Parfum, Déodorants)
  - Par sexe (Homme, Femme, Mixte)
  - Par marque
  - Par contenance
  - Par prix (curseur interactif)
  - Par note
- **Composants ProductCard** avec badges (Nouveau, Best Seller)
- **Système de types TypeScript** complet

## 📁 Structure du Projet

```
scentsation/
├── app/
│   ├── collections/
│   │   └── page.tsx          # Page de collections par catégorie
│   ├── products/
│   │   └── page.tsx          # Page de tous les produits avec filtres
│   ├── layout.tsx            # Layout principal avec Navbar
│   ├── page.tsx              # Page d'accueil
│   └── globals.css           # Styles globaux
├── components/
│   ├── layout/
│   │   └── Navbar.tsx        # Navigation responsive
│   ├── ProductCard.tsx       # Carte produit
│   └── ProductFilters.tsx    # Composant de filtres
├── lib/
│   ├── products.ts           # Données produits et fonctions utilitaires
│   └── filters.ts            # Logique de filtrage et tri
└── types/
    └── product.ts            # Définitions TypeScript
```

## 🛠️ Technologies

- **Framework**: Next.js 15.5.5
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **TypeScript**: Version 5
- **Fonts**: Inter & Cormorant Garamond (Google Fonts)

## 📦 Types de Données

### Product

```typescript
{
  id: string;
  titre: string;           // "Bleu", "Tobacco Vanille"
  marque: string;          // "Tom Ford", "Chanel"
  description: string;     // Description marketing
  sexe: 'Homme' | 'Femme' | 'Mixte';
  contenance: string;      // "10ml", "50ml", "100ml"
  prix: number;            // Prix en XAF
  categorie: 'Parfums' | 'Huiles de Parfum' | 'Déodorants';
  rating: number;          // Note moyenne sur 5
  ratings: number;         // Nombre de votes
  image: string;           // URL de l'image
  images?: string[];       // Images additionnelles
  inStock?: boolean;       // Disponibilité
  isNew?: boolean;         // Badge Nouveau
  isBestSeller?: boolean;  // Badge Best Seller
}
```

## 🚀 Démarrage

### Installation

```bash
npm install --legacy-peer-deps
```

### Développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### Build Production

```bash
npm run build
npm start
```

## 📱 Pages Disponibles

### 1. Page d'Accueil (`/`)
- Hero section avec appel à l'action
- Section collections avec 3 catégories
- Produits vedettes (Best Sellers + Nouveautés)
- Section USP (Livraison, Authenticité, Service)

### 2. Page Collections (`/collections`)
- Filtrage par catégorie uniquement
- Vue grid responsive
- Compteur de résultats

### 3. Page Products (`/products`)
- **Filtres avancés** (sidebar desktop / drawer mobile) :
  - Catégories (checkbox)
  - Genre (checkbox)
  - Marques (checkbox)
  - Contenance (checkbox)
  - Prix maximum (slider)
- **Options de tri** :
  - Nouveautés
  - Prix croissant/décroissant
  - Meilleures notes
  - Nom A-Z
- Vue grid responsive
- Compteur de résultats

## 🎨 Design System

### Palette de Couleurs
- **Primaire**: Amber (50-900)
- **Arrière-plan**: White / Amber-50/30
- **Texte**: Amber-900 / Amber-800
- **Accents**: Amber-600/700

### Typographie
- **Titres**: Cormorant Garamond (Serif)
- **Corps**: Inter (Sans-serif)

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📊 Gestion des Données

### Ajout de Produits

Éditez le fichier `lib/products.ts` :

```typescript
export const products: Product[] = [
  {
    id: '6',
    titre: 'Nouveau Parfum',
    marque: 'Dior',
    description: 'Description du produit...',
    sexe: 'Femme',
    contenance: '100ml',
    prix: 50000,
    categorie: 'Parfums',
    rating: 4.5,
    ratings: 45,
    image: '/products/nouveau-parfum.jpg',
    inStock: true,
    isNew: true,
  },
  // ... autres produits
];
```

### Images des Produits

Placez vos images dans le dossier `public/products/` et référencez-les avec :
```typescript
image: '/products/nom-du-fichier.jpg'
```

## 🔄 Prochaines Étapes

### À Implémenter

1. **Page Détail Produit** (`/products/[id]`)
   - Galerie d'images
   - Sélection de contenance
   - Ajout au panier
   - Produits similaires

2. **Système de Panier**
   - Contexte React pour l'état du panier
   - Page panier
   - LocalStorage persistence

3. **Authentification**
   - Inscription / Connexion
   - Profil utilisateur
   - Historique des commandes

4. **Checkout**
   - Formulaire d'adresse
   - Méthodes de paiement
   - Confirmation de commande

5. **Backend / API**
   - API Routes Next.js
   - Base de données (PostgreSQL, MongoDB, etc.)
   - Gestion des commandes
   - Intégration paiement

6. **SEO & Performance**
   - Métadonnées dynamiques
   - Open Graph
   - Image optimization
   - Sitemap

7. **Features Additionnelles**
   - Wishlist / Favoris
   - Avis clients
   - Recherche avec autocomplétion
   - Newsletter
   - Programme de fidélité

## 🛠️ Personnalisation

### Modifier la Navbar

Éditez `components/layout/Navbar.tsx` :
- Logo : Ligne 28-30
- Items menu : Ligne 10-15

### Modifier les Filtres

Éditez `lib/filters.ts` pour ajuster la logique de filtrage.

### Modifier le Tri

Éditez la fonction `sortProducts` dans `lib/filters.ts`.

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.

## 📄 Licence

Propriétaire - Tous droits réservés © 2025 ScentSation™
