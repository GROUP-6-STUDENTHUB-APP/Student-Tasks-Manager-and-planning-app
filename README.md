<<<<<<< HEAD
# StudentHub - Academic Management Web Application

A modern, responsive web application designed for computer engineering students and all students to manage their academic tasks, calculate GPA, and plan their studies effectively.

## 🌟 Features

### Core Functionality
- ✅ **User Authentication** - Registration and login system
- ✅ **Task Management** - Create, edit, delete, and organize academic tasks
- ✅ **GPA Calculator** - Calculate and track your GPA with course management
- ✅ **Study Planner** - Plan and schedule study sessions
- ✅ **Dashboard** - Overview of tasks, deadlines, and academic progress
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### Task Management Features
- Create tasks with title, category, priority, course, due date, and description
- Filter tasks by category, status, and priority
- Mark tasks as completed
- Visual indicators for overdue tasks
- Organize tasks by courses and subjects

### GPA Calculator Features
- Add courses with grades and credits
- Automatic GPA calculation
- Track total credits and grade points
- View course history
- Edit and delete courses

### Study Plan Features
- Weekly calendar view
- Schedule study sessions with time slots
- Different session types (study, review, practice, project, exam prep)
- Visual calendar with session indicators
- Manage study schedule effectively

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser using LocalStorage

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Register a new account or use existing credentials

### File Structure

```
studenthub/
├── index.html              # Landing page
├── login.html              # Login page
├── register.html           # Registration page
├── dashboard.html          # Main dashboard
├── tasks.html              # Task management page
├── gpa.html                # GPA calculator page
├── study-plan.html         # Study planner page
├── styles/
│   ├── main.css           # Main stylesheet
│   ├── auth.css           # Authentication page styles
│   ├── dashboard.css     # Dashboard styles
│   ├── tasks.css          # Task management styles
│   ├── gpa.css            # GPA calculator styles
│   └── study-plan.css     # Study planner styles
├── scripts/
│   ├── main.js            # Main JavaScript
│   ├── auth.js            # Authentication logic
│   ├── dashboard.js       # Dashboard functionality
│   ├── tasks.js           # Task management logic
│   ├── gpa.js             # GPA calculator logic
│   └── study-plan.js      # Study planner logic
└── README.md              # This file
```

## 📱 Usage

### Registration
1. Click "Get Started" on the homepage
2. Fill in your details (name, email, student ID, major, password)
3. Click "Create Account"
4. You'll be automatically logged in and redirected to the dashboard

### Managing Tasks
1. Navigate to "Tasks" from the sidebar
2. Click "Add Task" to create a new task
3. Fill in task details (title, category, priority, due date, etc.)
4. Use filters to find specific tasks
5. Mark tasks as complete or edit/delete them as needed

### Calculating GPA
1. Go to "GPA Calculator"
2. Add courses with their grades and credits
3. Your GPA will be calculated automatically
4. View your total credits and grade points
5. Edit or delete courses as needed

### Planning Study Sessions
1. Navigate to "Study Plan"
2. Click "Add Study Session"
3. Fill in session details (title, subject, date, time, type)
4. View your sessions in the weekly calendar
5. Manage your study schedule effectively

## 🎨 Design Features

- **Modern UI/UX** - Clean, intuitive interface inspired by popular productivity apps
- **Responsive Design** - Fully responsive for all device sizes
- **Beautiful Color Scheme** - Professional gradient colors and modern styling
- **Smooth Animations** - Engaging transitions and hover effects
- **Icon Integration** - Font Awesome icons for better visual communication
- **Accessibility** - Semantic HTML and proper form labels

## 💾 Data Storage

The application uses **LocalStorage** to store all data locally in your browser. This means:
- Your data persists between sessions
- No server or database required
- Data is stored locally on your device
- Each user's data is isolated

**Note:** Data is stored per browser. If you clear browser data, your information will be lost.

## 🔒 Security Notes

This is a client-side only application for educational purposes. In a production environment:
- Passwords should be hashed
- Authentication should use secure tokens
- Data should be stored in a secure database
- HTTPS should be used for all connections

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📝 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Vanilla JavaScript, no frameworks
- **Font Awesome** - Icons
- **LocalStorage API** - Data persistence

## 🎯 Future Enhancements

Potential features for future versions:
- Cloud synchronization
- Mobile app version
- Dark mode
- Export/import data
- Calendar integration
- Reminder notifications
- Collaboration features
- AI-powered study recommendations

## 📄 License

This project is created for educational purposes as part of a web development course.

## 👥 Credits

Developed for Computer Engineering students and all students who want to excel academically.

## 🐛 Troubleshooting

### Data not persisting?
- Make sure cookies/localStorage is enabled in your browser
- Check browser console for any errors

### Styles not loading?
- Ensure all CSS files are in the `styles/` folder
- Check that file paths are correct

### JavaScript not working?
- Open browser console (F12) to check for errors
- Ensure all JavaScript files are in the `scripts/` folder
- Make sure Font Awesome CDN is accessible

## 📞 Support

For issues or questions, please check:
- Browser console for error messages
- File structure matches the expected layout
- All dependencies are loaded correctly

---

**Made with ❤️ for students**

=======
<<<<<<< HEAD
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

=======
# Student-Tasks-Manager-and-planning-app
>>>>>>> 59975e4588f8c39cf262ae30128bb69660a89416
>>>>>>> 7eb5869a2d91ed7baa8c1e50037964251267ba6b
