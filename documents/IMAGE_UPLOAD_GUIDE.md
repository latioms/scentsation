# 📸 Système d'Upload d'Images - Guide Complet

## 🎯 Vue d'ensemble

Le système d'upload d'images permet aux admins de sélectionner et uploader des images directement depuis leur ordinateur ou téléphone, avec une prévisualisation en temps réel avant l'upload.

---

## ✨ Fonctionnalités

### 1. **Image Principale** (ImageUploader)
- ✅ Sélection d'une image (click ou drag & drop)
- ✅ Prévisualisation instantanée
- ✅ Upload automatique vers Appwrite Storage
- ✅ Boutons "Changer" et "Supprimer"
- ✅ Validation du type et de la taille
- ✅ Indicateur de chargement
- ✅ Responsive sur tous les écrans

### 2. **Images Additionnelles** (MultiImageUploader)
- ✅ Upload multiple (jusqu'à 4 images)
- ✅ Grille responsive (2-3-4 colonnes)
- ✅ Prévisualisation de chaque image
- ✅ Numérotation des images
- ✅ Suppression individuelle
- ✅ Compteur d'images
- ✅ Upload automatique

---

## 🎨 Interface Utilisateur

### Sur Desktop (>1024px)
```
┌─────────────────────────────────────────┐
│  Image Principale                       │
│  ┌──────────┐                          │
│  │          │                          │
│  │  Image   │                          │
│  │          │                          │
│  └──────────┘                          │
│                                         │
│  Images Additionnelles                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│  │ 1  │ │ 2  │ │ 3  │ │ +  │          │
│  └────┘ └────┘ └────┘ └────┘          │
└─────────────────────────────────────────┘
```

### Sur Tablette (768px-1024px)
```
┌─────────────────────────────┐
│  Image Principale           │
│  ┌──────────┐              │
│  │          │              │
│  │  Image   │              │
│  └──────────┘              │
│                             │
│  Images Additionnelles      │
│  ┌────┐ ┌────┐ ┌────┐     │
│  │ 1  │ │ 2  │ │ 3  │     │
│  └────┘ └────┘ └────┘     │
│  ┌────┐                    │
│  │ +  │                    │
│  └────┘                    │
└─────────────────────────────┘
```

### Sur Mobile (<768px)
```
┌──────────────────┐
│  Image Princ.    │
│  ┌──────────┐   │
│  │          │   │
│  │  Image   │   │
│  └──────────┘   │
│                  │
│  Images Add.     │
│  ┌────┐ ┌────┐  │
│  │ 1  │ │ 2  │  │
│  └────┘ └────┘  │
│  ┌────┐ ┌────┐  │
│  │ 3  │ │ +  │  │
│  └────┘ └────┘  │
└──────────────────┘
```

---

## 🔧 Configuration Requise

### 1. Appwrite Storage

Le bucket est déjà créé avec l'ID : `68f001ee002c3e91e101`

Dans `.env` :
```env
NEXT_PUBLIC_APPWRITE_BUCKET_ID="68f001ee002c3e91e101"
```

### 2. Permissions du Bucket

Dans Appwrite Console :
1. Allez dans **Storage**
2. Ouvrez votre bucket
3. **Settings** → **Permissions**
4. **Read access** : `Any` (pour que tout le monde puisse voir)
5. **Create/Update/Delete** : Vide (seuls les admins via code)

---

## 📁 Fichiers Créés

### `components/admin/ImageUploader.tsx`
**Fonction** : Upload d'une seule image principale

**Props** :
- `onImageUploaded: (url: string) => void` - Callback avec l'URL
- `currentImage?: string` - Image actuelle (optionnel)
- `label?: string` - Label personnalisé
- `required?: boolean` - Champ requis

**Features** :
- Zone de drop carrée (ratio 1:1)
- Prévisualisation immédiate
- Overlay avec actions au hover
- Upload automatique vers Appwrite
- Messages d'erreur explicites

### `components/admin/MultiImageUploader.tsx`
**Fonction** : Upload de plusieurs images

**Props** :
- `onImagesUploaded: (urls: string[]) => void` - Callback avec les URLs
- `currentImages?: string[]` - Images actuelles
- `maxImages?: number` - Nombre max (défaut: 4)

**Features** :
- Grille responsive
- Upload multiple en une fois
- Numérotation automatique
- Suppression individuelle
- Compteur (X/max)

---

## 🚀 Utilisation

### Dans CreateProductForm.tsx

```tsx
import ImageUploader from './ImageUploader';
import MultiImageUploader from './MultiImageUploader';

// State
const [formData, setFormData] = useState({
  image: '',
  images: [] as string[],
  // ... autres champs
});

// Dans le JSX
<ImageUploader
  label="Image principale"
  required
  currentImage={formData.image}
  onImageUploaded={(url) => setFormData({ ...formData, image: url })}
/>

<MultiImageUploader
  currentImages={formData.images}
  onImagesUploaded={(urls) => setFormData({ ...formData, images: urls })}
  maxImages={4}
/>
```

---

## 🎯 Workflow d'Upload

### Image Principale

```
1. User clique sur la zone
   ↓
2. Sélectionne un fichier
   ↓
3. Validation (type + taille)
   ↓
4. Prévisualisation locale (FileReader)
   ↓
5. Upload vers Appwrite Storage
   ↓
6. Récupération de l'URL publique
   ↓
7. Callback onImageUploaded(url)
   ↓
8. Formulaire récupère l'URL
```

### Images Multiples

```
1. User clique sur "+"
   ↓
2. Sélectionne 1-N fichiers
   ↓
3. Validation de chaque fichier
   ↓
4. Upload parallèle (Promise.all)
   ↓
5. Récupération de toutes les URLs
   ↓
6. Callback onImagesUploaded(urls[])
   ↓
7. Affichage dans la grille
```

---

## ✅ Validations

### Type de Fichier
```typescript
if (!file.type.startsWith('image/')) {
  setError('Veuillez sélectionner une image valide');
  return;
}
```

**Formats acceptés** : PNG, JPG, JPEG, WebP, GIF

### Taille de Fichier
```typescript
if (file.size > 5 * 1024 * 1024) {
  setError('L\'image ne doit pas dépasser 5MB');
  return;
}
```

**Taille max** : 5MB par image

### Nombre d'Images
```typescript
if (images.length + files.length > maxImages) {
  setError(`Vous ne pouvez ajouter que ${maxImages} images maximum`);
  return;
}
```

---

## 🎨 États Visuels

### ImageUploader

#### État Vide
- Zone en pointillés
- Icône d'image
- Texte "Cliquez ou glissez"
- Hover : fond coloré

#### Avec Image
- Image en plein écran
- Overlay transparent
- Hover : overlay visible avec boutons

#### En Upload
- Overlay noir semi-transparent
- Spinner animé
- Texte "Upload en cours..."

### MultiImageUploader

#### Images
- Card avec image
- Numéro en haut à gauche
- Hover : overlay avec bouton supprimer

#### Bouton "+"
- Card en pointillés
- Icône "+"
- Texte "Ajouter"

---

## 📱 Responsive Design

### Grille MultiImageUploader

```css
/* Mobile : 2 colonnes */
grid-cols-2

/* Tablette : 3 colonnes */
sm:grid-cols-3

/* Desktop : 4 colonnes */
md:grid-cols-4
```

### Spacing

```css
/* Mobile : gaps plus petits */
gap-3

/* Desktop : gaps normaux */
sm:gap-6
```

---

## 🔄 Flux de Données

```
┌──────────────────┐
│  ImageUploader   │
│                  │
│  1. User sélect  │
│  2. Préview      │
│  3. Upload       │
│  4. Get URL      │
│  5. Callback     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  CreateProduct   │
│     Form         │
│                  │
│  formData.image  │
│  = url           │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  API Route       │
│                  │
│  POST product    │
│  avec URL        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Appwrite DB     │
│                  │
│  Sauvegarde      │
│  l'URL           │
└──────────────────┘
```

---

## 💡 Avantages

### Performance
- ✅ Upload direct vers Appwrite (pas via votre serveur)
- ✅ URLs publiques directes
- ✅ CDN Appwrite pour le chargement rapide

### UX
- ✅ Prévisualisation immédiate
- ✅ Pas besoin de "valider" l'upload
- ✅ Indicateurs de progression clairs
- ✅ Messages d'erreur explicites

### Mobile-Friendly
- ✅ Touch-friendly (grandes zones cliquables)
- ✅ Grille adaptative
- ✅ Photos depuis la caméra supportées

---

## 🐛 Gestion d'Erreurs

### Erreurs Possibles

1. **Type de fichier invalide**
   - Message : "Veuillez sélectionner une image valide"
   - Couleur : Rouge

2. **Fichier trop volumineux**
   - Message : "L'image ne doit pas dépasser 5MB"
   - Couleur : Rouge

3. **Erreur d'upload**
   - Message : "Erreur lors de l'upload de l'image"
   - Couleur : Rouge
   - Console : Erreur détaillée

4. **Trop d'images**
   - Message : "Vous ne pouvez ajouter que N images maximum"
   - Couleur : Rouge

---

## 🎯 Exemple Complet

```tsx
// Dans CreateProductForm.tsx

const [formData, setFormData] = useState({
  titre: 'Sauvage',
  // ...
  image: '',        // URL de l'image principale
  images: [],       // URLs des images additionnelles
});

// Lors du submit
const handleSubmit = async (e) => {
  // Vérifier que l'image principale existe
  if (!formData.image) {
    setError('Image principale requise');
    return;
  }

  // Envoyer à l'API
  const product = {
    ...formData,
    image: formData.image,     // URL Appwrite
    images: formData.images,   // URLs Appwrite
  };

  await fetch('/api/admin/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
};
```

---

## 🚀 C'est Prêt !

Le système d'upload est maintenant complètement fonctionnel :

- ✅ Sélection intuitive
- ✅ Prévisualisation en temps réel
- ✅ Upload automatique
- ✅ Responsive design
- ✅ Validation complète
- ✅ Gestion d'erreurs

**Il ne reste qu'à uploader vos premières images ! 📸**

---

## 💡 Conseils

### Pour de Meilleures Images
1. **Utilisez des images carrées** pour l'image principale
2. **Qualité** : 1000x1000px minimum
3. **Format** : JPG ou WebP pour la performance
4. **Taille** : Compression avant upload (max 5MB)

### Pour les Images Additionnelles
1. **Variété** : Différents angles du produit
2. **Ordre** : L'ordre d'upload = ordre d'affichage
3. **Cohérence** : Même style pour toutes les images

---

**Bon upload ! 🎉**
