// src/components/layout/Header/Header.tsx - Version Révolutionnaire
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { useAuth } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import {
  BellIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  SunIcon,
  SparklesIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

interface HeaderProps {
  onMenuToggle?: () => void
  showMenuToggle?: boolean
}

export const Header = ({ onMenuToggle, showMenuToggle = false }: HeaderProps) => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchFocused, setSearchFocused] = useState(false)
  const [notifications] = useState([
    {
      id: 1,
      title: 'Nouvelle demande de congé',
      message: 'Jean Martin a demandé 3 jours de congé',
      time: '5 min',
      unread: true,
      type: 'leave'
    },
    {
      id: 2,
      title: 'Rapport généré',
      message: 'Le rapport mensuel est prêt',
      time: '1h',
      unread: true,
      type: 'report'
    },
    {
      id: 3,
      title: 'Retard signalé',
      message: 'Sophie Leroy - Arrivée 9h45',
      time: '2h',
      unread: false,
      type: 'attendance'
    }
  ])

  const unreadCount = notifications.filter(n => n.unread).length

  // Mise à jour de l'heure en temps réel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  const userInitials = user 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : 'U'

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Bonjour'
    if (hour < 18) return 'Bon après-midi'
    return 'Bonsoir'
  }

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-secondary-200/50 shadow-sm relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 via-transparent to-accent-50/30 pointer-events-none"></div>
      
      <div className="relative flex items-center justify-between h-18 px-6">
        {/* Left side */}
        <div className="flex items-center space-x-6">
          {showMenuToggle && onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-xl hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 lg:hidden group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity rounded-xl"></div>
              <Bars3Icon className="h-6 w-6 text-secondary-500 group-hover:text-primary-600 transition-colors relative" />
            </button>
          )}

          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold font-display text-secondary-900 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-primary-600" />
                {getGreeting()}, {user?.firstName}
              </h1>
              <p className="text-sm text-secondary-600 font-medium">
                {currentTime.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className={clsx(
            'relative w-full transition-all duration-300',
            searchFocused ? 'scale-105' : ''
          )}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className={clsx(
                'h-5 w-5 transition-colors duration-300',
                searchFocused ? 'text-primary-500' : 'text-secondary-400'
              )} />
            </div>
            <input
              type="text"
              placeholder="Rechercher employés, rapports, congés..."
              className="block w-full pl-12 pr-4 py-3 border-2 border-secondary-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:border-primary-500 focus:ring-0 focus:bg-white transition-all duration-300 text-sm placeholder-secondary-400 font-medium"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchFocused && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <kbd className="px-2 py-1 text-xs font-semibold text-secondary-500 bg-secondary-100 border border-secondary-300 rounded">⌘</kbd>
                <kbd className="px-2 py-1 text-xs font-semibold text-secondary-500 bg-secondary-100 border border-secondary-300 rounded">K</kbd>
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Time display */}
          <div className="hidden sm:block text-right">
            <div className="text-lg font-mono font-bold text-primary-600">
              {currentTime.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
            <p className="text-xs text-secondary-500">Temps réel</p>
          </div>

          {/* Quick actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <button className="p-2 rounded-xl hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity rounded-xl"></div>
              <CommandLineIcon className="h-5 w-5 text-secondary-500 group-hover:text-primary-600 transition-colors relative" />
            </button>
            
            <button className="p-2 rounded-xl hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity rounded-xl"></div>
              <SunIcon className="h-5 w-5 text-secondary-500 group-hover:text-primary-600 transition-colors relative" />
            </button>
          </div>

          {/* Notifications */}
          <Menu as="div" className="relative">
            <Menu.Button className="relative p-2 rounded-xl hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity rounded-xl"></div>
              <BellIcon className="h-6 w-6 text-secondary-500 group-hover:text-primary-600 transition-colors relative" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-danger-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{unreadCount}</span>
                </span>
              )}
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-96 glass rounded-2xl border border-white/40 backdrop-blur-xl shadow-2xl focus:outline-none z-50">
                <div className="p-4 border-b border-white/20">
                  <h3 className="text-lg font-bold font-display text-secondary-900">
                    Notifications
                  </h3>
                  <p className="text-sm text-secondary-600">
                    {unreadCount} nouvelles notifications
                  </p>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <Menu.Item key={notification.id}>
                      {({ active }) => (
                        <div className={clsx(
                          'flex items-start space-x-3 p-4 transition-colors',
                          active && 'bg-primary-50/50',
                          notification.unread && 'bg-primary-50/30'
                        )}>
                          <div className={clsx(
                            'flex-shrink-0 w-3 h-3 rounded-full mt-2',
                            notification.type === 'leave' && 'bg-warning-400',
                            notification.type === 'report' && 'bg-success-400',
                            notification.type === 'attendance' && 'bg-primary-400'
                          )}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-secondary-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-secondary-600 truncate">
                              {notification.message}
                            </p>
                            <p className="text-xs text-secondary-500 mt-1">
                              Il y a {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full"></div>
                          )}
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </div>
                
                <div className="p-4 border-t border-white/20">
                  <button 
                    onClick={() => navigate('/notifications')}
                    className="w-full text-center py-2 text-primary-600 hover:text-primary-800 font-semibold transition-colors bg-primary-50 hover:bg-primary-100 rounded-xl"
                  >
                    Voir toutes les notifications
                  </button>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* User menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl"></div>
              
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <span className="text-sm font-bold text-white">
                    {userInitials}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-400 rounded-full border-2 border-white"></div>
              </div>
              
              {/* User info */}
              <div className="hidden md:block text-left relative">
                <p className="text-sm font-semibold text-secondary-900">
                  {user?.fullName || 'Utilisateur'}
                </p>
                <p className="text-xs text-secondary-500">
                  {user?.roleDisplayName}
                </p>
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-64 glass rounded-2xl border border-white/40 backdrop-blur-xl shadow-2xl focus:outline-none z-50">
                <div className="p-4 border-b border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-gradient rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-base font-bold text-white">
                        {userInitials}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-secondary-900">
                        {user?.fullName}
                      </p>
                      <p className="text-sm text-secondary-600">
                        {user?.email}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-600 mt-1">
                        {user?.roleDisplayName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate('/profile')}
                        className={clsx(
                          'flex w-full items-center px-4 py-3 text-sm font-medium transition-colors',
                          active ? 'bg-primary-50/50 text-primary-600' : 'text-secondary-700'
                        )}
                      >
                        <UserIcon className="mr-3 h-5 w-5" />
                        Mon profil
                      </button>
                    )}
                  </Menu.Item>
                  
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate('/profile/settings')}
                        className={clsx(
                          'flex w-full items-center px-4 py-3 text-sm font-medium transition-colors',
                          active ? 'bg-primary-50/50 text-primary-600' : 'text-secondary-700'
                        )}
                      >
                        <Cog6ToothIcon className="mr-3 h-5 w-5" />
                        Paramètres
                      </button>
                    )}
                  </Menu.Item>
                </div>
                
                <div className="border-t border-white/20 py-2">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={clsx(
                          'flex w-full items-center px-4 py-3 text-sm font-medium transition-colors',
                          active ? 'bg-danger-50/50 text-danger-600' : 'text-danger-600'
                        )}
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                        Se déconnecter
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-50"></div>
    </header>
  )
}