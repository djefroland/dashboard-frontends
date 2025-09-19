// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import './index.css'

// Initialisation de l'application
const initApp = () => {
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    throw new Error('Root element not found')
  }

  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  )
}

// Démarrer l'application
try {
  initApp()
} catch (error) {
  console.error('Failed to initialize app:', error)
  
  // Fallback en cas d'erreur critique au démarrage
  document.getElementById('root')!.innerHTML = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: system-ui, sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <h1 style="color: #dc2626; margin-bottom: 16px;">
        Erreur critique
      </h1>
      <p style="color: #6b7280; margin-bottom: 24px;">
        L'application n'a pas pu démarrer correctement.
      </p>
      <button 
        onclick="window.location.reload()" 
        style="
          background: #2563eb;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        "
      >
        Recharger la page
      </button>
    </div>
  `
}