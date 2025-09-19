// src/hooks/useAuthInit.ts
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'

/**
 * Hook d'initialisation et gestion automatique de l'authentification
 * À utiliser une seule fois dans App.tsx ou MainLayout
 */
export const useAuthInit = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    initialize,
    isAuthenticated,
    isInitialized,
    isLoading,
    user,
    checkAuthStatus,
    refreshAuthToken,
    isTokenExpiringSoon,
    lastActivity
  } = useAuthStore()

  // Initialisation au montage du composant
  useEffect(() => {
    if (!isInitialized) {
      initialize()
    }
  }, [initialize, isInitialized])

  // Vérification périodique du statut d'authentification
  useEffect(() => {
    if (!isAuthenticated || !isInitialized) return

    const interval = setInterval(async () => {
      try {
        // Vérifier le statut d'authentification toutes les 5 minutes
        await checkAuthStatus()
        
        // Rafraîchir automatiquement le token s'il expire dans moins de 10 minutes
        if (isTokenExpiringSoon(10)) {
          await refreshAuthToken()
          console.log('Token rafraîchi automatiquement')
        }
      } catch (error) {
        console.error('Erreur lors de la vérification automatique:', error)
      }
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [isAuthenticated, isInitialized, checkAuthStatus, refreshAuthToken, isTokenExpiringSoon])

  // Gestion de l'inactivité utilisateur
  useEffect(() => {
    if (!isAuthenticated) return

    const INACTIVITY_TIMEOUT = 30 * 60 * 1000 // 30 minutes

    const checkInactivity = () => {
      const now = Date.now()
      const timeSinceLastActivity = now - lastActivity

      if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
        toast.error('Session fermée pour inactivité')
        useAuthStore.getState().logout()
        navigate('/login', { replace: true })
      }
    }

    // Vérifier l'inactivité toutes les minutes
    const inactivityInterval = setInterval(checkInactivity, 60 * 1000)

    // Événements pour détecter l'activité utilisateur
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    const updateActivity = () => {
      useAuthStore.setState({ lastActivity: Date.now() })
    }

    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true })
    })

    return () => {
      clearInterval(inactivityInterval)
      events.forEach(event => {
        document.removeEventListener(event, updateActivity)
      })
    }
  }, [isAuthenticated, lastActivity, navigate])

  // Redirection automatique après connexion
  useEffect(() => {
    if (isAuthenticated && isInitialized && user) {
      const currentPath = location.pathname
      
      // Si on est sur la page de login, rediriger vers le dashboard
      if (currentPath === '/login') {
        navigate('/dashboard', { replace: true })
      }
      
      // Si on est sur la racine, rediriger vers dashboard
      if (currentPath === '/') {
        navigate('/dashboard', { replace: true })
      }
    }
  }, [isAuthenticated, isInitialized, user, location.pathname, navigate])

  // Alertes de session
  useEffect(() => {
    if (!isAuthenticated) return

    const checkSessionWarnings = () => {
      const remainingTime = useAuthStore.getState().getRemainingSessionTime()
      
      // Avertissement à 10 minutes
      if (remainingTime === 600) { // 10 minutes
        toast('Votre session expire dans 10 minutes', {
          icon: '⚠️',
          duration: 5000,
        })
      }
      
      // Avertissement à 5 minutes
      if (remainingTime === 300) { // 5 minutes
        toast('Votre session expire dans 5 minutes', {
          icon: '⚠️',
          duration: 5000,
        })
      }
      
      // Avertissement critique à 2 minutes
      if (remainingTime === 120) { // 2 minutes
        toast.error('Session expire dans 2 minutes !', {
          duration: 8000,
        })
      }
    }

    const warningInterval = setInterval(checkSessionWarnings, 30000) // Vérifier toutes les 30 secondes
    return () => clearInterval(warningInterval)
  }, [isAuthenticated])

  return {
    isAuthenticated,
    isInitialized,
    isLoading,
    user
  }
}