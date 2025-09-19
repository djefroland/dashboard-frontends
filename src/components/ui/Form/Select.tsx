// src/components/ui/Form/Select.tsx
import { forwardRef, SelectHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
  isInvalid?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  label,
  error,
  helperText,
  options,
  placeholder,
  isInvalid,
  id,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error) || isInvalid

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {props.required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        ref={ref}
        id={selectId}
        className={clsx(
          // Base styles
          'block w-full rounded-lg border shadow-sm transition-colors duration-200 sm:text-sm',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
          
          // Error state
          hasError && 'border-danger-300 focus:border-danger-500 focus:ring-danger-500',
          
          // Disabled state
          props.disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed',
          
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {(error || helperText) && (
        <p className={clsx(
          'text-sm',
          error ? 'text-danger-600' : 'text-gray-500'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'