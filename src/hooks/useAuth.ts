// src/hooks/useAuth.ts
import { useEffect, useCallback } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { UserRole } from '@/types/auth.types'

// Timeout pour l'inactivité (30 minutes)
const INACTIVITY_TIMEOUT = 30 * 60 * 1000

/**
 * Hook personnalisé pour la gestion de l'authentification
 * Inclut la gestion de l'inactivité et des redirections
 */
export const useAuthManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    isAuthenticated,
    isInitialized,
    user,
    lastActivity,
    logout,
    getRemainingSessionTime,
    isTokenExpiringSoon,
    refreshAuthToken,
  } = useAuthStore()

  // Gestion de l'inactivité utilisateur
  const handleUserActivity = useCallback(() => {
    useAuthStore.setState({ lastActivity: Date.now() })
  }, [])

  // Vérification de l'inactivité
  const checkInactivity = useCallback(() => {
    if (!isAuthenticated) return

    const now = Date.now()
    const timeSinceLastActivity = now - lastActivity
    
    if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
      toast.error('Session fermée pour inactivité')
      logout()
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, lastActivity, logout, navigate])

  // Vérification automatique du refresh token
  const checkTokenExpiration = useCallback(async () => {
    if (!isAuthenticated) return

    if (isTokenExpiringSoon(10)) { // 10 minutes avant expiration
      try {
        await refreshAuthToken()
        toast.success('Session renouvelée automatiquement')
      } catch (error) {
        console.error('Erreur lors du refresh automatique:', error)
        toast.error('Session expirée, reconnexion nécessaire')
        navigate('/login', { replace: true })
      }
    }
  }, [isAuthenticated, isTokenExpiringSoon, refreshAuthToken, navigate])

  // Redirection après login
  const redirectAfterLogin = useCallback(() => {
    if (!isAuthenticated || !user) return

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/'
    const defaultRoute = getDefaultRouteForRole(user.role)
    
    navigate(from !== '/login' ? from : defaultRoute, { replace: true })
  }, [isAuthenticated, user, location.state, navigate])

  // Effects
  useEffect(() => {
    // Listeners pour détecter l'activité utilisateur
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity)
      })
    }
  }, [handleUserActivity])

  useEffect(() => {
    // Vérification périodique de l'inactivité et du token
    const interval = setInterval(() => {
      checkInactivity()
      checkTokenExpiration()
    }, 60000) // Chaque minute

    return () => clearInterval(interval)
  }, [checkInactivity, checkTokenExpiration])

  return {
    redirectAfterLogin,
    sessionTimeRemaining: getRemainingSessionTime(),
    isSessionValid: isAuthenticated && isInitialized,
  }
}

/**
 * Hook pour vérifier les permissions d'accès aux routes
 */
export const useRoutePermissions = () => {
  const { user, hasRole, hasPermission } = useAuthStore()

  const canAccessRoute = useCallback((route: string): boolean => {
    if (!user) return false

    // Routes publiques
    const publicRoutes = ['/login', '/forgot-password']
    if (publicRoutes.some(r => route.startsWith(r))) return true

    // Routes par rôle
    const roleRoutes: Record<UserRole, string[]> = {
      [UserRole.DIRECTOR]: ['*'], // Accès total
      [UserRole.HR]: [
        '/dashboard', '/profile', '/employees', '/users', '/leaves', 
        '/attendance', '/reports', '/notifications'
      ],
      [UserRole.TEAM_LEADER]: [
        '/dashboard', '/profile', '/leaves/approval', '/attendance',
        '/reports/team', '/notifications'
      ],
      [UserRole.EMPLOYEE]: [
        '/dashboard', '/profile', '/attendance', '/leaves/my',
        '/notifications'
      ],
      [UserRole.INTERN]: [
        '/dashboard', '/profile', '/attendance', '/leaves/my',
        '/notifications'
      ]
    }

    const allowedRoutes = roleRoutes[user.role] || []
    
    // Directeur a accès à tout
    if (allowedRoutes.includes('*')) return true
    
    // Vérifier si la route est autorisée
    return allowedRoutes.some(allowedRoute => 
      route === allowedRoute || route.startsWith(allowedRoute + '/')
    )
  }, [user])

  const requiresPermission = useCallback((
    permission: 'canManageEmployees' | 'canApproveLeaves' | 'canViewGlobalStats' | 'canExportData'
  ): boolean => {
    return hasPermission(permission)
  }, [hasPermission])

  return {
    canAccessRoute,
    requiresPermission,
    hasRole,
    hasPermission,
  }
}

/**
 * Hook pour la gestion des notifications de session
 */
export const useSessionNotifications = () => {
  const { isAuthenticated, getRemainingSessionTime } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) return

    const checkSessionWarning = () => {
      const remainingTime = getRemainingSessionTime()
      
      // Avertissement à 5 minutes
      if (remainingTime === 300) { // 5 minutes
        toast('Votre session expire dans 5 minutes', {
          icon: '⚠️',
          duration: 5000,
        })
      }
      
      // Avertissement à 1 minute
      if (remainingTime === 60) { // 1 minute
        toast.error('Session expire dans 1 minute !', {
          duration: 8000,
        })
      }
    }

    const interval = setInterval(checkSessionWarning, 30000) // Chaque 30 secondes
    return () => clearInterval(interval)
  }, [isAuthenticated, getRemainingSessionTime])
}

// Helper pour obtenir la route par défaut selon le rôle
const getDefaultRouteForRole = (role: UserRole): string => {
  const defaultRoutes: Record<UserRole, string> = {
    [UserRole.DIRECTOR]: '/dashboard',
    [UserRole.HR]: '/dashboard',
    [UserRole.TEAM_LEADER]: '/dashboard',
    [UserRole.EMPLOYEE]: '/attendance',
    [UserRole.INTERN]: '/attendance'
  }
  
  return defaultRoutes[role] || '/dashboard'
}

// Hook simplifié pour les composants
export const useUser = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore()
  
  return {
    user,
    isAuthenticated,
    isLoading,
    isManager: user?.role ? [UserRole.DIRECTOR, UserRole.HR, UserRole.TEAM_LEADER].includes(user.role) : false,
    isAdmin: user?.role ? [UserRole.DIRECTOR, UserRole.HR].includes(user.role) : false,
    userInitials: user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '',
    userDisplayName: user?.fullName || 'Utilisateur',
  }
}

export default useAuthManager