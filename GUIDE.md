# 🎯 Guide de Démarrage Rapide - ScentSation™

## ✅ Ce qui a été créé

Votre site e-commerce de fragrances est maintenant opérationnel avec :

### 📄 Pages Fonctionnelles
1. **Page d'accueil** (`http://localhost:3000`)
   - Design élégant avec hero section
   - Présentation des 3 catégories de produits
   - Affichage des produits vedettes

2. **Page Collections** (`http://localhost:3000/collections`)
   - Filtrage par catégorie (Parfums, Huiles, Déodorants)
   - Boutons de catégorie interactifs

3. **Page Products** (`http://localhost:3000/products`)
   - Filtres avancés (sidebar desktop, drawer mobile)
   - Tri par prix, note, nouveauté
   - Filtrage par sexe, marque, contenance, prix

### 🧩 Composants Créés
- **Navbar responsive** : Menu desktop + burger mobile avec drawer
- **ProductCard** : Carte produit avec image, infos, badges
- **ProductFilters** : Système de filtres complet

### 📊 Données & Types
- Types TypeScript pour tous les produits
- 5 produits exemples déjà configurés
- Fonctions de filtrage et tri

---

## 🚀 Comment Démarrer le Site

### 1. Ouvrir le Terminal
Dans VS Code : `Ctrl + ù` ou Menu Terminal > Nouveau Terminal

### 2. Lancer le Serveur
```bash
npm run dev
```

### 3. Ouvrir dans le Navigateur
Allez sur : **http://localhost:3000**

---

## 📝 Comment Ajouter des Produits

### Étape 1 : Ouvrir le fichier des produits
Fichier : `lib/products.ts`

### Étape 2 : Ajouter un nouveau produit
Copiez ce template et modifiez les valeurs :

```typescript
{
  id: '6',                          // Numéro unique
  titre: 'Nom du Parfum',          // Ex: "Sauvage"
  marque: 'Nom de la Marque',      // Ex: "Dior"
  description: 'Description de vente du produit...',
  sexe: 'Homme',                   // Homme | Femme | Mixte
  contenance: '100ml',             // Ex: "10ml", "50ml", "100ml"
  prix: 50000,                     // Prix en XAF (sans espace)
  categorie: 'Parfums',            // Parfums | Huiles de Parfum | Déodorants
  rating: 4.5,                     // Note sur 5
  ratings: 42,                     // Nombre de personnes ayant voté
  image: '/products/nom-image.jpg', // Chemin vers l'image
  inStock: true,                   // true = en stock, false = épuisé
  isNew: true,                     // Badge "Nouveau"
  isBestSeller: false,             // Badge "Best Seller"
},
```

### Étape 3 : Ajouter l'image
1. Mettez votre image dans : `public/products/`
2. Nommez-la : `nom-image.jpg`
3. Référencez-la : `/products/nom-image.jpg`

---

## 🎨 Personnalisation Rapide

### Changer le Logo / Nom
Fichier : `components/layout/Navbar.tsx`
Ligne 28-30 : Changez "ScentSation"

### Modifier les Items du Menu
Fichier : `components/layout/Navbar.tsx`
Lignes 10-15 : Ajoutez/modifiez les liens

```typescript
const menuItems = [
  { name: 'Collections', href: '/collections' },
  { name: 'Products', href: '/products' },
  { name: 'Nouveau', href: '/nouveau' },  // ← Ajoutez ceci
];
```

### Changer les Couleurs
Le site utilise une palette "Amber" (jaune/doré).
Pour changer, remplacez `amber-` par une autre couleur Tailwind :
- `blue-` pour bleu
- `green-` pour vert
- `purple-` pour violet
- etc.

---

## 📸 Images des Produits

### Où mettre les images ?
Dossier : `public/products/`

### Format recommandé
- **Format** : JPG ou PNG
- **Taille** : 800x800 pixels (carré)
- **Poids** : < 200KB pour la performance

### Exemple
```
public/
  products/
    bleu-chanel.jpg
    tobacco-vanille.jpg
    coco-mademoiselle.jpg
```

---

## 🔧 Problèmes Courants

### Le site ne démarre pas
```bash
# Réinstallez les dépendances
npm install --legacy-peer-deps
```

### Les images ne s'affichent pas
- Vérifiez que l'image est dans `public/products/`
- Vérifiez le nom du fichier (pas d'espaces)
- Le chemin doit commencer par `/products/`

### Erreur TypeScript
- Vérifiez que tous les champs obligatoires sont remplis
- Respectez les types : `'Homme'` pas `"homme"`

---

## 📚 Fichiers Importants

| Fichier | Description |
|---------|-------------|
| `lib/products.ts` | Liste de tous les produits |
| `app/page.tsx` | Page d'accueil |
| `app/collections/page.tsx` | Page collections |
| `app/products/page.tsx` | Page produits avec filtres |
| `components/layout/Navbar.tsx` | Barre de navigation |
| `components/ProductCard.tsx` | Carte produit |
| `types/product.ts` | Définitions TypeScript |

---

## 🎯 Prochaines Étapes

### Immédiat
1. ✅ Ajoutez vos vrais produits dans `lib/products.ts`
2. ✅ Ajoutez les images des produits dans `public/products/`
3. ✅ Testez tous les filtres et la navigation

### Court Terme
- Page détail produit (cliquer sur un produit)
- Système de panier
- Page "À propos" / "Contact"

### Moyen Terme
- Authentification (comptes clients)
- Système de commande
- Paiement en ligne
- Base de données

---

## 💡 Conseils

### Pour tester localement
- Utilisez toujours `npm run dev`
- Le site se met à jour automatiquement quand vous modifiez un fichier
- Consultez la console du navigateur (F12) pour voir les erreurs

### Pour la production
```bash
npm run build
npm start
```

### Pour déployer
Le site peut être déployé sur :
- **Vercel** (recommandé, gratuit)
- **Netlify**
- **AWS**
- Votre propre serveur

---

## 📞 Besoin d'aide ?

1. Vérifiez le `README.md` pour la documentation complète
2. Consultez la console du navigateur pour les erreurs
3. Vérifiez que vous n'avez pas de fautes de frappe dans les noms de fichiers

---

## ✨ Bon à savoir

- Le site est **100% responsive** (mobile, tablette, desktop)
- Le code est **bien organisé** et commenté
- Les **types TypeScript** évitent les erreurs
- Le **système de filtres** est déjà complet et fonctionnel
- La **navbar** s'adapte automatiquement à la taille de l'écran

**Bonne chance avec votre boutique de fragrances ! 🌸**
