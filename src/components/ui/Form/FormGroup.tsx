// src/components/ui/Form/FormGroup.tsx
import React from 'react'
import { clsx } from 'clsx'

interface FormGroupProps {
  children: React.ReactNode
  className?: string
  direction?: 'row' | 'column'
  spacing?: 'sm' | 'md' | 'lg'
}

export const FormGroup = ({
  children,
  className,
  direction = 'column',
  spacing = 'md'
}: FormGroupProps) => {
  const spacingStyles = {
    sm: direction === 'row' ? 'space-x-2' : 'space-y-2',
    md: direction === 'row' ? 'space-x-4' : 'space-y-4',
    lg: direction === 'row' ? 'space-x-6' : 'space-y-6'
  }

  return (
    <div className={clsx(
      'flex',
      direction === 'row' ? 'flex-row items-end' : 'flex-col',
      spacingStyles[spacing],
      className
    )}>
      {children}
    </div>
  )
}