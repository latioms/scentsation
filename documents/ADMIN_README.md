# 🎯 Système Admin Scentsation

## 📋 Vue d'ensemble

Le système admin de Scentsation est une interface sécurisée permettant de gérer les produits et catégories du site. Seul l'administrateur autorisé peut y accéder.

## 🔐 Sécurité

### Authentification
- **Un seul utilisateur admin** défini dans `.env`
- Authentification via Appwrite
- Sessions JWT sécurisées (durée : 24h)
- Middleware pour protéger les routes

### Accès
- URL : `/admin`
- Redirection automatique vers `/admin/login` si non connecté
- Les utilisateurs non-admin sont redirigés vers la page d'accueil

## 🚀 Fonctionnalités

### 1. Dashboard Admin (`/admin/dashboard`)
Interface principale avec trois sections :

#### 📦 Créer un produit
Formulaire complet avec :
- Titre, marque, description
- Sexe (Homme/Femme/Mixte)
- Catégorie (Parfums/Huiles de Parfum/Déodorants)
- Contenance (50ml, 100ml, etc.)
- Prix en XAF
- Images (principale + additionnelles)
- Options : En stock, Nouveau, Best Seller

#### 🏷️ Gérer les catégories
- Affichage des catégories disponibles
- Les catégories sont définies dans le système de types

#### 📋 Liste des produits
- Affichage en grille avec images
- Actions : Modifier, Supprimer
- Filtres et recherche (à venir)

## 📁 Structure des fichiers

```
app/
├── admin/
│   ├── page.tsx                    # Redirection vers /login
│   ├── login/
│   │   └── page.tsx                # Page de connexion
│   └── dashboard/
│       └── page.tsx                # Dashboard principal
├── api/
│   └── admin/
│       └── products/
│           ├── route.ts            # GET, POST produits
│           └── [id]/
│               └── route.ts        # PUT, DELETE produit

components/
└── admin/
    ├── AdminDashboard.tsx          # Interface principale
    ├── CreateProductForm.tsx       # Formulaire création
    ├── CreateCategoryForm.tsx      # Gestion catégories
    └── ProductsList.tsx            # Liste des produits

lib/
├── adminAuth.ts                    # Vérification admin
├── session.ts                      # Gestion JWT
└── appwrite.ts                     # Client Appwrite

middleware.ts                       # Protection des routes
```

## 🛠️ Configuration

### 1. Variables d'environnement

```env
# Appwrite
NEXT_PUBLIC_APPWRITE_PROJECT_ID="..."
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://fra.cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_DATABASE_ID="..."
NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID="..."

# Admin
ADMIN_EMAIL_ID="votre@email.com"
ADMIN_EMAIL_PASSWORD="votre_mot_de_passe"

# Session
SESSION_SECRET="votre_secret_jwt"
```

### 2. Configuration Appwrite

Suivez le guide détaillé dans `APPWRITE_SETUP.md` pour :
- Créer la database
- Créer la collection products avec les bons attributs
- Configurer les permissions
- Créer le compte admin

## 💻 Utilisation

### Connexion
1. Allez sur `/admin`
2. Entrez vos identifiants admin
3. Vous êtes redirigé vers le dashboard

### Créer un produit
1. Cliquez sur "Créer un produit"
2. Remplissez le formulaire
3. Cochez les options (En stock, Nouveau, etc.)
4. Cliquez sur "Créer le produit"

### Gérer les produits
1. Cliquez sur "Voir les produits"
2. Pour modifier : cliquez sur "Modifier"
3. Pour supprimer : cliquez sur l'icône poubelle

### Déconnexion
Cliquez sur "Déconnexion" en haut à droite

## 🎨 Design

L'interface utilise :
- **Tailwind CSS** pour le styling
- **Shadcn/ui** pour les composants
- **Design épuré** avec gradients et animations
- **Mode sombre** supporté
- **Responsive** (mobile, tablette, desktop)

## 🔒 Sécurité des routes

Le middleware vérifie :
1. Si l'utilisateur a une session valide
2. Si l'email correspond à `ADMIN_EMAIL_ID`
3. Redirige vers `/admin/login` ou `/` selon le cas

## 📝 À venir

- [ ] Upload d'images direct dans Appwrite Storage
- [ ] Modification de produits existants
- [ ] Filtres et recherche dans la liste
- [ ] Statistiques et analytics
- [ ] Gestion des commandes
- [ ] Système de notifications

## 🐛 Dépannage

### "Accès refusé"
- Vérifiez que votre email correspond à `ADMIN_EMAIL_ID`
- Vérifiez que le mot de passe est correct dans Appwrite

### "Erreur de connexion"
- Vérifiez la configuration Appwrite
- Vérifiez que le compte existe dans Appwrite Auth

### Les produits ne s'affichent pas
- Vérifiez les IDs de database et collection dans `.env`
- Vérifiez les permissions de la collection Appwrite

## 📞 Support

Pour toute question sur l'admin, consultez :
- `APPWRITE_SETUP.md` pour la configuration
- `GUIDE.md` pour le projet général
