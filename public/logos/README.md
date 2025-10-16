# Guide d'utilisation des logos de marques

## 📁 Structure des fichiers

Les logos doivent être placés dans le dossier : `public/logos/`

## 🎨 Format des logos

- **Format recommandé** : PNG avec fond transparent
- **Dimensions optimales** : 200x100 pixels (largeur x hauteur)
- **Poids** : Moins de 50KB par logo

## 📝 Nomenclature des fichiers

Les noms de fichiers doivent correspondre à ceux dans le composant `BrandLogos.tsx` :

- `dior.png`
- `chanel.png`
- `gucci.png`
- `ysl.png`
- `versace.png`
- `prada.png`
- `armani.png`
- `tom-ford.png`

## ➕ Ajouter de nouveaux logos

Pour ajouter de nouveaux logos :

1. Ajoutez votre image dans `public/logos/`
2. Modifiez le fichier `components/BrandLogos.tsx`
3. Ajoutez votre logo dans le tableau `logos` :

```tsx
{
  id: "nom-unique",
  name: "Nom de la marque",
  image: "/logos/votre-logo.png",
}
```

## 🎯 Exemple de logos gratuits

Vous pouvez obtenir des logos de parfums depuis :
- [Brandfetch](https://brandfetch.com/)
- [Seeklogo](https://seeklogo.com/)
- Sites officiels des marques (section presse/média)

## ⚙️ Personnalisation

Dans `components/BrandLogos.tsx`, vous pouvez ajuster :
- La vitesse de défilement (paramètre `speed`)
- Le nombre de logos visibles (classes `basis-1/X`)
- L'espacement entre les logos
- Les effets visuels (grayscale, opacity, etc.)

## 📌 Note importante

Assurez-vous d'avoir les droits d'utilisation des logos que vous ajoutez à votre site.
