// src/routes/ConditionalRoute.tsx
import { ReactNode } from 'react'

interface ConditionalRouteProps {
  children: ReactNode
  condition: boolean
  fallback: ReactNode
}

/**
 * Composant pour les routes conditionnelles
 */
export const ConditionalRoute = ({ 
  children, 
  condition, 
  fallback 
}: ConditionalRouteProps) => {
  return condition ? <>{children}</> : <>{fallback}</>
}