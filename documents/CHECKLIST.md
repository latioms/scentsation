# ✅ Checklist de Configuration - Admin Scentsation

## 📋 Avant de commencer

- [x] Code admin créé et installé
- [x] Documentation complète disponible
- [ ] Configuration Appwrite à faire
- [ ] Variables .env à mettre à jour
- [ ] Test de connexion à faire

---

## 🔧 Configuration Appwrite

### Étape 1 : Créer la Database
- [ ] Ouvrir https://fra.cloud.appwrite.io/
- [ ] Sélectionner projet "Scentsation"
- [ ] Aller dans **Databases**
- [ ] Cliquer **Create Database**
- [ ] Nom : `scentsation-db`
- [ ] **Copier l'ID** : `_______________________________`
- [ ] Coller dans `.env` → `NEXT_PUBLIC_APPWRITE_DATABASE_ID`

### Étape 2 : Créer la Collection Products
- [ ] Dans la database → **Create Collection**
- [ ] Nom : `products`
- [ ] **Copier l'ID** : `_______________________________`
- [ ] Coller dans `.env` → `NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID`

### Étape 3 : Attributs String
- [ ] `titre` - String - Taille: 255 - Requis ✓
- [ ] `marque` - String - Taille: 100 - Requis ✓
- [ ] `description` - String - Taille: 5000 - Requis ✓
- [ ] `contenance` - String - Taille: 50 - Requis ✓
- [ ] `image` - URL - Taille: 2000 - Requis ✓

### Étape 4 : Attributs Enum
- [ ] `sexe` - Enum
  - Valeurs : `Homme,Femme,Mixte`
  - Requis ✓
  - Défaut : `Mixte`
  
- [ ] `categorie` - Enum
  - Valeurs : `Parfums,Huiles de Parfum,Déodorants`
  - Requis ✓
  - Défaut : `Parfums`

### Étape 5 : Attributs Number
- [ ] `prix` - Float - Requis ✓
- [ ] `rating` - Float - Défaut: 0
- [ ] `ratings` - Integer - Défaut: 0

### Étape 6 : Attributs Boolean
- [ ] `inStock` - Boolean - Défaut: true
- [ ] `isNew` - Boolean - Défaut: false
- [ ] `isBestSeller` - Boolean - Défaut: false

### Étape 7 : Attribut Array
- [ ] `images` - String - Taille: 500 - Array ✓

### Étape 8 : Permissions
- [ ] Aller dans **Settings** de la collection
- [ ] **Permissions** → **Read access** → Ajouter "Any"
- [ ] **Create/Update/Delete** → Laisser vide (admin seulement)

### Étape 9 : Compte Admin
- [ ] Aller dans **Auth**
- [ ] **Create User**
  - Email : `latioms@gmail.com`
  - Password : `@Difficile21`
  - Name : `Admin Scentsation`
- [ ] **Confirmer la création**

---

## 📝 Configuration .env

### Vérifier les variables
```env
✓ NEXT_PUBLIC_APPWRITE_PROJECT_ID="68efdecc00110b8011f6"
✓ NEXT_PUBLIC_APPWRITE_ENDPOINT="https://fra.cloud.appwrite.io/v1"
✓ NEXT_PUBLIC_APPWRITE_PROJECT_NAME="Scentsation"
✓ SESSION_SECRET="clientSecretSession"
✓ RESEND_API_KEY="re_edPG3NyZ_F8XxoZxj8RhWMWq9CNaxaUcS"
✓ ADMIN_EMAIL_ID="latioms@gmail.com"
✓ ADMIN_EMAIL_PASSWORD="@Difficile21"
```

### Ajouter les nouveaux IDs
- [ ] `NEXT_PUBLIC_APPWRITE_DATABASE_ID="[ID étape 1]"`
- [ ] `NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID="[ID étape 2]"`

---

## 🚀 Démarrage

### Redémarrer le serveur
- [ ] Arrêter le serveur (Ctrl+C)
- [ ] Relancer : `npm run dev` ou `pnpm dev`
- [ ] Attendre que le serveur démarre
- [ ] ✅ Ready sur http://localhost:3000

---

## 🧪 Tests

### Test 1 : Connexion Admin
- [ ] Ouvrir http://localhost:3000/admin
- [ ] Redirection vers /admin/login ? ✅
- [ ] Voir le formulaire de connexion ? ✅
- [ ] Entrer email : `latioms@gmail.com`
- [ ] Entrer password : `@Difficile21`
- [ ] Cliquer "Se connecter"
- [ ] Redirection vers /admin/dashboard ? ✅

### Test 2 : Dashboard
- [ ] Voir le header avec "Scentsation Admin" ? ✅
- [ ] Voir les 3 cards d'actions ? ✅
  - [ ] Créer un produit
  - [ ] Gérer les catégories
  - [ ] Voir les produits
- [ ] Bouton "Déconnexion" visible ? ✅

### Test 3 : Créer un Produit
- [ ] Cliquer sur "Créer un produit"
- [ ] Voir le formulaire complet ? ✅
- [ ] Remplir tous les champs :
  ```
  Titre: Test Parfum
  Marque: Test Brand
  Description: Ceci est un test
  Sexe: Mixte
  Catégorie: Parfums
  Contenance: 50ml
  Prix: 50000
  Image: https://via.placeholder.com/300
  ✓ En stock
  ```
- [ ] Cliquer "Créer le produit"
- [ ] Voir message de succès ? ✅
- [ ] Formulaire réinitialisé ? ✅

### Test 4 : Liste des Produits
- [ ] Cliquer sur "Voir les produits"
- [ ] Voir le produit test créé ? ✅
- [ ] Voir l'image, le titre, le prix ? ✅
- [ ] Voir les badges (En stock, etc.) ? ✅
- [ ] Boutons Modifier et Supprimer visibles ? ✅

### Test 5 : Supprimer un Produit
- [ ] Cliquer sur l'icône poubelle
- [ ] Voir la confirmation ? ✅
- [ ] Confirmer la suppression
- [ ] Produit disparu de la liste ? ✅

### Test 6 : Déconnexion
- [ ] Cliquer sur "Déconnexion"
- [ ] Redirection vers /admin/login ? ✅
- [ ] Essayer d'accéder à /admin/dashboard
- [ ] Redirection automatique vers /admin/login ? ✅

### Test 7 : Sécurité
- [ ] Se déconnecter
- [ ] Dans la console, supprimer le cookie 'session'
- [ ] Essayer d'accéder à /admin/dashboard
- [ ] Redirection vers /admin/login ? ✅

---

## 🎯 Résultats Attendus

Si tous les tests passent ✅ :
- ✅ L'admin fonctionne parfaitement
- ✅ La sécurité est opérationnelle
- ✅ Les produits peuvent être créés et supprimés
- ✅ L'interface est fonctionnelle et intuitive

---

## 🐛 En cas de problème

### Problème : "Accès refusé"
**Vérifier :**
- [ ] Compte créé dans Appwrite Auth ?
- [ ] Email exact : `latioms@gmail.com` ?
- [ ] Variable `ADMIN_EMAIL_ID` dans .env ?

### Problème : Erreur "Cannot connect to database"
**Vérifier :**
- [ ] `NEXT_PUBLIC_APPWRITE_DATABASE_ID` correct dans .env ?
- [ ] `NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID` correct ?
- [ ] IDs copiés depuis Appwrite ?

### Problème : "Unauthorized"
**Vérifier :**
- [ ] Permissions de la collection (Read: Any) ?
- [ ] Compte admin créé dans Auth ?
- [ ] Session valide (cookie présent) ?

### Problème : Erreur lors de création produit
**Vérifier :**
- [ ] Tous les attributs créés dans Appwrite ?
- [ ] Types d'attributs corrects ?
- [ ] Champs requis bien marqués ?

---

## 📞 Resources

Si vous êtes bloqué, consultez :
- 📄 `QUICK_START.md` - Guide détaillé
- 📄 `APPWRITE_SETUP.md` - Config Appwrite
- 📄 `ADMIN_README.md` - Documentation complète
- 📄 `ARCHITECTURE.md` - Comprendre le système

---

## ✨ Félicitations !

Si tous les tests passent, vous avez maintenant :
- ✅ Un système admin complet
- ✅ Une interface moderne et sécurisée
- ✅ La possibilité de gérer vos produits
- ✅ Une base solide pour votre boutique

**Prêt à créer votre catalogue ! 🚀**

---

## 📅 Prochaines Étapes (Optionnel)

Après avoir testé l'admin, vous pourrez :
- [ ] Connecter l'affichage des produits sur le site
- [ ] Ajouter l'upload d'images
- [ ] Implémenter la modification de produits
- [ ] Ajouter des filtres et recherche
- [ ] Créer le système de paiement

**Un pas à la fois ! 👍**
