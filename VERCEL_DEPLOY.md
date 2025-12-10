# 🚀 Guide de Déploiement Vercel - StudentHub

## Option 1 : Déploiement Direct via Vercel CLI (Le Plus Rapide)

### Étape 1 : Installer Vercel CLI
```bash
npm install -g vercel
```

### Étape 2 : Se connecter à Vercel
```bash
vercel login
```
Suivez les instructions dans le navigateur pour vous connecter.

### Étape 3 : Déployer depuis le dossier du projet
```bash
cd "E:\suden hub23"
vercel
```

Répondez aux questions :
- **Set up and deploy?** → Y
- **Which scope?** → Sélectionnez votre compte ou organisation
- **Link to existing project?** → N (pour le premier déploiement)
- **Project name?** → studenthub (ou appuyez sur Entrée pour le nom par défaut)
- **Directory?** → . (point pour le répertoire actuel)

### Étape 4 : Déployer en production
```bash
vercel --prod
```

Votre application sera disponible sur une URL comme : `https://studenthub.vercel.app`

---

## Option 2 : Déploiement via GitHub + Vercel (Recommandé pour l'équipe)

### Étape 1 : Créer le dépôt sur GitHub

1. Allez sur : https://github.com/organizations/GROUP-6-STUDENTHUB
2. Cliquez sur "New repository"
3. Nom du dépôt : `studenthub`
4. Description : "StudentHub - Academic Management Web Application"
5. Visibilité : Public (pour GitHub Pages gratuit) ou Private
6. **NE PAS** cocher "Initialize with README" (nous avons déjà les fichiers)
7. Cliquez sur "Create repository"

### Étape 2 : Connecter le dépôt local à GitHub

```bash
cd "E:\suden hub23"
git remote add origin https://github.com/GROUP-6-STUDENTHUB/studenthub.git
git branch -M main
git push -u origin main
```

Si vous avez besoin d'authentification, utilisez un Personal Access Token.

### Étape 3 : Connecter GitHub à Vercel

1. Allez sur https://vercel.com
2. Cliquez sur "Add New Project" ou "Import Project"
3. Cliquez sur "Import" à côté de GitHub
4. Autorisez Vercel à accéder à votre organisation GitHub si nécessaire
5. Sélectionnez le dépôt `GROUP-6-STUDENTHUB/studenthub`
6. Cliquez sur "Import"

### Étape 4 : Configuration Vercel

Vercel détectera automatiquement :
- **Framework Preset** : Other (site statique)
- **Root Directory** : ./
- **Build Command** : (vide, pas besoin de build)
- **Output Directory** : (vide)

Cliquez sur "Deploy"

### Étape 5 : Déploiement automatique

- Chaque push sur la branche `main` déclenchera un nouveau déploiement
- Vous recevrez une URL de production : `https://studenthub-xxx.vercel.app`
- Vous pouvez ajouter un domaine personnalisé dans les paramètres

---

## Option 3 : Déploiement via Interface Web Vercel (Sans CLI)

### Étape 1 : Préparer le projet

Assurez-vous que tous les fichiers sont dans le dossier :
```
E:\suden hub23\
```

### Étape 2 : Déployer via l'interface

1. Allez sur https://vercel.com
2. Cliquez sur "Add New Project"
3. Cliquez sur "Browse" ou glissez-déposez le dossier du projet
4. OU connectez-vous à GitHub et importez le dépôt
5. Vercel détectera automatiquement la configuration
6. Cliquez sur "Deploy"

---

## Configuration Avancée

### Domaine Personnalisé

1. Dans Vercel Dashboard → Settings → Domains
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions DNS

### Variables d'Environnement

Pour l'instant, l'application n'utilise pas de variables d'environnement car tout est stocké dans LocalStorage côté client.

### Build Settings

Le fichier `vercel.json` est déjà configuré pour :
- Servir les fichiers statiques HTML/CSS/JS
- Headers de sécurité
- Routing approprié

---

## Vérification du Déploiement

Après le déploiement, vérifiez :

1. ✅ La page d'accueil se charge
2. ✅ Les styles CSS sont appliqués
3. ✅ Les scripts JavaScript fonctionnent
4. ✅ La navigation entre les pages fonctionne
5. ✅ L'authentification fonctionne (LocalStorage)
6. ✅ Toutes les fonctionnalités sont accessibles

---

## Support

- Documentation Vercel : https://vercel.com/docs
- Support Vercel : https://vercel.com/support
- GitHub Organization : https://github.com/organizations/GROUP-6-STUDENTHUB

---

## Notes Importantes

⚠️ **LocalStorage** : Les données sont stockées dans le navigateur de l'utilisateur, pas sur le serveur. Chaque utilisateur aura ses propres données locales.

✅ **Gratuit** : Vercel offre un plan gratuit généreux pour les projets personnels et éducatifs.

🚀 **Performance** : Vercel utilise un CDN global pour une performance optimale partout dans le monde.

