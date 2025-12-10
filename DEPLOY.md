# Guide de Déploiement sur Vercel

## Méthode 1 : Déploiement via Vercel CLI (Recommandé)

### Prérequis
- Node.js installé
- Compte Vercel (gratuit)

### Étapes

1. **Installer Vercel CLI globalement**
```bash
npm install -g vercel
```

2. **Se connecter à Vercel**
```bash
vercel login
```

3. **Déployer le projet**
```bash
vercel
```

4. **Pour un déploiement en production**
```bash
vercel --prod
```

## Méthode 2 : Déploiement via GitHub (Recommandé pour les équipes)

### Étapes

1. **Créer un dépôt GitHub**
   - Aller sur https://github.com/organizations/GROUP-6-STUDENTHUB
   - Créer un nouveau dépôt nommé `studenthub`

2. **Pousser le code sur GitHub**
```bash
git init
git add .
git commit -m "Initial commit - StudentHub application"
git branch -M main
git remote add origin https://github.com/GROUP-6-STUDENTHUB/studenthub.git
git push -u origin main
```

3. **Connecter à Vercel**
   - Aller sur https://vercel.com
   - Cliquer sur "Add New Project"
   - Importer le dépôt GitHub `GROUP-6-STUDENTHUB/studenthub`
   - Vercel détectera automatiquement la configuration
   - Cliquer sur "Deploy"

4. **Configuration automatique**
   - Vercel détectera automatiquement que c'est un site statique
   - Le déploiement se fera automatiquement
   - Vous recevrez une URL de déploiement

## Méthode 3 : Déploiement via Interface Web Vercel

1. **Aller sur https://vercel.com**
2. **Cliquer sur "Add New Project"**
3. **Glisser-déposer le dossier du projet** ou utiliser GitHub
4. **Vercel détectera automatiquement la configuration**
5. **Cliquer sur "Deploy"**

## Configuration GitHub Pages (Alternative)

Si vous préférez GitHub Pages :

1. **Pousser le code sur GitHub** (voir Méthode 2, étape 2)

2. **Aller dans les paramètres du dépôt**
   - Settings → Pages

3. **Configurer GitHub Pages**
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

4. **Votre site sera disponible sur**
   - `https://GROUP-6-STUDENTHUB.github.io/studenthub/`

## Notes Importantes

- **Vercel** offre un déploiement automatique à chaque push sur GitHub
- **GitHub Pages** est gratuit mais nécessite un dépôt public
- Les deux plateformes supportent les sites statiques HTML/CSS/JS
- Vercel offre de meilleures performances et un CDN global

## Support

Pour toute question, consultez :
- Documentation Vercel : https://vercel.com/docs
- Documentation GitHub Pages : https://docs.github.com/pages

