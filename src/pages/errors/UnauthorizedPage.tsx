// src/pages/errors/UnauthorizedPage.tsx
const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">403</h1>
        <h2 className="text-2xl font-medium text-gray-700 mt-4">Accès non autorisé</h2>
        <p className="text-gray-600 mt-2">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
        <a 
          href="/dashboard" 
          className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Retour au Dashboard
        </a>
      </div>
    </div>
  )
}

export default UnauthorizedPage