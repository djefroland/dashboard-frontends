// src/types/auth.types.ts

// Énumération des rôles utilisateur (synchronisé avec le backend)
export enum UserRole {
  DIRECTOR = 'DIRECTOR',
  HR = 'HR', 
  TEAM_LEADER = 'TEAM_LEADER',
  EMPLOYEE = 'EMPLOYEE',
  INTERN = 'INTERN'
}

// Interface pour les données utilisateur
export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  phone?: string
  role: UserRole
  roleDisplayName: string
  
  // Informations département/manager
  departmentId?: number
  departmentName?: string
  managerId?: number
  managerName?: string
  
  // Statuts
  enabled: boolean
  requiresTimeTracking: boolean
  
  // Dates importantes
  lastLoginDate?: string
  createdAt: string
  emailVerifiedAt?: string
  
  // Permissions calculées
  canManageEmployees: boolean
  canApproveLeaves: boolean
  canViewGlobalStats: boolean
  canExportData: boolean
}

// Requête de connexion
export interface LoginRequest {
  identifier: string // username ou email
  password: string
  rememberMe?: boolean
}

// Réponse de connexion
export interface LoginResponse {
  // Tokens JWT
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number // en secondes
  
  // Informations utilisateur
  userId: number
  username: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  role: UserRole
  roleDisplayName: string
  
  // Métadonnées de connexion
  loginTime: string
  firstLogin: boolean
  passwordExpired: boolean
  requiresTimeTracking: boolean
  
  // Permissions principales
  canManageEmployees: boolean
  canApproveLeaves: boolean
  canViewGlobalStats: boolean
  canExportData: boolean
}

// Requête de rafraîchissement de token
export interface RefreshTokenRequest {
  refreshToken: string
}

// Réponse de validation de token
export interface TokenValidationResponse {
  valid: boolean
  userInfo?: Partial<User>
  expiresIn?: number
  timestamp: string
}

// Requête de changement de mot de passe
export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// Réponse de changement de mot de passe
export interface ChangePasswordResponse {
  message: string
  timestamp: string
}

// État d'authentification dans le store
export interface AuthState {
  // État de connexion
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  
  // Données utilisateur et tokens
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  tokenExpiresAt: number | null
  
  // Métadonnées
  lastActivity: number
  loginTime: number | null
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  refreshAuthToken: () => Promise<void>
  updateProfile: (userData: Partial<User>) => void
  changePassword: (data: ChangePasswordRequest) => Promise<void>
  checkAuthStatus: () => Promise<void>
  
  // Helpers
  hasRole: (role: UserRole | UserRole[]) => boolean
  hasPermission: (permission: keyof Pick<User, 'canManageEmployees' | 'canApproveLeaves' | 'canViewGlobalStats' | 'canExportData'>) => boolean
  isTokenExpiringSoon: (thresholdMinutes?: number) => boolean
  getRemainingSessionTime: () => number
}

// Permissions par rôle (pour validation côté client)
export const ROLE_PERMISSIONS: Record<UserRole, {
  displayName: string
  hierarchyLevel: number
  canManageEmployees: boolean
  canApproveLeaves: boolean
  canViewGlobalStats: boolean
  canExportData: boolean
  requiresTimeTracking: boolean
  routes: string[]
}> = {
  [UserRole.DIRECTOR]: {
    displayName: 'Directeur',
    hierarchyLevel: 1,
    canManageEmployees: true,
    canApproveLeaves: true,
    canViewGlobalStats: true,
    canExportData: true,
    requiresTimeTracking: false,
    routes: ['*'] // Accès à tout
  },
  [UserRole.HR]: {
    displayName: 'RH',
    hierarchyLevel: 2,
    canManageEmployees: true,
    canApproveLeaves: true,
    canViewGlobalStats: false,
    canExportData: true,
    requiresTimeTracking: true,
    routes: ['/employees', '/users', '/leaves/approval', '/reports', '/attendance/manage']
  },
  [UserRole.TEAM_LEADER]: {
    displayName: 'Team Leader',
    hierarchyLevel: 3,
    canManageEmployees: false,
    canApproveLeaves: true,
    canViewGlobalStats: false,
    canExportData: false,
    requiresTimeTracking: true,
    routes: ['/leaves/approval', '/attendance', '/reports/team']
  },
  [UserRole.EMPLOYEE]: {
    displayName: 'Employé',
    hierarchyLevel: 4,
    canManageEmployees: false,
    canApproveLeaves: false,
    canViewGlobalStats: false,
    canExportData: false,
    requiresTimeTracking: true,
    routes: ['/attendance', '/leaves', '/profile']
  },
  [UserRole.INTERN]: {
    displayName: 'Stagiaire',
    hierarchyLevel: 5,
    canManageEmployees: false,
    canApproveLeaves: false,
    canViewGlobalStats: false,
    canExportData: false,
    requiresTimeTracking: true,
    routes: ['/attendance', '/leaves', '/profile']
  }
}

// Helpers pour les rôles
export const isHigherRole = (role1: UserRole, role2: UserRole): boolean => {
  return ROLE_PERMISSIONS[role1].hierarchyLevel < ROLE_PERMISSIONS[role2].hierarchyLevel
}

export const canUserAccessRoute = (userRole: UserRole, route: string): boolean => {
  const permissions = ROLE_PERMISSIONS[userRole]
  return permissions.routes.includes('*') || permissions.routes.some(r => route.startsWith(r))
}

// Types pour les erreurs d'authentification
export interface AuthError {
  type: 'AUTH_FAILED' | 'TOKEN_EXPIRED' | 'PERMISSION_DENIED' | 'NETWORK_ERROR'
  message: string
  timestamp: number
}

// Interface pour le contexte d'authentification React
export interface AuthContextType extends AuthState {
  // Actions supplémentaires pour le contexte
  initialize: () => Promise<void>
  clearError: () => void
  error: AuthError | null
}