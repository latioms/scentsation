# 📂 Comment Ajouter des Catégories - Guide Visuel

## 🎯 Deux Façons de Gérer les Catégories

---

## ✅ Méthode 1 : Via le Dashboard (RECOMMANDÉ)

### Étape 1 : Aller sur le Dashboard
```
http://localhost:3000/admin/dashboard
```

### Étape 2 : Cliquer sur "Gérer les catégories"
Dans la page d'aperçu, tu verras une card :

```
┌─────────────────────────────────┐
│  🏷️                             │
│                                 │
│  Gérer les catégories           │
│  Organisez vos produits par     │
│  catégories                     │
└─────────────────────────────────┘
```

**Clique dessus !**

### Étape 3 : Interface de Gestion
Tu arrives sur une interface avec :

```
┌──────────────────────────────────────────┐
│  Catégories            [+ Nouvelle cat.] │
│  0 catégorie                              │
├──────────────────────────────────────────┤
│                                           │
│  ┌────────────────────────────────────┐  │
│  │  📂                                │  │
│  │  Aucune catégorie                  │  │
│  │                                     │  │
│  │  Commencez par créer votre         │  │
│  │  première catégorie                │  │
│  │                                     │  │
│  │  [+ Créer une catégorie]           │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### Étape 4 : Créer une Catégorie

1. **Cliquer** sur "**+ Nouvelle catégorie**" (en haut à droite)
2. Un **champ d'input** apparaît :
   ```
   ┌─────────────────────────────────┐
   │ [Nom de la catégorie...]  [✓] [✗]│
   └─────────────────────────────────┘
   ```
3. **Taper** le nom (ex: "Homme")
4. **Appuyer** sur Enter ou cliquer sur **✓**
5. ✅ **Catégorie créée !**

### Étape 5 : Répéter
```
Créer plusieurs catégories :
  → Homme
  → Femme
  → Unisexe
  → Boisé
  → Floral
  → etc.
```

---

## ✅ Méthode 2 : Page Dédiée

### Aller directement sur :
```
http://localhost:3000/admin/categories
```

Tu arrives directement sur l'interface de gestion des catégories !

---

## 🎨 Interface Complète

Une fois des catégories créées, l'interface ressemble à ça :

```
┌──────────────────────────────────────────────────┐
│  Catégories                  [+ Nouvelle catég.] │
│  3 catégories                                    │
├──────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Homme    │  │ Femme    │  │ Unisexe  │      │
│  │ 16 oct.  │  │ 16 oct.  │  │ 16 oct.  │      │
│  │ [✏️] [🗑️] │  │ [✏️] [🗑️] │  │ [✏️] [🗑️] │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└──────────────────────────────────────────────────┘
```

---

## 🎯 Actions Disponibles

### ➕ Créer
```
1. Cliquer "+ Nouvelle catégorie"
2. Taper le nom
3. Enter ou ✓
```

### ✏️ Modifier
```
1. Cliquer sur ✏️ d'une catégorie
2. Modifier le texte
3. Enter ou ✓
```

### 🗑️ Supprimer
```
1. Cliquer sur 🗑️ d'une catégorie
2. Confirmer la suppression
```

---

## 📱 Responsive

### Desktop (>1024px)
```
┌────────────────────────────────────┐
│  ┌────┐  ┌────┐  ┌────┐           │
│  │ 1  │  │ 2  │  │ 3  │  (3 col)  │
│  └────┘  └────┘  └────┘           │
└────────────────────────────────────┘
```

### Tablette (768-1024px)
```
┌──────────────────────┐
│  ┌────┐  ┌────┐      │
│  │ 1  │  │ 2  │      │  (2 col)
│  └────┘  └────┘      │
│  ┌────┐              │
│  │ 3  │              │
│  └────┘              │
└──────────────────────┘
```

### Mobile (<768px)
```
┌──────────┐
│  ┌────┐  │
│  │ 1  │  │  (1 col)
│  └────┘  │
│  ┌────┐  │
│  │ 2  │  │
│  └────┘  │
│  ┌────┐  │
│  │ 3  │  │
│  └────┘  │
└──────────┘
```

---

## 🔗 Intégration avec Produits

Une fois les catégories créées, elles apparaissent **automatiquement** dans le formulaire de création de produits :

```
Créer un produit
  ↓
Champ "Catégorie"
  ↓
┌────────────────────┐
│ Catégorie *    ▼  │
├────────────────────┤
│ Homme              │ ← Chargées auto!
│ Femme              │
│ Unisexe            │
└────────────────────┘
```

---

## ⏱️ Workflow Complet

```
1️⃣ Login
   /admin/login
   ↓
2️⃣ Dashboard
   /admin/dashboard
   ↓
3️⃣ Cliquer "Gérer les catégories"
   ↓
4️⃣ Créer 3-5 catégories
   (Homme, Femme, Unisexe, etc.)
   ↓
5️⃣ Retour au Dashboard
   ↓
6️⃣ Cliquer "Créer un produit"
   ↓
7️⃣ Les catégories sont déjà là !
   ↓
8️⃣ Sélectionner une catégorie
   ↓
9️⃣ Remplir le reste du formulaire
   ↓
🔟 Soumettre
   ↓
✅ Produit créé avec sa catégorie !
```

---

## 💡 Conseils

### Catégories Recommandées pour Parfums

**Par Genre :**
- Homme
- Femme
- Unisexe

**Par Famille Olfactive :**
- Boisé
- Floral
- Oriental
- Frais
- Épicé
- Fruité
- Aquatique

**Par Type de Produit :**
- Eau de Parfum
- Eau de Toilette
- Parfum
- Cologne

### Organisation
Tu peux utiliser **Sexe + Catégorie** :
- **Sexe** : Homme/Femme/Unisexe (pour qui ?)
- **Catégorie** : Boisé/Floral/Oriental (quelle famille ?)

---

## 🎉 C'est Simple !

L'interface est **intuitive** et **mobile-friendly** :
- ✅ Édition inline (pas de modal)
- ✅ Validation instantanée
- ✅ Messages de succès/erreur
- ✅ Responsive design

---

**Commence maintenant à créer tes catégories ! 📂✨**
