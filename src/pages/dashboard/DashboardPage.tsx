// src/pages/dashboard/DashboardPage.tsx
import { useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  UserGroupIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  HomeIcon,
  CalendarDaysIcon,
  DocumentChartBarIcon,
  PlayIcon,
  StopIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'

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

interface StatsCardProps {
  title: string
  value: number | string
  change?: {
    type: 'increase' | 'decrease' | 'neutral'
    value: string
    label: string
  }
  color: 'primary' | 'success' | 'warning' | 'danger'
  icon: ReactNode
  onClick?: () => void
}

interface QuickActionProps {
  title: string
  description: string
  icon: ReactNode
  color: 'primary' | 'success' | 'warning' | 'danger'
  onClick: () => void
}

const DashboardPage = () => {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [clockedIn, setClockedIn] = useState(false)
  const [attendanceTime, setAttendanceTime] = useState('08:42:13')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
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

  // Animation d'entrée
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

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

  const StatsCard = ({ title, value, change, color, icon, onClick }: StatsCardProps) => {
    
    return (
      <div className={`stat-card ${color}`} onClick={onClick}>
        <div className="stat-card-content">
          <div className="stat-card-header">
            <div className="stat-card-info">
              <p className="stat-label">{title}</p>
              <p className="stat-value">{typeof value === 'number' ? value.toLocaleString() : value}</p>
              {change && (
                <div className={`stat-change ${
                  change.type === 'increase' ? 'positive' : 
                  change.type === 'decrease' ? 'negative' : 'neutral'
                }`}>
                  {change.type === 'increase' && <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />}
                  {change.type === 'decrease' && <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />}
                  {change.value} {change.label}
                </div>
              )}
            </div>
            
            <div className={`stat-icon-container ${color}`}>
              <div className="stat-icon">
                {icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const QuickAction = ({ title, description, icon, color, onClick }: QuickActionProps) => {
    return (
      <button onClick={onClick} className={`action-card ${color}`}>
        <div className="action-card-content">
          <div className={`action-card-icon ${color}`}>
            {icon}
          </div>
          <div className="action-card-info">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className={`dashboard-container ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.7s ease' }}>
      <div className="main-content">
        {/* Header avec effet glass */}
        <div className="page-header">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-primary-gradient p-3 rounded-xl shadow-lg">
                  <SparklesIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold font-display text-gradient">
                    Bonjour, Marie Dubois
                  </h1>
                  <p className="text-secondary-600 font-medium">
                    {formatDate(currentTime)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/40">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-primary-600 mb-2 animate-pulse">
                  {formatTime(currentTime)}
                </div>
                <p className="text-sm text-secondary-600 font-medium">Temps réel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pointage révolutionnaire */}
        <div className="bg-primary-gradient rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden animate-slide-in" style={{ animationDelay: '0.1s' }}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor"/>
              </pattern>
              <rect width="100" height="100" fill="url(#pattern)"/>
            </svg>
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-2xl font-bold font-display mb-4 flex items-center">
                <ClockIcon className="w-8 h-8 mr-3" />
                Pointage du jour
              </h2>
              <div className="flex items-center space-x-8">
                <div>
                  <p className="text-primary-100 text-sm mb-1">Statut</p>
                  <p className="font-bold text-xl">
                    {clockedIn ? 'Présent depuis' : 'Non pointé'}
                  </p>
                </div>
                {clockedIn && (
                  <div>
                    <p className="text-primary-100 text-sm mb-1">Arrivée</p>
                    <p className="font-bold text-xl font-mono">{attendanceTime}</p>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={handleClockAction}
              disabled={isLoading}
              className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-600 border-t-transparent"></div>
                  <span>Traitement...</span>
                </>
              ) : (
                <>
                  {clockedIn ? (
                    <StopIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  ) : (
                    <PlayIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  )}
                  <span>{clockedIn ? 'Pointer la sortie' : 'Pointer l\'arrivée'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* KPIs révolutionnaires */}
        <div className="stats-grid">
          <StatsCard
            title="Total Employés"
            value={dashboardData.totalEmployees}
            change={{ type: 'increase', value: '+3', label: 'ce mois' }}
            color="primary"
            icon={<UserGroupIcon className="w-8 h-8" />}
            onClick={() => navigate('/employees')}
          />

          <StatsCard
            title="Présents Aujourd'hui"
            value={dashboardData.presentToday}
            change={{ type: 'neutral', value: '91%', label: 'taux de présence' }}
            color="success"
            icon={<CheckCircleIcon className="w-8 h-8" />}
            onClick={() => navigate('/attendance')}
          />

          <StatsCard
            title="En Congé"
            value={dashboardData.onLeave}
            change={{ type: 'neutral', value: '5%', label: 'de l\'effectif' }}
            color="warning"
            icon={<CalendarDaysIcon className="w-8 h-8" />}
            onClick={() => navigate('/leaves')}
          />

          <StatsCard
            title="En Télétravail"
            value={dashboardData.remote}
            change={{ type: 'increase', value: '+2', label: 'aujourd\'hui' }}
            color="danger"
            icon={<HomeIcon className="w-8 h-8" />}
            onClick={() => navigate('/attendance')}
          />
        </div>

        {/* Section Actions rapides */}
        <div className="page-header">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <SparklesIcon className="w-6 h-6 mr-3" style={{ color: '#3b82f6' }} />
            Actions Rapides
          </h3>
          <div className="action-grid">
            <QuickAction
              title="Demander un congé"
              description="Nouvelle demande de congés"
              color="success"
              icon={<CalendarDaysIcon className="w-6 h-6" />}
              onClick={() => navigate('/leaves/request')}
            />
            <QuickAction
              title="Voir mes présences"
              description="Historique et statistiques"
              color="primary"
              icon={<ClockIcon className="w-6 h-6" />}
              onClick={() => navigate('/attendance')}
            />
            <QuickAction
              title="Générer un rapport"
              description="Rapport personnalisé"
              color="warning"
              icon={<DocumentChartBarIcon className="w-6 h-6" />}
              onClick={() => navigate('/reports')}
            />
          </div>
        </div>


      </div>
    </div>
  )
}

export default DashboardPage