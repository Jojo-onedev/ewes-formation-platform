# EWES - Plateforme de Formation en Électricité (React/Next.js)

## Description
EWES (Entreprise Wendinmanegdé Electricité Sebgo) est une plateforme web moderne de formation professionnelle en électricité, développée avec React.js et Next.js. Elle permet aux utilisateurs de consulter et acheter des formations, et aux administrateurs de gérer le contenu.

## Fonctionnalités

### Pour les utilisateurs :
- 🏠 Page d'accueil avec présentation de l'entreprise
- 📚 Catalogue des formations avec détails complets
- 💳 Système de paiement dual (PayDunya/Orange Money)
- 📞 Page de contact avec intégration WhatsApp
- 📱 Interface responsive et moderne
- ⚡ Navigation fluide avec Next.js

### Pour les administrateurs :
- 🔐 Interface d'administration sécurisée
- ➕ Ajout, modification et suppression de formations
- 📊 Tableau de bord avec statistiques
- 🚀 Gestion des modes de livraison (automatique/manuel)
- 💾 Stockage local des données

## Technologies utilisées

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: LocalStorage (simulation base de données)
- **Routing**: Next.js App Router

## Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
\`\`\`bash
git clone [url-du-projet]
cd ewes-react-platform
\`\`\`

2. **Installer les dépendances**
\`\`\`bash
npm install
# ou
yarn install
\`\`\`

3. **Lancer en mode développement**
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

4. **Accéder à l'application**
- Site web : http://localhost:3000
- Administration : http://localhost:3000/admin/login

## Configuration

### Mot de passe administrateur
Par défaut : `admin123`
À modifier dans `src/context/AdminContext.tsx` ligne 10 :
\`\`\`typescript
const ADMIN_PASSWORD = 'votre_nouveau_mot_de_passe'
\`\`\`

### Données initiales
Les formations d'exemple sont définies dans `src/context/FormationContext.tsx`. Elles sont automatiquement chargées au premier lancement.

## Structure du projet

\`\`\`
src/
├── app/                          # Pages Next.js (App Router)
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Page d'accueil
│   ├── contact/                 # Page de contact
│   ├── formation/[id]/          # Détails formation
│   ├── paiement/[id]/           # Pages de paiement
│   └── admin/                   # Interface d'administration
├── components/                   # Composants réutilisables
│   ├── Layout.tsx               # Layout avec navigation
│   └── FormationCard.tsx        # Carte de formation
├── context/                     # Gestion d'état global
│   ├── FormationContext.tsx     # Context des formations
│   └── AdminContext.tsx         # Context d'authentification
└── globals.css                  # Styles globaux
\`\`\`

## Utilisation

### Ajouter une formation
1. Connectez-vous à l'administration : `/admin/login`
2. Cliquez sur "Ajouter une formation"
3. Remplissez les informations :
   - **Titre** : Nom de la formation
   - **Description** : Description détaillée
   - **Prix** : Prix en FCFA
   - **Mode de livraison** :
     - *Automatique* : Accès immédiat après paiement PayDunya
     - *Manuel* : L'admin doit valider et envoyer le lien
   - **Lien vidéo** : URL vers Google Drive, Dropbox, etc.

### Gestion des paiements

#### PayDunya (Automatique)
- Simulation de paiement en ligne
- Accès immédiat au lien de formation
- Fonctionne uniquement avec mode_livraison = 'auto'

#### Orange Money (Manuel)
- Instructions de paiement détaillées
- L'utilisateur envoie la preuve sur WhatsApp
- L'admin valide et transmet le lien manuellement

## Informations de contact

- **Téléphones** : 68 84 92 72 / 51 40 07 55
- **WhatsApp** : +226 56 63 03 58
- **Orange Money** : +226 56 63 03 58

## Personnalisation

### Couleurs
Les couleurs de la marque sont définies dans `tailwind.config.js` :
\`\`\`javascript
colors: {
  'ewes-blue': '#0891b2',
  'ewes-green': '#059669',
  'ewes-primary': '#0d9488',
}
\`\`\`

### Styles
Classes utilitaires personnalisées dans `globals.css` :
- `.btn-primary` : Bouton principal
- `.btn-secondary` : Bouton secondaire
- `.input-field` : Champ de saisie

## Déploiement

### Build de production
\`\`\`bash
npm run build
npm start
\`\`\`

### Déploiement sur Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## Sécurité

Pour la production :
1. Changez le mot de passe administrateur
2. Implémentez une vraie base de données
3. Ajoutez l'authentification JWT
4. Configurez HTTPS
5. Ajoutez la validation CSRF

## Améliorations futures

- 🗄️ Base de données réelle (PostgreSQL/MongoDB)
- 🔐 Authentification JWT
- 📧 Système d'emails automatiques
- 👥 Gestion des utilisateurs
- 📈 Analytics avancées
- 🌐 Internationalisation
- 📱 Application mobile (React Native)

## Support
Pour toute question, contactez-nous sur WhatsApp : +226 56 63 03 58

## Licence
© 2024 EWES - Entreprise Wendinmanegdé Electricité Sebgo
