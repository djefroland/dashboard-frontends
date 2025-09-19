// src/components/ui/Loading/Loading.tsx
import { clsx } from 'clsx'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
  className?: string
}

export const Loading = ({
  size = 'md',
  text,
  fullScreen = false,
  className
}: LoadingProps) => {
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  const LoadingSpinner = (
    <div className={clsx('flex flex-col items-center justify-center', className)}>
      <div className={clsx(
        'animate-spin rounded-full border-2 border-gray-300 border-t-primary-600',
        sizeStyles[size]
      )} />
      
      {text && (
        <p className={clsx(
          'mt-2 text-gray-600',
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
        )}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        {LoadingSpinner}
      </div>
    )
  }

  return LoadingSpinner
}