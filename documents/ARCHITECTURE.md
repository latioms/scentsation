# 🏗️ Architecture du Système Admin Scentsation

```
┌─────────────────────────────────────────────────────────────┐
│                    UTILISATEUR                               │
│                    (Navigateur)                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   MIDDLEWARE                                 │
│  ┌──────────────────────────────────────────────────┐      │
│  │  middleware.ts                                    │      │
│  │  • Vérifie la session JWT                        │      │
│  │  • Vérifie l'email admin                         │      │
│  │  • Redirige si non autorisé                      │      │
│  └──────────────────────────────────────────────────┘      │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
┌──────────────────┐        ┌──────────────────┐
│  PAGES PUBLIQUES │        │   PAGES ADMIN    │
│                  │        │   (Protégées)    │
│  /               │        │                  │
│  /products       │        │  /admin/login    │
│  /collections    │        │  /admin/dashboard│
└──────────────────┘        └────────┬─────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    ▼                                  ▼
        ┌──────────────────────┐          ┌──────────────────────┐
        │  COMPOSANTS ADMIN    │          │     API ROUTES       │
        │                      │          │                      │
        │  AdminDashboard      │◄─────────│  /api/admin/products │
        │  CreateProductForm   │          │                      │
        │  ProductsList        │          │  • GET (liste)       │
        │  CreateCategoryForm  │          │  • POST (créer)      │
        └──────────┬───────────┘          │  • PUT (modifier)    │
                   │                      │  • DELETE (supprimer)│
                   │                      └──────────┬───────────┘
                   │                                 │
                   │                                 │
                   │          ┌──────────────────────┘
                   │          │
                   │          ▼
                   │  ┌──────────────────┐
                   │  │  SÉCURITÉ        │
                   │  │                  │
                   └─►│  requireAdmin()  │
                      │  isAdmin()       │
                      │  getSession()    │
                      └────────┬─────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   APPWRITE           │
                    │                      │
                    │  • Authentication    │
                    │  • Database          │
                    │  • Collections       │
                    │    - Products        │
                    └──────────────────────┘
```

## 🔒 Flux de Sécurité

### Connexion Admin

```
/admin → Redirect → /admin/login
                          ↓
                    [Formulaire]
                          ↓
                    createSession(email, password)
                          ↓
                    Appwrite Auth
                          ↓
                    ✅ Session créée
                          ↓
                    signToken (JWT)
                          ↓
                    Cookie 'session' (httpOnly, secure)
                          ↓
                    Redirect → /admin/dashboard
```

### Accès Dashboard

```
GET /admin/dashboard
        ↓
   Middleware
        ↓
   getSession() → Décode JWT
        ↓
   Session valide ?
        ↓ Non → Redirect /admin/login
        ↓ Oui
   Email = ADMIN_EMAIL_ID ?
        ↓ Non → Redirect /
        ↓ Oui
   ✅ Accès autorisé → Dashboard
```

### Création de Produit

```
[Formulaire CreateProductForm]
        ↓
   Submit données
        ↓
   POST /api/admin/products
        ↓
   requireAdmin() → Vérifie session & email
        ↓
   ✅ Autorisé
        ↓
   databases.createDocument()
        ↓
   Appwrite Database
        ↓
   ✅ Produit créé
        ↓
   Response 201 → Formulaire
        ↓
   Message succès + Reset
```

## 📊 Structure des Données

### Session (JWT)

```typescript
{
  user: {
    userId: string,
    email: string,
    ip: string,
    countryName: string
  }
}
```

### Product (Appwrite)

```typescript
{
  id: string,              // Auto-généré
  titre: string,           // Ex: "Sauvage"
  marque: string,          // Ex: "Dior"
  description: string,     // Texte long
  sexe: Enum,             // Homme | Femme | Mixte
  contenance: string,      // Ex: "100ml"
  prix: number,           // Ex: 85000
  categorie: Enum,        // Parfums | Huiles de Parfum | Déodorants
  rating: number,         // 0-5
  ratings: number,        // Nombre de votes
  image: string,          // URL
  images: string[],       // URLs additionnelles
  inStock: boolean,       // true/false
  isNew: boolean,         // true/false
  isBestSeller: boolean   // true/false
}
```

## 🎯 Composants et Responsabilités

### Pages (Server Components)

```
app/
├── admin/page.tsx
│   └── Redirige vers /admin/login
│
├── admin/login/page.tsx
│   └── Client Component
│       └── Formulaire de connexion
│
└── admin/dashboard/page.tsx
    ├── Vérifie isAdmin()
    └── Charge <AdminDashboard />
```

### Composants Admin (Client Components)

```
components/admin/
│
├── AdminDashboard.tsx
│   ├── State: currentView
│   ├── Navigation entre vues
│   ├── Header avec déconnexion
│   └── Affiche:
│       ├── Overview (cards d'actions)
│       ├── CreateProductForm
│       ├── CreateCategoryForm
│       └── ProductsList
│
├── CreateProductForm.tsx
│   ├── Formulaire complet
│   ├── Validation
│   ├── POST /api/admin/products
│   └── Callback onSuccess
│
├── CreateCategoryForm.tsx
│   └── Affichage catégories
│
└── ProductsList.tsx
    ├── Fetch GET /api/admin/products
    ├── Grid de cards
    └── Actions DELETE
```

### API Routes

```
app/api/admin/products/
│
├── route.ts
│   ├── GET → List products
│   │   ├── requireAdmin()
│   │   ├── databases.listDocuments()
│   │   └── Response JSON
│   │
│   └── POST → Create product
│       ├── requireAdmin()
│       ├── databases.createDocument()
│       └── Response 201
│
└── [id]/route.ts
    ├── DELETE → Delete product
    │   ├── requireAdmin()
    │   ├── databases.deleteDocument()
    │   └── Response 200
    │
    └── PUT → Update product
        ├── requireAdmin()
        ├── databases.updateDocument()
        └── Response 200
```

## 🔐 Sécurité Multi-Niveaux

### Niveau 1: Middleware (Route Protection)

```typescript
middleware.ts
  ├── Intercepte /admin/*
  ├── Vérifie session JWT
  ├── Vérifie email admin
  └── Redirige si nécessaire
```

### Niveau 2: Page Protection

```typescript
dashboard/page.tsx
  ├── isAdmin()
  │   ├── getSession()
  │   └── Compare email
  └── redirect() si false
```

### Niveau 3: API Protection

```typescript
requireAdmin()
  ├── getSession()
  ├── Vérifie email === ADMIN_EMAIL_ID
  └── Throw error si false
```

## 🎨 UI/UX Flow

```
┌─────────────────┐
│  /admin/login   │
│                 │
│  [Email]        │
│  [Password]     │
│  [Se connecter] │
└────────┬────────┘
         │ ✅ Connecté
         ▼
┌─────────────────────────────────┐
│  /admin/dashboard               │
│  ┌─────────────────────────┐   │
│  │ Navbar                  │   │
│  │ [Aperçu] [Produits] [⚙]│   │
│  └─────────────────────────┘   │
│                                 │
│  [Créer un produit]  ────────┐ │
│  [Gérer catégories]  ────┐   │ │
│  [Voir les produits] ──┐ │   │ │
│                        │ │   │ │
└────────────────────────┼─┼───┼─┘
                         │ │   │
         ┌───────────────┘ │   │
         │   ┌─────────────┘   │
         │   │   ┌─────────────┘
         ▼   ▼   ▼
    ┌────┐ ┌────┐ ┌────┐
    │Form│ │Catég│ │Liste│
    └────┘ └────┘ └────┘
```

## 📱 Responsive Design

```
Mobile (< 768px)
┌──────────┐
│  Header  │
├──────────┤
│  Card    │
│  Card    │
│  Card    │
└──────────┘

Tablet (768px - 1024px)
┌────────────────┐
│    Header      │
├────────────────┤
│  Card │ Card   │
│  Card │ Card   │
└────────────────┘

Desktop (> 1024px)
┌──────────────────────┐
│      Header          │
├──────────────────────┤
│ Card │ Card │ Card   │
│ Card │ Card │ Card   │
└──────────────────────┘
```

## 🚀 Flux de Données

### Création de Produit

```
User Input
    ↓
React State (formData)
    ↓
Submit Event
    ↓
fetch POST /api/admin/products
    ↓
API Route
    ↓
requireAdmin()
    ↓
Appwrite createDocument()
    ↓
Database
    ↓
Response
    ↓
Success Message
    ↓
Form Reset
```

### Liste de Produits

```
Component Mount
    ↓
useEffect
    ↓
fetch GET /api/admin/products
    ↓
API Route
    ↓
requireAdmin()
    ↓
Appwrite listDocuments()
    ↓
Database
    ↓
Response (products[])
    ↓
setState(products)
    ↓
Render Grid
```

---

**Architecture complète et sécurisée ! 🎉**

Tous les éléments communiquent de manière cohérente avec une sécurité à chaque niveau.
