// src/routes/PublicRoute.tsx
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/store/authStore'
import LoadingSpinner from '@/components/common/LoadingSpinner'

interface PublicRouteProps {
  children: ReactNode
  redirectIfAuthenticated?: boolean
  redirectTo?: string
}

/**
 * Composant pour les routes publiques (login, etc.)
 */
export const PublicRoute = ({ 
  children, 
  redirectIfAuthenticated = true,
  redirectTo = '/dashboard'
}: PublicRouteProps) => {
  const { isAuthenticated, isInitialized, isLoading } = useAuth()

  // Attendre l'initialisation
  if (!isInitialized || isLoading) {
    return <LoadingSpinner />
  }

  // Rediriger si déjà authentifié
  if (redirectIfAuthenticated && isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}