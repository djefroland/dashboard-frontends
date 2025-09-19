// src/components/layout/MainLayout/MainLayout.tsx
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar'
import { Header } from '../Header/Header'
import { useAuthInit } from '@/hooks/useAuthInit'
import { clsx } from 'clsx'

export const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Hook pour la gestion de l'auth
  useAuthInit()

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-30 transition-transform duration-300 lg:relative lg:translate-x-0',
        isMobile && sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'
      )}>
        <Sidebar 
          collapsed={sidebarCollapsed && !isMobile}
          onToggle={toggleSidebar}
        />
      </div>

      {/* Overlay pour mobile */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header 
          onMenuToggle={toggleSidebar}
          showMenuToggle={isMobile}
        />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}