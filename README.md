# 🏢 Dashboard RH - Frontend

## 📋 Description

Interface React moderne pour le système de gestion des ressources humaines. Application complète avec gestion de l'authentification, pointage, congés, et administration des employés.

## 🚀 Fonctionnalités

### ✅ Modules implémentés

- **🔐 Authentification JWT** - Login sécurisé avec gestion des rôles
- **📊 Dashboard temps réel** - KPIs et statistiques en direct
- **⏰ Gestion des présences** - Pointage avec géolocalisation
- **🏖️ Congés & Absences** - Workflow complet d'approbation
- **👥 Gestion employés** - CRUD complet avec permissions
- **📈 Rapports & Analytics** - Génération de rapports personnalisés
- **🔔 Notifications** - Système de notifications en temps réel
- **👤 Profils utilisateurs** - Gestion des profils et permissions

### 🔧 Architecture technique

- **Frontend**: React 18 + TypeScript + Vite
- **UI/UX**: TailwindCSS + HeadlessUI + Heroicons
- **State Management**: Zustand avec persistance
- **Routing**: React Router v6 avec protection des routes
- **Forms**: React Hook Form + Zod validation
- **HTTP**: Axios avec intercepteurs JWT
- **Build**: Vite avec optimisations de production

## 📦 Installation

### Prérequis

- Node.js 18+ 
- npm 9+ ou yarn
- Backend Spring Boot en cours d'exécution

### Installation des dépendances

```bash
# Installation
npm install

# ou avec yarn
yarn install
```

### Configuration environnement

```bash
# Copier le fichier d'exemple
cp .env.local.example .env.local

# Éditer les variables selon votre environnement
```

### Variables d'environnement

```env
# API Backend
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_API_TIMEOUT=10000

# Configuration app
VITE_APP_NAME="Dashboard RH"
VITE_APP_VERSION="1.0.0"
VITE_APP_ENVIRONMENT=development

# Logs & Debug
VITE_LOG_LEVEL=debug
VITE_ENABLE_REDUX_DEVTOOLS=true
```

## 🛠️ Scripts de développement

```bash
# Démarrage en mode développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Tests avec coverage
npm run test:coverage

# Linting et formatage
npm run lint:fix
npm run format

# Type checking
npm run type-check
```

## 🏗️ Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── common/         # Composants communs (Loading, ErrorBoundary)
│   ├── layout/         # Composants de mise en page
│   └── ui/            # Composants UI de base (Button, Input, Modal)
├── pages/              # Pages de l'application
│   ├── auth/          # Pages d'authentification
│   ├── dashboard/     # Dashboard principal
│   ├── attendance/    # Module présences
│   ├── leaves/        # Module congés
│   ├── employees/     # Gestion employés
│   └── reports/       # Rapports et analytics
├── routes/            # Configuration du routage
├── store/             # État global (Zustand)
├── services/          # Services API et HTTP client
├── hooks/             # Hooks personnalisés
├── types/             # Définitions TypeScript
├── utils/             # Utilitaires et helpers
└── styles/           # Styles globaux et configuration
```

## 🔐 Système d'authentification

### Rôles utilisateurs

- **👑 DIRECTOR** - Accès complet à toutes les fonctionnalités
- **👩‍💼 HR** - Gestion employés, congés, rapports
- **👨‍💻 TEAM_LEADER** - Approbation congés de son équipe
- **👤 EMPLOYEE** - Accès aux fonctions de base
- **🎓 INTERN** - Accès restreint pour stagiaires

### Permissions

```typescript
// Exemple de vérification de permissions
const { hasRole, hasPermission } = useAuth()

if (hasRole([UserRole.HR, UserRole.DIRECTOR])) {
  // Afficher interface de gestion
}

if (hasPermission('canManageEmployees')) {
  // Permettre modification employés
}
```

### Protection des routes

```typescript
// Route protégée par rôle
<Route path="/employees/*" element={
  <RoleBasedRoute allowedRoles={[UserRole.DIRECTOR, UserRole.HR]}>
    <EmployeesPage />
  </RoleBasedRoute>
} />

// Route protégée par permission
<Route path="/reports/*" element={
  <ProtectedRoute requiredPermissions={['canViewGlobalStats']}>
    <ReportsPage />
  </ProtectedRoute>
} />
```

## 🔄 Gestion d'état

### Store Zustand

```typescript
// Utilisation du store d'authentification
const { 
  user, 
  isAuthenticated, 
  login, 
  logout,
  hasRole,
  hasPermission 
} = useAuthStore()

// Actions
await login({ identifier: 'user@company.com', password: 'password' })
await logout()
```

### Persistance automatique

L'état d'authentification est automatiquement persisté dans le localStorage avec gestion de l'expiration des tokens.

## 🌐 Communication API

### Configuration HTTP Client

```typescript
// Service automatisé avec retry et refresh token
const response = await httpClient.get('/employees')

// Les tokens JWT sont automatiquement ajoutés
// Le refresh token est géré automatiquement
```

### Gestion d'erreurs

- Retry automatique sur les erreurs réseau
- Rafraîchissement automatique des tokens expirés
- Messages d'erreur utilisateur conviviaux
- Logging et monitoring intégrés

## 📱 Interface utilisateur

### Design System

- **Composants**: Système cohérent basé sur HeadlessUI
- **Icônes**: HeroIcons avec cohérence visuelle
- **Couleurs**: Palette professionnelle avec thème sombre/clair
- **Typography**: Inter font pour une lisibilité optimale
- **Responsive**: Mobile-first avec breakpoints adaptés

### Composants principaux

```typescript
// Boutons avec variants
<Button variant="primary" size="lg" isLoading={loading}>
  Enregistrer
</Button>

// Tables avec tri et pagination
<Table 
  columns={columns} 
  data={data}
  sortable
  pagination
  onRowClick={handleRowClick}
/>

// Modales avec gestion état
<Modal isOpen={isOpen} onClose={onClose} size="lg">
  <ModalContent />
</Modal>
```

## 🚀 Déploiement

### Build de production

```bash
# Build optimisé
npm run build:production

# Analyse du bundle
npm run analyze

# Test du build
npm run preview
```

### Docker

```bash
# Build de l'image
docker build -t dashboard-rh-frontend .

# Lancement avec docker-compose
docker-compose up -d
```

### Variables de production

```env
VITE_API_BASE_URL=https://api.votre-domaine.com/api/v1
VITE_APP_ENVIRONMENT=production
VITE_LOG_LEVEL=error
VITE_ENABLE_REDUX_DEVTOOLS=false
```

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests avec interface
npm run test:ui

# Coverage
npm run test:coverage
```

### Structure des tests

```
src/
├── components/__tests__/
├── pages/__tests__/
├── hooks/__tests__/
└── utils/__tests__/
```

## 📊 Performance

### Optimisations implémentées

- **Code Splitting** - Lazy loading des pages
- **Bundle Analysis** - Optimisation de la taille
- **Tree Shaking** - Élimination du code mort
- **Asset Optimization** - Compression et cache
- **Virtual Scrolling** - Pour les grandes listes

### Métriques cibles

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 500KB gzipped

## 🔍 Développement

### Conventions de code

- **ESLint** + **Prettier** pour la cohérence
- **TypeScript strict** pour la sécurité des types
- **Conventional Commits** pour l'historique
- **Husky** pour les pre-commit hooks

### Workflow Git

```bash
# Branches principales
main         # Production
develop      # Développement
feature/*    # Nouvelles fonctionnalités
hotfix/*     # Corrections urgentes
```

## 🤝 Contribution

1. Fork du projet
2. Création d'une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit des changements (`git commit -m 'feat: ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouverture d'une Pull Request

## 📝 License

Ce projet est sous licence privée - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.

## 👥 Équipe

- **Frontend Lead**: Développement React/TypeScript
- **UI/UX Designer**: Design et expérience utilisateur  
- **DevOps**: CI/CD et déploiement
- **QA**: Tests et qualité

## 🆘 Support

Pour toute question ou problème :

1. Vérifier la [documentation](docs/)
2. Consulter les [issues GitHub](issues/)
3. Contacter l'équipe de développement

---

**Dashboard RH v1.0.0** - Interface moderne de gestion des ressources humaines