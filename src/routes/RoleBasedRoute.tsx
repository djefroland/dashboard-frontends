// src/routes/RoleBasedRoute.tsx
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/store/authStore'
import { UserRole } from '@/types/auth.types'

interface RoleBasedRouteProps {
  children: ReactNode
  allowedRoles: UserRole[]
  fallbackComponent?: ReactNode
  redirectTo?: string
}

/**
 * Composant pour les routes basées sur les rôles
 */
export const RoleBasedRoute = ({ 
  children, 
  allowedRoles, 
  fallbackComponent,
  redirectTo = '/unauthorized'
}: RoleBasedRouteProps) => {
  const { user, hasRole } = useAuth()

  // Si pas d'utilisateur ou rôle non autorisé
  if (!user || !hasRole(allowedRoles)) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>
    }
    
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}