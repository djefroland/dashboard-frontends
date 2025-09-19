// src/components/ui/Card/Card.tsx
import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'shadow' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  divider?: boolean
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  divider?: boolean
  actions?: boolean
}

const cardVariants = {
  default: 'bg-white border border-gray-200 rounded-xl',
  bordered: 'bg-white border-2 border-gray-200 rounded-xl',
  shadow: 'bg-white border border-gray-200 rounded-xl shadow-soft',
  elevated: 'bg-white border border-gray-200 rounded-xl shadow-medium'
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
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        cardVariants[variant],
        cardPadding[padding],
        hover && 'transition-all duration-200 hover:shadow-medium hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

// Composant Card Header
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({
  className,
  divider = true,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'px-6 py-4',
        divider && 'border-b border-gray-200',
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
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'px-6 py-4 rounded-b-xl',
        divider && 'border-t border-gray-200 bg-gray-50',
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

// Composant Stats Card spécialisé pour le Dashboard
interface StatsCardProps extends Omit<CardProps, 'children'> {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease' | 'neutral'
    label?: string
  }
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray'
}

export const StatsCard = ({
  title,
  value,
  change,
  icon,
  color = 'blue',
  className,
  ...props
}: StatsCardProps) => {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    gray: 'bg-gray-50 text-gray-600 border-gray-200'
  }

  const changeStyles = {
    increase: 'text-success-600 bg-success-50',
    decrease: 'text-danger-600 bg-danger-50',
    neutral: 'text-gray-600 bg-gray-50'
  }

  return (
    <Card 
      variant="shadow" 
      hover
      className={clsx('relative overflow-hidden', className)}
      {...props}
    >
      {/* Icon background */}
      {icon && (
        <div className={clsx(
          'absolute top-4 right-4 p-2 rounded-lg',
          colorStyles[color]
        )}>
          {icon}
        </div>
      )}

      <CardBody>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          
          <div className="flex items-baseline space-x-3">
            <p className="text-3xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            
            {change && (
              <div className={clsx(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                changeStyles[change.type]
              )}>
                {change.type === 'increase' && (
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                
                {change.type === 'decrease' && (
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
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