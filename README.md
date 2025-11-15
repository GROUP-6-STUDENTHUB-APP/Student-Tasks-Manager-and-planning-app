# StudentHub - Gestion des Tâches pour Étudiants

Application web moderne pour la gestion des tâches, permettant aux étudiants d'ajouter, visualiser, modifier et supprimer leurs tâches.

## Fonctionnalités

- ✅ **Ajouter des tâches** : Créez de nouvelles tâches avec titre, description, priorité et date limite
- 👁️ **Visualiser les tâches** : Consultez toutes vos tâches avec leurs détails
- ✏️ **Modifier des tâches** : Modifiez les informations de vos tâches existantes
- 🗑️ **Supprimer des tâches** : Supprimez les tâches dont vous n'avez plus besoin
- ✅ **Marquer comme terminé** : Cochez les tâches accomplies
- 🎯 **Priorités** : Organisez vos tâches par priorité (Basse, Moyenne, Haute)
- 📅 **Dates limites** : Ajoutez des dates limites et recevez des alertes pour les tâches en retard
- 💾 **Stockage local** : Toutes vos tâches sont sauvegardées localement dans votre navigateur

## Technologies utilisées

- **React 18** : Bibliothèque JavaScript pour l'interface utilisateur
- **TypeScript** : Typage statique pour un code plus robuste
- **Vite** : Outil de build rapide et moderne
- **CSS3** : Styles modernes et responsives

## Installation

1. Clonez le dépôt ou téléchargez le projet

2. Installez les dépendances :
```bash
npm install
```

## Démarrage

Lancez l'application en mode développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

## Build pour production

Pour créer une version optimisée pour la production :

```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`

Pour prévisualiser la build de production :

```bash
npm run preview
```

## Structure du projet

```
studenthub/
├── src/
│   ├── components/       # Composants React
│   │   ├── TaskForm.tsx  # Formulaire d'ajout/modification
│   │   ├── TaskList.tsx  # Liste des tâches
│   │   └── TaskItem.tsx  # Élément de tâche individuel
│   ├── types/            # Définitions TypeScript
│   │   └── task.ts       # Type Task
│   ├── App.tsx           # Composant principal
│   ├── App.css           # Styles de l'application
│   ├── main.tsx          # Point d'entrée
│   └── index.css         # Styles globaux
├── index.html            # Fichier HTML principal
├── package.json          # Dépendances et scripts
├── tsconfig.json         # Configuration TypeScript
└── vite.config.ts        # Configuration Vite
```

## Utilisation

1. **Ajouter une tâche** :
   - Remplissez le formulaire en haut de la page
   - Indiquez un titre (obligatoire)
   - Ajoutez une description (optionnelle)
   - Sélectionnez une priorité
   - Ajoutez une date limite si nécessaire
   - Cliquez sur "Ajouter"

2. **Modifier une tâche** :
   - Cliquez sur l'icône ✏️ à côté de la tâche
   - Modifiez les informations dans le formulaire
   - Cliquez sur "Mettre à jour"

3. **Marquer comme terminé** :
   - Cochez la case à gauche de la tâche
   - Ou modifiez la tâche et cochez "Tâche terminée"

4. **Supprimer une tâche** :
   - Cliquez sur l'icône 🗑️ à côté de la tâche
   - Confirmez la suppression

## Notes

- Les tâches sont triées automatiquement : non terminées en premier, puis par priorité, puis par date
- Les tâches en retard sont mises en évidence en rouge
- Toutes les données sont stockées localement dans le navigateur (localStorage)

## Licence

Ce projet est libre d'utilisation à des fins éducatives.

