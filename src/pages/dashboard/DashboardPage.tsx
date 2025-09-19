// src/pages/dashboard/DashboardPage.tsx
const DashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium">Présences</h3>
          <p className="text-gray-600">Gérer les présences des employés</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium">Congés</h3>
          <p className="text-gray-600">Demandes de congés en attente</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium">Équipe</h3>
          <p className="text-gray-600">Vue d'ensemble de l'équipe</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage