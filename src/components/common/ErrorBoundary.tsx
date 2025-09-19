// src/components/common/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui'
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Error Boundary pour capturer les erreurs React
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // Envoyer l'erreur à un service de monitoring (Sentry, LogRocket, etc.)
    if (process.env.NODE_ENV === 'production') {
      // TODO: Intégrer service de monitoring
      console.error('Production error:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      })
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  override render() {
    if (this.state.hasError) {
      // Fallback personnalisé si fourni
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Interface d'erreur par défaut
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="text-center">
              <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Oops ! Une erreur est survenue
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Une erreur inattendue s'est produite. Veuillez réessayer ou recharger la page.
              </p>

              {/* Détails de l'erreur en mode développement */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg text-left">
                  <h3 className="text-sm font-medium text-red-800 mb-2">
                    Détails de l'erreur (dev) :
                  </h3>
                  <pre className="text-xs text-red-700 whitespace-pre-wrap overflow-auto max-h-32">
                    {this.state.error.message}
                  </pre>
                  {this.state.error.stack && (
                    <details className="mt-2">
                      <summary className="text-xs text-red-600 cursor-pointer">
                        Stack trace
                      </summary>
                      <pre className="text-xs text-red-600 whitespace-pre-wrap mt-1">
                        {this.state.error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleReset}
                  variant="primary"
                  leftIcon={<ArrowPathIcon className="h-4 w-4" />}
                >
                  Réessayer
                </Button>
                <Button
                  onClick={this.handleReload}
                  variant="secondary"
                >
                  Recharger la page
                </Button>
                <Button
                  onClick={() => window.location.href = '/dashboard'}
                  variant="ghost"
                >
                  Retour au dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook pour la gestion d'erreurs dans les composants fonctionnels
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: string) => {
    console.error('Error caught by useErrorHandler:', error)
    
    // En production, envoyer à un service de monitoring
    if (process.env.NODE_ENV === 'production') {
      // TODO: Intégrer service de monitoring
      console.error('Production error via hook:', {
        error: error.message,
        stack: error.stack,
        info: errorInfo
      })
    }
  }

  return { handleError }
}

export default ErrorBoundary