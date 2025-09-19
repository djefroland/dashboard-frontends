// src/services/httpClient.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-hot-toast'

// Types pour les erreurs API
export interface ApiError {
  message: string
  status: number
  timestamp: string
  path?: string
  fieldErrors?: Record<string, string>
}

// Configuration de base
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000

// Création de l'instance Axios
export const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Type pour les tokens
interface TokenData {
  accessToken: string | null
  refreshToken: string | null
}

// Gestionnaire de tokens (sera remplacé par Zustand)
let tokens: TokenData = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
}

// Fonction pour mettre à jour les tokens
export const setTokens = (accessToken: string | null, refreshToken: string | null) => {
  tokens = { accessToken, refreshToken }
  
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
  } else {
    localStorage.removeItem('accessToken')
  }
  
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken)
  } else {
    localStorage.removeItem('refreshToken')
  }
}

// Intercepteur de requête - Ajouter le token JWT
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Ajouter le token d'accès si disponible
    if (tokens.accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`
    }
    
    // Ajouter un timestamp pour éviter le cache
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Flag pour éviter les appels multiples de refresh
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (reason?: any) => void
}> = []

// Fonction pour traiter la queue des requêtes en attente
const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  
  failedQueue = []
}

// Intercepteur de réponse - Gestion des erreurs et refresh token
httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    
    // Si erreur 401 et on a un refresh token
    if (error.response?.status === 401 && !originalRequest._retry && tokens.refreshToken) {
      if (isRefreshing) {
        // Si refresh en cours, ajouter à la queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          return httpClient(originalRequest)
        }).catch(err => {
          return Promise.reject(err)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Appel API pour refresher le token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken: tokens.refreshToken
        })
        
        const { accessToken, refreshToken } = response.data
        setTokens(accessToken, refreshToken)
        
        // Traiter la queue avec le nouveau token
        processQueue(null, accessToken)
        
        // Réessayer la requête originale
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
        }
        
        return httpClient(originalRequest)
        
      } catch (refreshError) {
        // Refresh failed - logout user
        processQueue(refreshError as AxiosError, null)
        setTokens(null, null)
        
        // Rediriger vers login (sera géré par le store auth)
        window.location.href = '/login'
        
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Gestion des autres erreurs
    handleApiError(error)
    return Promise.reject(error)
  }
)

// Fonction de gestion des erreurs API
const handleApiError = (error: AxiosError) => {
  const apiError = error.response?.data as ApiError
  
  switch (error.response?.status) {
    case 400:
      if (apiError?.fieldErrors) {
        // Erreurs de validation
        Object.entries(apiError.fieldErrors).forEach(([field, message]) => {
          toast.error(`${field}: ${message}`)
        })
      } else {
        toast.error(apiError?.message || 'Données invalides')
      }
      break
      
    case 401:
      toast.error('Session expirée. Reconnexion nécessaire.')
      break
      
    case 403:
      toast.error('Accès refusé. Permissions insuffisantes.')
      break
      
    case 404:
      toast.error('Ressource non trouvée')
      break
      
    case 409:
      toast.error(apiError?.message || 'Conflit de données')
      break
      
    case 422:
      toast.error(apiError?.message || 'Données non traitables')
      break
      
    case 500:
      toast.error('Erreur serveur. Veuillez réessayer plus tard.')
      break
      
    default:
      if (error.code === 'ECONNABORTED') {
        toast.error('Timeout - Le serveur met trop de temps à répondre')
      } else if (error.message === 'Network Error') {
        toast.error('Erreur réseau - Vérifiez votre connexion')
      } else {
        toast.error(apiError?.message || 'Une erreur inattendue est survenue')
      }
  }
}

// Export par défaut
export default httpClient