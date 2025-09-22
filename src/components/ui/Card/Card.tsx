// src/components/ui/Card/Card.tsx - Version Révolutionnaire
import { HTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  glow?: boolean
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  divider?: boolean
  gradient?: boolean
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  divider?: boolean
  actions?: boolean
  gradient?: boolean
}

const cardVariants = {
  default: 'bg-white border border-secondary-200 rounded-2xl shadow-md',
  glass: 'bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl',
  gradient: 'bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 rounded-2xl shadow-lg',
  elevated: 'bg-white border border-secondary-200 rounded-2xl shadow-2xl'
}

const cardPadding = {
  none: '',
  sm: 'p-4',
  md: 'p-6', 
  lg: 'p-8'
}

// Composant Card principal
export const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'default',
  padding = 'none',
  hover = false,
  glow = false,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        cardVariants[variant],
        cardPadding[padding],
        hover && 'hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer',
        glow && 'hover:shadow-glow-lg',
        'relative overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary-gradient opacity-60"></div>
      
      {children}
    </div>
  )
})

// Composant Card Header
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({
  className,
  divider = true,
  gradient = false,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'px-6 py-4',
        divider && 'border-b border-secondary-200',
        gradient && 'bg-gradient-to-r from-primary-50/50 to-transparent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

// Composant Card Body
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
})

// Composant Card Footer
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({
  className,
  divider = true,
  actions = false,
  gradient = false,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'px-6 py-4 rounded-b-2xl',
        divider && 'border-t border-secondary-200',
        gradient && 'bg-gradient-to-r from-secondary-50 to-transparent',
        actions && 'flex items-center justify-end space-x-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

// Définir les noms d'affichage
Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardBody.displayName = 'CardBody'
CardFooter.displayName = 'CardFooter'

// Composant Stats Card révolutionnaire
interface StatsCardProps extends Omit<CardProps, 'children'> {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease' | 'neutral'
    label?: string
  }
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'cyan'
  onClick?: () => void
}

export const StatsCard = ({
  title,
  value,
  change,
  icon,
  color = 'blue',
  onClick,
  className,
  ...props
}: StatsCardProps) => {
  const colorStyles = {
    blue: 'from-primary-500 to-primary-600 text-primary-700',
    green: 'from-success-500 to-success-600 text-success-700',
    yellow: 'from-warning-500 to-warning-600 text-warning-700',
    red: 'from-danger-500 to-danger-600 text-danger-700',
    purple: 'from-purple-500 to-purple-600 text-purple-700',
    cyan: 'from-accent-500 to-accent-600 text-accent-700'
  }

  const changeStyles = {
    increase: 'text-success-600 bg-success-50',
    decrease: 'text-danger-600 bg-danger-50',
    neutral: 'text-secondary-600 bg-secondary-50'
  }

  return (
    <Card 
      variant="glass" 
      hover={!!onClick}
      className={clsx('relative overflow-hidden group cursor-pointer', className)}
      onClick={onClick}
      {...props}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <pattern id={`pattern-${color}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor" className={colorStyles[color]} />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#pattern-${color})`} />
        </svg>
      </div>

      {/* Icon */}
      {icon && (
        <div className={clsx(
          'absolute top-6 right-6 p-3 rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-110',
          `bg-gradient-to-br ${colorStyles[color].split(' ')[0]} ${colorStyles[color].split(' ')[1]}`
        )}>
          <div className="w-6 h-6 text-white">
            {icon}
          </div>
        </div>
      )}

      <CardBody>
        <div className="space-y-3 relative">
          <p className="text-sm font-bold text-secondary-600 uppercase tracking-wider">
            {title}
          </p>
          
          <div className="flex items-baseline space-x-3">
            <p className="text-4xl font-bold font-display text-secondary-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            
            {change && (
              <div className={clsx(
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-bold',
                changeStyles[change.type]
              )}>
                {change.type === 'increase' && (
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                
                {change.type === 'decrease' && (
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                
                {Math.abs(change.value)}%
                {change.label && <span className="ml-1">{change.label}</span>}
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}