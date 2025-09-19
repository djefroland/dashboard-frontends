// src/store/authStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { toast } from 'react-hot-toast'
import AuthService from '@/services/api/auth.service'
import type { 
  AuthState, 
  LoginRequest, 
  ChangePasswordRequest, 
  User
} from '@/types/auth.types'
import { UserRole } from '@/types/auth.types'

// Interface pour le state persisté
interface PersistedAuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  tokenExpiresAt: number | null
  loginTime: number | null
}

// Interface complète du store
interface AuthStore extends AuthState {
  error: string | null
  setError: (error: string | null) => void
  initialize: () => Promise<void>
}

/**
 * Store Zustand pour la gestion de l'authentification
 * Avec persistance et gestion automatique des tokens
 */
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // État initial
        isAuthenticated: false,
        isLoading: false,
        isInitialized: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        tokenExpiresAt: null,
        lastActivity: Date.now(),
        loginTime: null,
        error: null,

        // Setter pour les erreurs
        setError: (error: string | null) => {
          set({ error })
        },

        /**
         * Initialisation du store au démarrage de l'app
         */
        initialize: async () => {
          const state = get()
          
          if (state.isInitialized) return

          set({ isLoading: true })

          try {
            // Vérifier si on a des tokens stockés
            const tokens = AuthService.getStoredTokens()
            
            if (tokens.accessToken) {
              // Vérifier la validité du token
              const authStatus = await AuthService.checkAuthStatus()
              
              if (authStatus.isAuthenticated && authStatus.user) {
                set({
                  isAuthenticated: true,
                  user: authStatus.user,
                  accessToken: tokens.accessToken,
                  refreshToken: tokens.refreshToken,
                  lastActivity: Date.now(),
                })
              } else {
                // Token invalide, nettoyer
                AuthService.clearStoredTokens()
                set({
                  isAuthenticated: false,
                  user: null,
                  accessToken: null,
                  refreshToken: null,
                  tokenExpiresAt: null,
                  loginTime: null,
                })
              }
            }
          } catch (error) {
            console.error('Erreur lors de l\'initialisation auth:', error)
            // En cas d'erreur, nettoyer l'état
            AuthService.clearStoredTokens()
            set({
              isAuthenticated: false,
              user: null,
              accessToken: null,
              refreshToken: null,
              tokenExpiresAt: null,
              loginTime: null,
            })
          } finally {
            set({ 
              isLoading: false, 
              isInitialized: true 
            })
          }
        },

        /**
         * Connexion utilisateur
         */
        login: async (credentials: LoginRequest) => {
          set({ isLoading: true, error: null })

          try {
            const response = await AuthService.login(credentials)
            
            const tokenExpiresAt = Date.now() + (response.expiresIn * 1000)
            
            set({
              isAuthenticated: true,
              user: {
                id: response.userId,
                username: response.username,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                fullName: response.fullName,
                role: response.role,
                roleDisplayName: response.roleDisplayName,
                enabled: true,
                requiresTimeTracking: response.requiresTimeTracking,
                canManageEmployees: response.canManageEmployees,
                canApproveLeaves: response.canApproveLeaves,
                canViewGlobalStats: response.canViewGlobalStats,
                canExportData: response.canExportData,
                createdAt: new Date().toISOString(),
              },
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              tokenExpiresAt,
              loginTime: Date.now(),
              lastActivity: Date.now(),
              isLoading: false,
              error: null,
            })

            // Notification de succès
            toast.success(`Bienvenue ${response.firstName} !`)
            
            // Alerte si premier login ou mot de passe expiré
            if (response.firstLogin || response.passwordExpired) {
              toast('Veuillez changer votre mot de passe', { 
                icon: '🔐',
                duration: 5000 
              })
            }

          } catch (error: unknown) {
            const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Échec de la connexion'
            set({ 
              error: errorMessage, 
              isLoading: false 
            })
            throw error
          }
        },

        /**
         * Déconnexion utilisateur
         */
        logout: async () => {
          try {
            await AuthService.logout()
          } catch (error) {
            console.error('Erreur lors de la déconnexion:', error)
          } finally {
            // Nettoyer l'état local dans tous les cas
            set({
              isAuthenticated: false,
              user: null,
              accessToken: null,
              refreshToken: null,
              tokenExpiresAt: null,
              loginTime: null,
              lastActivity: Date.now(),
              error: null,
            })
            
            toast.success('Déconnexion réussie')
          }
        },

        /**
         * Rafraîchissement du token
         */
        refreshAuthToken: async () => {
          const { refreshToken } = get()
          
          if (!refreshToken) {
            throw new Error('Aucun refresh token disponible')
          }

          try {
            const response = await AuthService.refreshToken(refreshToken)
            const tokenExpiresAt = Date.now() + (response.expiresIn * 1000)
            
            set({
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              tokenExpiresAt,
              lastActivity: Date.now(),
            })

          } catch (error) {
            // Échec du refresh, déconnecter
            get().logout()
            throw error
          }
        },

        /**
         * Mise à jour du profil utilisateur
         */
        updateProfile: (userData: Partial<User>) => {
          const currentUser = get().user
          if (currentUser) {
            set({
              user: { ...currentUser, ...userData },
              lastActivity: Date.now(),
            })
          }
        },

        /**
         * Changement de mot de passe
         */
        changePassword: async (data: ChangePasswordRequest) => {
          set({ isLoading: true, error: null })

          try {
            await AuthService.changePassword(data)
            
            set({ isLoading: false })
            toast.success('Mot de passe changé avec succès')
            
          } catch (error: unknown) {
            const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erreur lors du changement de mot de passe'
            set({ 
              error: errorMessage, 
              isLoading: false 
            })
            throw error
          }
        },

        /**
         * Vérification du statut d'authentification
         */
        checkAuthStatus: async () => {
          try {
            const authStatus = await AuthService.checkAuthStatus()
            
            if (!authStatus.isAuthenticated) {
              get().logout()
            }
          } catch (error) {
            console.error('Erreur lors de la vérification du statut auth:', error)
            get().logout()
          }
        },

        /**
         * Vérification des rôles
         */
        hasRole: (role: UserRole | UserRole[]) => {
          const user = get().user
          if (!user) return false
          
          if (Array.isArray(role)) {
            return role.includes(user.role)
          }
          
          return user.role === role
        },

        /**
         * Vérification des permissions
         */
        hasPermission: (permission: keyof Pick<User, 'canManageEmployees' | 'canApproveLeaves' | 'canViewGlobalStats' | 'canExportData'>) => {
          const user = get().user
          return user?.[permission] ?? false
        },

        /**
         * Vérification si le token expire bientôt
         */
        isTokenExpiringSoon: (thresholdMinutes = 5) => {
          const { tokenExpiresAt } = get()
          if (!tokenExpiresAt) return true
          
          const thresholdTime = Date.now() + (thresholdMinutes * 60 * 1000)
          return tokenExpiresAt < thresholdTime
        },

        /**
         * Temps de session restant en secondes
         */
        getRemainingSessionTime: () => {
          const { tokenExpiresAt } = get()
          if (!tokenExpiresAt) return 0
          
          const remaining = Math.max(0, tokenExpiresAt - Date.now())
          return Math.floor(remaining / 1000)
        },
      }),
      {
        name: 'auth-storage',
        // Persister seulement les données essentielles
        partialize: (state): PersistedAuthState => ({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          tokenExpiresAt: state.tokenExpiresAt,
          loginTime: state.loginTime,
        }),
        // Version pour migration des données si nécessaire
        version: 1,
      }
    ),
    {
      name: 'auth-store',
    }
  )
)

// Hook personnalisé pour l'authentification
export const useAuth = () => {
  const store = useAuthStore()
  
  return {
    // État
    ...store,
    
    // Actions simplifiées
    signIn: store.login,
    signOut: store.logout,
    
    // Getters utiles
    isAdmin: store.hasRole([UserRole.DIRECTOR, UserRole.HR]),
    isManager: store.hasRole([UserRole.DIRECTOR, UserRole.HR, UserRole.TEAM_LEADER]),
    canManage: store.hasPermission('canManageEmployees'),
    
    // Helpers
    userInitials: store.user 
      ? `${store.user.firstName[0]}${store.user.lastName[0]}`.toUpperCase()
      : '',
    
    userDisplayName: store.user?.fullName || store.user?.username || 'Utilisateur',
    
    // Session info
    sessionTimeRemaining: store.getRemainingSessionTime(),
    isSessionExpiringSoon: store.isTokenExpiringSoon(10), // 10 minutes threshold
  }
}