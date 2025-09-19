// src/components/ui/Badge/Badge.tsx
import { ReactNode } from 'react';
import { clsx } from 'clsx'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  className?: string
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = true,
  className
}: BadgeProps) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    danger: 'bg-danger-100 text-danger-800'
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  }

  return (
    <span className={clsx(
      'inline-flex items-center font-medium',
      variantStyles[variant],
      sizeStyles[size],
      rounded ? 'rounded-full' : 'rounded',
      className
    )}>
      {children}
    </span>
  )
}

// Badges spécialisés pour le Dashboard RH
interface StatusBadgeProps {
  status: 'present' | 'absent' | 'late' | 'remote' | 'pending' | 'approved' | 'rejected'
  size?: 'sm' | 'md' | 'lg'
}

export const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const statusConfig = {
    present: { variant: 'success' as const, label: 'Présent' },
    absent: { variant: 'danger' as const, label: 'Absent' },
    late: { variant: 'warning' as const, label: 'En retard' },
    remote: { variant: 'primary' as const, label: 'Télétravail' },
    pending: { variant: 'warning' as const, label: 'En attente' },
    approved: { variant: 'success' as const, label: 'Approuvé' },
    rejected: { variant: 'danger' as const, label: 'Rejeté' }
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  )
}

interface RoleBadgeProps {
  role: 'DIRECTOR' | 'HR' | 'TEAM_LEADER' | 'EMPLOYEE' | 'INTERN'
  size?: 'sm' | 'md' | 'lg'
}

export const RoleBadge = ({ role, size = 'md' }: RoleBadgeProps) => {
  const roleConfig = {
    DIRECTOR: { variant: 'primary' as const, label: 'Directeur' },
    HR: { variant: 'danger' as const, label: 'RH' },
    TEAM_LEADER: { variant: 'secondary' as const, label: 'Team Leader' },
    EMPLOYEE: { variant: 'success' as const, label: 'Employé' },
    INTERN: { variant: 'warning' as const, label: 'Stagiaire' }
  }

  const config = roleConfig[role]

  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  )
}