// src/pages/errors/NotFoundPage.tsx
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mt-4">Page non trouvée</h2>
        <p className="text-gray-600 mt-2">La page que vous cherchez n'existe pas ou a été déplacée.</p>
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

export default NotFoundPage