// src/App.tsx - Version finale avec toutes les optimisations
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import { AppRoutes } from '@/routes/AppRoutes'
import { AuthProvider } from '@/components/layout/AuthProvider'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import LoadingSpinner from '@/components/common/LoadingSpinner'

// Configuration des toasts globaux
const toasterConfig = {
  position: 'top-right' as const,
  duration: 4000,
  toastOptions: {
    // Style par défaut
    style: {
      background: '#363636',
      color: '#fff',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    // Style des toasts de succès
    success: {
      duration: 3000,
      iconTheme: {
        primary: '#10b981',
        secondary: '#fff',
      },
      style: {
        background: '#10b981',
        color: '#fff',
      },
    },
    // Style des toasts d'erreur
    error: {
      duration: 6000,
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
      style: {
        background: '#ef4444',
        color: '#fff',
      },
    },
    // Style des toasts d'information
    loading: {
      style: {
        background: '#3b82f6',
        color: '#fff',
      },
    },
  },
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          {/* Configuration des notifications toast */}
          <Toaster {...toasterConfig} />

          {/* Provider d'authentification avec gestion automatique */}
          <AuthProvider>
            <Suspense fallback={<LoadingSpinner />}>
              {/* Système de routage de l'application */}
              <AppRoutes />
            </Suspense>
          </AuthProvider>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App