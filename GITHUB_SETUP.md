# 📦 Configuration GitHub pour StudentHub

## Étapes pour pousser le code sur GitHub Organization

### 1. Créer le dépôt sur GitHub

1. Allez sur : https://github.com/organizations/GROUP-6-STUDENTHUB
2. Cliquez sur "New repository" (ou le bouton "+" → "New repository")
3. Remplissez les informations :
   - **Repository name** : `studenthub`
   - **Description** : `StudentHub - Academic Management Web Application for Computer Engineering Students`
   - **Visibility** : Public (recommandé pour GitHub Pages) ou Private
   - **NE PAS** cocher "Add a README file" (nous avons déjà un README)
   - **NE PAS** ajouter .gitignore ou license (nous les avons déjà)
4. Cliquez sur "Create repository"

### 2. Connecter le dépôt local à GitHub

Exécutez ces commandes dans PowerShell depuis le dossier du projet :

```powershell
cd "E:\suden hub23"

# Ajouter le remote GitHub
git remote add origin https://github.com/GROUP-6-STUDENTHUB/studenthub.git

# Renommer la branche en main (si nécessaire)
git branch -M main

# Pousser le code
git push -u origin main
```

### 3. Authentification GitHub

Si vous êtes invité à vous authentifier :

**Option A : Personal Access Token (Recommandé)**
1. Allez sur : https://github.com/settings/tokens
2. Cliquez sur "Generate new token" → "Generate new token (classic)"
3. Donnez un nom : `StudentHub Deployment`
4. Sélectionnez les scopes : `repo` (tous les droits sur les dépôts)
5. Cliquez sur "Generate token"
6. Copiez le token
7. Utilisez-le comme mot de passe lors du `git push`

**Option B : GitHub CLI**
```powershell
# Installer GitHub CLI
winget install GitHub.cli

# Se connecter
gh auth login

# Pousser le code
git push -u origin main
```

### 4. Vérifier le déploiement

Après avoir poussé le code, vérifiez sur :
- https://github.com/GROUP-6-STUDENTHUB/studenthub

Vous devriez voir tous vos fichiers !

---

## Configuration GitHub Pages (Optionnel)

Si vous voulez utiliser GitHub Pages au lieu de Vercel :

1. Allez dans le dépôt GitHub
2. Cliquez sur "Settings"
3. Dans le menu de gauche, cliquez sur "Pages"
4. Sous "Source", sélectionnez :
   - Branch: `main`
   - Folder: `/ (root)`
5. Cliquez sur "Save"
6. Votre site sera disponible sur :
   - `https://GROUP-6-STUDENTHUB.github.io/studenthub/`

**Note** : GitHub Pages peut prendre quelques minutes pour déployer.

---

## Commandes Git Utiles

```powershell
# Voir l'état du dépôt
git status

# Ajouter tous les fichiers modifiés
git add .

# Créer un commit
git commit -m "Description des changements"

# Pousser vers GitHub
git push

# Voir l'historique des commits
git log

# Voir les remotes configurés
git remote -v
```

---

## Structure du Dépôt GitHub

Votre dépôt devrait contenir :

```
studenthub/
├── .gitignore
├── DEPLOY.md
├── GITHUB_SETUP.md
├── README.md
├── VERCEL_DEPLOY.md
├── package.json
├── vercel.json
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── tasks.html
├── gpa.html
├── study-plan.html
├── scripts/
│   ├── auth.js
│   ├── dashboard.js
│   ├── gpa.js
│   ├── main.js
│   ├── study-plan.js
│   └── tasks.js
└── styles/
    ├── auth.css
    ├── dashboard.css
    ├── gpa.css
    ├── main.css
    ├── study-plan.css
    └── tasks.css
```

---

## Prochaines Étapes

1. ✅ Pousser le code sur GitHub
2. ✅ Connecter GitHub à Vercel (voir VERCEL_DEPLOY.md)
3. ✅ Déployer sur Vercel
4. ✅ Partager l'URL avec votre équipe !

---

## Support

- Documentation GitHub : https://docs.github.com
- GitHub Organization : https://github.com/organizations/GROUP-6-STUDENTHUB

