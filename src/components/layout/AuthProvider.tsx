// src/components/layout/AuthProvider.tsx
import { ReactNode } from 'react'
import { useAuthInit } from '@/hooks/useAuthInit'
import LoadingSpinner from '@/components/common/LoadingSpinner'

interface AuthProviderProps {
  children: ReactNode
}

/**
 * Composant Provider pour l'authentification
 * Gère l'initialisation et la logique automatique d'auth
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isInitialized, isLoading } = useAuthInit()

  // Afficher le spinner pendant l'initialisation
  if (!isInitialized || isLoading) {
    return <LoadingSpinner />
  }

  return <>{children}</>
}

export default AuthProvider