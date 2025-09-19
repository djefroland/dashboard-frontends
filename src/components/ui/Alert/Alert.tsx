// src/components/ui/Alert/Alert.tsx
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children: ReactNode
  onClose?: () => void
  className?: string
}

export const Alert = ({
  variant = 'info',
  title,
  children,
  onClose,
  className
}: AlertProps) => {
  const variantStyles = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-400',
      title: 'text-blue-800',
      content: 'text-blue-700'
    },
    success: {
      container: 'bg-green-50 border-green-200',
      icon: 'text-green-400',
      title: 'text-green-800',
      content: 'text-green-700'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-400',
      title: 'text-yellow-800',
      content: 'text-yellow-700'
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: 'text-red-400',
      title: 'text-red-800',
      content: 'text-red-700'
    }
  }

  const icons = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon
  }

  const Icon = icons[variant]
  const styles = variantStyles[variant]

  return (
    <div className={clsx(
      'rounded-lg border p-4',
      styles.container,
      className
    )}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={clsx('h-5 w-5', styles.icon)} />
        </div>
        
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={clsx('text-sm font-medium', styles.title)}>
              {title}
            </h3>
          )}
          
          <div className={clsx(
            'text-sm',
            styles.content,
            title ? 'mt-2' : ''
          )}>
            {children}
          </div>
        </div>
        
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={clsx(
                'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                'hover:bg-black hover:bg-opacity-10',
                variant === 'info' && 'text-blue-500 focus:ring-blue-600',
                variant === 'success' && 'text-green-500 focus:ring-green-600',
                variant === 'warning' && 'text-yellow-500 focus:ring-yellow-600',
                variant === 'error' && 'text-red-500 focus:ring-red-600'
              )}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}