import { useState, useEffect, ReactNode } from 'react'

interface DashboardData {
  totalEmployees: number
  presentToday: number
  onLeave: number
  remote: number
  pendingRequests: number
  todayHours: string
  weeklyHours: string
  pendingApprovals: number
}

interface ChangeInfo {
  type: 'increase' | 'decrease' | 'neutral'
  value: string
  label: string
}

interface StatsCardProps {
  title: string
  value: number | string
  change?: ChangeInfo
  color?: string
  icon: ReactNode
}

interface QuickActionProps {
  title: string
  description: string
  icon: ReactNode
  color?: string
  onClick: () => void
}

const DashboardPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [clockedIn, setClockedIn] = useState(false)
  const [attendanceTime, setAttendanceTime] = useState('08:42:13')
  const [isLoading, setIsLoading] = useState(false)
  const [dashboardData] = useState<DashboardData>({
    totalEmployees: 156,
    presentToday: 142,
    onLeave: 8,
    remote: 12,
    pendingRequests: 5,
    todayHours: '7h 23min',
    weeklyHours: '32h 15min',
    pendingApprovals: 3
  })

  // Mise à jour de l'heure en temps réel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleClockAction = () => {
    setIsLoading(true)
    setTimeout(() => {
      setClockedIn(!clockedIn)
      setIsLoading(false)
      const now = new Date()
      setAttendanceTime(now.toTimeString().substring(0, 8))
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const StatsCard = ({ title, value, change, color = 'blue', icon }: StatsCardProps) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {value}
          </p>
          {change && (
            <p className={`text-sm mt-1 ${
              change.type === 'increase' ? 'text-green-600' : change.type === 'decrease' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {change.type === 'increase' && '↗'} 
              {change.type === 'decrease' && '↘'} 
              {change.value} {change.label}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          {icon}
        </div>
      </div>
    </div>
  )

  const QuickAction = ({ title, description, icon, color = 'blue', onClick }: QuickActionProps) => (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 border-dashed border-${color}-200 hover:border-${color}-300 hover:bg-${color}-50 transition-all duration-200 text-left group`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${color}-100 group-hover:bg-${color}-200 transition-colors duration-200`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  )

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header avec heure en temps réel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bonjour, Marie Dubois</h1>
            <p className="text-gray-600 mt-1">
              {formatDate(currentTime)}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-3xl font-mono font-bold text-blue-600">
              {formatTime(currentTime)}
            </div>
            <p className="text-sm text-gray-500">Temps réel</p>
          </div>
        </div>
      </div>

      {/* Pointage */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Pointage du jour</h2>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-blue-100 text-sm">Statut</p>
                <p className="font-semibold">
                  {clockedIn ? 'Présent depuis' : 'Non pointé'}
                </p>
              </div>
              {clockedIn && (
                <div>
                  <p className="text-blue-100 text-sm">Arrivée</p>
                  <p className="font-semibold">{attendanceTime}</p>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleClockAction}
            disabled={isLoading}
            className={`mt-4 md:mt-0 px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              clockedIn 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-white text-blue-600 hover:bg-gray-50'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                <span>Traitement...</span>
              </div>
            ) : (
              clockedIn ? 'Pointer la sortie' : 'Pointer l\'arrivée'
            )}
          </button>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employés"
          value={dashboardData.totalEmployees}
          change={{ type: 'increase', value: '+3', label: 'ce mois' }}
          color="blue"
          icon={
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          }
        />

        <StatsCard
          title="Présents Aujourd'hui"
          value={dashboardData.presentToday}
          change={{ type: 'neutral', value: '91%', label: 'taux de présence' }}
          color="green"
          icon={
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatsCard
          title="En Congé"
          value={dashboardData.onLeave}
          change={{ type: 'neutral', value: '5%', label: 'de l\'effectif' }}
          color="yellow"
          icon={
            <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />

        <StatsCard
          title="En Télétravail"
          value={dashboardData.remote}
          change={{ type: 'increase', value: '+2', label: 'aujourd\'hui' }}
          color="purple"
          icon={
            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
            </svg>
          }
        />
      </div>

      {/* Section Actions rapides et Statistiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actions rapides */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
          <div className="space-y-3">
            <QuickAction
              title="Demander un congé"
              description="Nouvelle demande de congés"
              color="green"
              icon={
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              onClick={() => alert('Redirection vers demande de congé')}
            />
            <QuickAction
              title="Voir mes présences"
              description="Historique et statistiques"
              color="blue"
              icon={
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              onClick={() => alert('Redirection vers présences')}
            />
            <QuickAction
              title="Générer un rapport"
              description="Rapport personnalisé"
              color="purple"
              icon={
                <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              onClick={() => alert('Redirection vers rapports')}
            />
          </div>
        </div>

        {/* Notifications et tâches */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {dashboardData.pendingApprovals} nouvelles
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Demande de congé</p>
                <p className="text-sm text-gray-600">Jean Martin - 3 jours en août</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Retard signalé</p>
                <p className="text-sm text-gray-600">Sophie Leroy - Arrivée 9h45</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 3 heures</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Rapport généré</p>
                <p className="text-sm text-gray-600">Présences du mois disponible</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 5 heures</p>
              </div>
            </div>

            <button className="w-full text-center py-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
              Voir toutes les notifications →
            </button>
          </div>
        </div>
      </div>

      {/* Graphiques et statistiques avancées */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Présences de la semaine */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Présences cette semaine</h3>
          <div className="space-y-3">
            {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day, index) => {
              const attendance = [95, 88, 92, 85, 90][index]
              return (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-20">{day}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${attendance}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{attendance}%</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mes statistiques */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes Statistiques</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Heures aujourd'hui</span>
              <span className="font-semibold text-gray-900">{dashboardData.todayHours}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Heures cette semaine</span>
              <span className="font-semibold text-gray-900">{dashboardData.weeklyHours}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Congés restants</span>
              <span className="font-semibold text-green-600">15 jours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Taux présence</span>
              <span className="font-semibold text-blue-600">96%</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Voir détails complets
            </button>
          </div>
        </div>
      </div>

      {/* Actions management (visible selon le rôle) */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Actions Management</h3>
            <p className="text-sm text-gray-600">Actions disponibles selon votre rôle</p>
          </div>
          <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
            Rôle: RH Manager
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Approuver congés</p>
              <p className="text-sm text-gray-500">{dashboardData.pendingRequests} en attente</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Gérer employés</p>
              <p className="text-sm text-gray-500">156 employés actifs</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Rapports avancés</p>
              <p className="text-sm text-gray-500">Analytics & Export</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage