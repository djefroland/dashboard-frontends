// src/routes/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/store/authStore'
import { useRoutePermissions } from '@/hooks/useAuth'
import { UserRole } from '@/types/auth.types'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  requiredRoles?: UserRole[]
  requiredPermissions?: Array<'canManageEmployees' | 'canApproveLeaves' | 'canViewGlobalStats' | 'canExportData'>
  fallback?: ReactNode
}

/**
 * Composant de protection des routes
 * Gère l'authentification et les permissions
 */
export const ProtectedRoute = ({ 
  children,
  requireAuth = true,
  requiredRoles = [],
  requiredPermissions = [],
  fallback = null
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, isInitialized, user, hasRole, hasPermission } = useAuth()
  const { canAccessRoute } = useRoutePermissions()
  const location = useLocation()

  // Attendre l'initialisation
  if (!isInitialized || isLoading) {
    return <LoadingSpinner />
  }

  // Vérifier l'authentification
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }}
        replace 
      />
    )
  }

  // Vérifier les rôles requis
  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    return (
      <Navigate 
        to="/unauthorized" 
        replace 
      />
    )
  }

  // Vérifier les permissions requises
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requiredPermissions.every(permission => 
      hasPermission(permission)
    )
    
    if (!hasRequiredPermissions) {
      return fallback || (
        <Navigate 
          to="/unauthorized" 
          replace 
        />
      )
    }
  }

  // Vérifier l'accès à la route
  if (user && !canAccessRoute(location.pathname)) {
    return (
      <Navigate 
        to="/unauthorized" 
        replace 
      />
    )
  }

  return <>{children}</>
}