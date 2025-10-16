# Guide de Configuration Appwrite pour Scentsation Admin

## 1. Créer la base de données

1. Connectez-vous à votre console Appwrite : https://fra.cloud.appwrite.io/
2. Sélectionnez votre projet "Scentsation"
3. Allez dans **Databases** dans le menu latéral
4. Cliquez sur **Create Database**
5. Nommez-la "scentsation-db"
6. Copiez l'ID de la database et ajoutez-le dans `.env` comme `NEXT_PUBLIC_APPWRITE_DATABASE_ID`

## 2. Créer la collection Products

1. Dans votre database, cliquez sur **Create Collection**
2. Nommez-la "products"
3. Copiez l'ID de la collection et ajoutez-le dans `.env` comme `NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID`

### Attributs à créer :

Cliquez sur **Attributes** puis ajoutez les attributs suivants :

| Nom | Type | Taille | Requis | Array | Défaut |
|-----|------|--------|--------|-------|--------|
| titre | String | 255 | Oui | Non | - |
| marque | String | 100 | Oui | Non | - |
| description | String | 5000 | Oui | Non | - |
| sexe | Enum: Homme, Femme, Mixte | - | Oui | Non | Mixte |
| contenance | String | 50 | Oui | Non | - |
| prix | Float | - | Oui | Non | - |
| categorie | Enum: Parfums, Huiles de Parfum, Déodorants | - | Oui | Non | Parfums |
| rating | Float | - | Non | Non | 0 |
| ratings | Integer | - | Non | Non | 0 |
| image | URL | 2000 | Oui | Non | - |
| images | String | 500 | Non | Oui | - |
| inStock | Boolean | - | Non | Non | true |
| isNew | Boolean | - | Non | Non | false |
| isBestSeller | Boolean | - | Non | Non | false |

### Permissions :

1. Allez dans **Settings** de la collection
2. Dans **Permissions** :
   - **Read** : Ajoutez "Any" (pour que tout le monde puisse voir les produits)
   - **Create, Update, Delete** : Ne rien ajouter (seuls les admins via API peuvent modifier)

## 3. Créer un compte admin dans Appwrite

1. Allez dans **Auth** dans le menu latéral
2. Cliquez sur **Create User**
3. Email : `latioms@gmail.com`
4. Password : `@Difficile21`
5. Name : "Admin Scentsation"

## 4. Variables d'environnement

Vérifiez que votre fichier `.env` contient :

```env
NEXT_PUBLIC_APPWRITE_PROJECT_ID="68efdecc00110b8011f6"
NEXT_PUBLIC_APPWRITE_PROJECT_NAME="Scentsation"
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://fra.cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_DATABASE_ID="[ID de votre database]"
NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID="[ID de votre collection products]"

SESSION_SECRET="clientSecretSession"
RESEND_API_KEY="re_edPG3NyZ_F8XxoZxj8RhWMWq9CNaxaUcS"

ADMIN_EMAIL_ID="latioms@gmail.com"
ADMIN_EMAIL_PASSWORD="@Difficile21"
```

## 5. Tester l'admin

1. Redémarrez votre serveur de développement
2. Allez sur http://localhost:3000/admin
3. Connectez-vous avec :
   - Email : latioms@gmail.com
   - Password : @Difficile21
4. Vous devriez accéder au dashboard admin

## Fonctionnalités disponibles :

✅ **Connexion sécurisée** - Seul l'admin peut se connecter
✅ **Créer des produits** - Formulaire complet avec tous les champs
✅ **Gérer les catégories** - Vue des catégories disponibles
✅ **Liste des produits** - Affichage de tous les produits avec actions
✅ **Supprimer des produits** - Avec confirmation
✅ **Interface moderne** - Design épuré et intuitif
✅ **Protection des routes** - Middleware pour sécuriser l'accès

## Notes importantes :

- Les utilisateurs normaux ne peuvent **PAS** accéder à l'admin
- Seul l'email dans `ADMIN_EMAIL_ID` peut se connecter
- Les produits sont visibles publiquement mais modifiables uniquement par l'admin
- Les sessions durent 24 heures
