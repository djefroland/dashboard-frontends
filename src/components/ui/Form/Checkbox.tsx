// src/components/ui/Form/Checkbox.tsx
import { forwardRef, InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  isInvalid?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  className,
  label,
  description,
  isInvalid,
  id,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={clsx(
            'h-4 w-4 rounded border-gray-300 text-primary-600 transition-colors duration-200',
            'focus:ring-primary-500 focus:ring-2 focus:ring-offset-0',
            isInvalid && 'border-danger-300 text-danger-600 focus:ring-danger-500',
            props.disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        />
      </div>
      
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <label 
              htmlFor={checkboxId}
              className={clsx(
                'text-sm font-medium',
                props.disabled ? 'text-gray-400' : 'text-gray-700'
              )}
            >
              {label}
            </label>
          )}
          
          {description && (
            <p className={clsx(
              'text-sm',
              props.disabled ? 'text-gray-400' : 'text-gray-500'
            )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'