// src/services/api/auth.service.ts
import httpClient, { setTokens } from '../httpClient'
import type { 
  LoginRequest, 
  LoginResponse, 
  RefreshTokenRequest,
  TokenValidationResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  User
} from '@/types/auth.types'

/**
 * Service d'authentification
 * Gère toutes les interactions avec l'API d'auth du backend Spring Boot
 */
export class AuthService {
  private static readonly ENDPOINTS = {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh', 
    LOGOUT: '/auth/logout',
    VALIDATE: '/auth/validate',
    ME: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password'
  } as const

  /**
   * Connexion utilisateur
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await httpClient.post<LoginResponse>(
        this.ENDPOINTS.LOGIN, 
        credentials
      )
      
      const { accessToken, refreshToken } = response.data
      
      // Stocker les tokens
      setTokens(accessToken, refreshToken)
      
      return response.data
    } catch (error) {
      // L'erreur sera gérée par l'intercepteur HTTP
      throw error
    }
  }

  /**
   * Déconnexion utilisateur
   */
  static async logout(): Promise<void> {
    try {
      await httpClient.post(this.ENDPOINTS.LOGOUT)
    } catch (error) {
      // Même en cas d'erreur serveur, on nettoie le côté client
      console.warn('Erreur lors de la déconnexion serveur:', error)
    } finally {
      // Nettoyer les tokens côté client
      setTokens(null, null)
    }
  }

  /**
   * Rafraîchissement du token
   */
  static async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const request: RefreshTokenRequest = { refreshToken }
    
    const response = await httpClient.post<LoginResponse>(
      this.ENDPOINTS.REFRESH, 
      request
    )
    
    const { accessToken, refreshToken: newRefreshToken } = response.data
    
    // Mettre à jour les tokens
    setTokens(accessToken, newRefreshToken)
    
    return response.data
  }

  /**
   * Validation du token actuel
   */
  static async validateToken(): Promise<TokenValidationResponse> {
    const response = await httpClient.post<TokenValidationResponse>(
      this.ENDPOINTS.VALIDATE
    )
    
    return response.data
  }

  /**
   * Récupération des informations utilisateur connecté
   */
  static async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>(this.ENDPOINTS.ME)
    return response.data
  }

  /**
   * Changement de mot de passe
   */
  static async changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    const response = await httpClient.post<ChangePasswordResponse>(
      this.ENDPOINTS.CHANGE_PASSWORD, 
      data
    )
    
    return response.data
  }

  /**
   * Vérification de l'état d'authentification
   */
  static async checkAuthStatus(): Promise<{
    isAuthenticated: boolean
    user?: User
  }> {
    try {
      const user = await this.getCurrentUser()
      return { isAuthenticated: true, user }
    } catch (error) {
      return { isAuthenticated: false }
    }
  }

  /**
   * Helpers pour la gestion des tokens côté client
   */
  static getStoredTokens(): { accessToken: string | null; refreshToken: string | null } {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken')
    }
  }

  static clearStoredTokens(): void {
    setTokens(null, null)
  }

  /**
   * Vérification si le token expire bientôt
   */
  static isTokenExpiringSoon(thresholdMinutes = 5): boolean {
    const token = this.getStoredTokens().accessToken
    if (!token) return true

    try {
      // Décoder le JWT pour récupérer l'expiration
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expirationTime = payload.exp * 1000 // Conversion en millisecondes
      const thresholdTime = Date.now() + (thresholdMinutes * 60 * 1000)
      
      return expirationTime < thresholdTime
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error)
      return true
    }
  }

  /**
   * Récupération du temps restant avant expiration (en secondes)
   */
  static getRemainingTokenTime(): number {
    const token = this.getStoredTokens().accessToken
    if (!token) return 0

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expirationTime = payload.exp * 1000
      const remainingTime = Math.max(0, expirationTime - Date.now())
      
      return Math.floor(remainingTime / 1000)
    } catch (error) {
      console.error('Erreur lors du calcul du temps restant:', error)
      return 0
    }
  }

  /**
   * Extraction des informations utilisateur du token JWT
   */
  static decodeTokenPayload(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error)
      return null
    }
  }
}

export default AuthService