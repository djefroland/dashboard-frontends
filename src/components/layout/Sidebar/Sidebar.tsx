// src/components/layout/Sidebar/Sidebar.tsx
import { NavLink, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import { useAuth } from '@/store/authStore'
import {
  HomeIcon,
  UserGroupIcon,
  ClockIcon,
  CalendarDaysIcon,
  DocumentChartBarIcon,
  BellIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

// Types pour les éléments du menu
interface MenuItem {
  id: string
  label: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  roles?: string[]
  children?: MenuItem[]
}

// Configuration du menu principal
const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: HomeIcon,
    roles: ['DIRECTOR', 'HR', 'TEAM_LEADER', 'EMPLOYEE', 'INTERN']
  },
  {
    id: 'attendance',
    label: 'Présences',
    path: '/attendance',
    icon: ClockIcon,
    roles: ['DIRECTOR', 'HR', 'TEAM_LEADER', 'EMPLOYEE', 'INTERN']
  },
  {
    id: 'leaves',
    label: 'Congés',
    path: '/leaves',
    icon: CalendarDaysIcon,
    roles: ['DIRECTOR', 'HR', 'TEAM_LEADER', 'EMPLOYEE', 'INTERN']
  },
  {
    id: 'employees',
    label: 'Employés',
    path: '/employees',
    icon: UserGroupIcon,
    roles: ['DIRECTOR', 'HR']
  },
  {
    id: 'users',
    label: 'Utilisateurs',
    path: '/users',
    icon: UsersIcon,
    roles: ['DIRECTOR', 'HR']
  },
  {
    id: 'reports',
    label: 'Rapports',
    path: '/reports',
    icon: DocumentChartBarIcon,
    roles: ['DIRECTOR', 'HR', 'TEAM_LEADER']
  },
  {
    id: 'notifications',
    label: 'Notifications',
    path: '/notifications',
    icon: BellIcon,
    roles: ['DIRECTOR', 'HR', 'TEAM_LEADER', 'EMPLOYEE', 'INTERN']
  }
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export const Sidebar = ({ collapsed = false, onToggle }: SidebarProps) => {
  const { user } = useAuth()
  const location = useLocation()

  // Filtrer les éléments du menu selon le rôle
  const filteredMenuItems = menuItems.filter(item => 
    !item.roles || (user?.role && item.roles.includes(user.role))
  )

  return (
    <div className={clsx(
      'bg-white border-r border-gray-200 flex flex-col transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header de la sidebar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RH</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Dashboard RH</h1>
            </div>
          </div>
        )}
        
        {!collapsed && onToggle && (
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
          </button>
        )}
        
        {collapsed && onToggle && (
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => clsx(
              'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              isActive || location.pathname.startsWith(item.path)
                ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            <item.icon className={clsx(
              'flex-shrink-0 h-5 w-5 transition-colors duration-200',
              collapsed ? 'mx-auto' : 'mr-3'
            )} />
            
            {!collapsed && (
              <span className="flex-1">{item.label}</span>
            )}
            
            {!collapsed && item.badge && (
              <span className="ml-auto bg-primary-100 text-primary-600 text-xs font-medium px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer de la sidebar */}
      <div className="border-t border-gray-200 p-3">
        <NavLink
          to="/profile"
          className={({ isActive }) => clsx(
            'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
            isActive
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          )}
        >
          <Cog6ToothIcon className={clsx(
            'flex-shrink-0 h-5 w-5',
            collapsed ? 'mx-auto' : 'mr-3'
          )} />
          {!collapsed && <span>Paramètres</span>}
        </NavLink>
      </div>
    </div>
  )
}