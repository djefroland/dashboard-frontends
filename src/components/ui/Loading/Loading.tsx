// src/components/ui/Loading/Loading.tsx
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
  const spinnerStyle: React.CSSProperties = {
    width: size === 'sm' ? '16px' : size === 'lg' ? '32px' : '24px',
    height: size === 'sm' ? '16px' : size === 'lg' ? '32px' : '24px'
  }

  const textStyle: React.CSSProperties = {
    fontSize: size === 'sm' ? '12px' : size === 'lg' ? '16px' : '14px',
    marginTop: '8px',
    color: '#6b7280'
  }

  const LoadingSpinner = (
    <div className={`loading-container ${className || ''}`}>
      <div className="loading-spinner" style={spinnerStyle} />
      {text && <p style={textStyle}>{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="loading-overlay">
        {LoadingSpinner}
      </div>
    )
  }

  return LoadingSpinner
}