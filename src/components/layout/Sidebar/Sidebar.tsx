// src/components/layout/Sidebar/Sidebar.tsx
import { NavLink, useLocation } from 'react-router-dom'
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
  ChevronRightIcon,
  SparklesIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'
import './Sidebar.css'

// Types pour les éléments du menu
interface MenuItem {
  id: string
  label: string
  path: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
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
    badge: '3',
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
    badge: '5',
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
    <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
      {/* Header */}
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-logo">
            <div className="logo-icon">
              <RocketLaunchIcon />
            </div>
            <div className="logo-text">
              <h1>Dashboard RH</h1>
              <p>Moderne</p>
            </div>
          </div>
        )}
        
        {collapsed && (
          <div className="logo-icon">
            <RocketLaunchIcon />
          </div>
        )}
        
        {onToggle && (
          <button onClick={onToggle} className="toggle-button">
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        )}
      </div>

      {/* User info */}
      {!collapsed && user && (
        <div className="sidebar-user">
          <div className="user-card">
            <div className="user-info">
              <div className="user-avatar">
                <span>{user.firstName?.[0] || 'U'}{user.lastName?.[0] || 'S'}</span>
                <div className="user-status"></div>
              </div>
              <div className="user-details">
                <p>{user.fullName || `${user.firstName} ${user.lastName}`}</p>
                <p>{user.roleDisplayName || user.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sidebar-nav">
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          const IconComponent = item.icon
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={`nav-item ${collapsed ? 'collapsed' : ''} ${isActive ? 'active' : ''}`}
            >
              <IconComponent />
              {!collapsed && (
                <>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
        
        {/* Divider */}
        <div className="nav-divider"></div>
        
        {/* Quick stats */}
        {!collapsed && (
          <div className="sidebar-stats">
            <div className="stats-header">
              <SparklesIcon />
              Aujourd'hui
            </div>
            <div className="stats-item success">
              <span>Présents</span>
              <span>142/156</span>
            </div>
            <div className="stats-item warning">
              <span>En congé</span>
              <span>8</span>
            </div>
            <div className="stats-item info">
              <span>Remote</span>
              <span>12</span>
            </div>
            <div className="stats-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '91%' }}></div>
              </div>
              <p className="progress-text">91% de présence</p>
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <NavLink
          to="/profile"
          className={({ isActive }) => `nav-item ${collapsed ? 'collapsed' : ''} ${isActive ? 'active' : ''}`}
        >
          <Cog6ToothIcon />
          {!collapsed && <span>Paramètres</span>}
        </NavLink>

        {/* Version info */}
        {!collapsed && (
          <div className="version-info">
            <p>v2.0.1 - Dashboard Moderne</p>
            <div className="status-dots">
              <div className="status-dot success"></div>
              <div className="status-dot primary"></div>
              <div className="status-dot accent"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}