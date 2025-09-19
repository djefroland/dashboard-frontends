// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleBasedRoute } from './RoleBasedRoute'
import { PublicRoute } from './PublicRoute'
import { UserRole } from '@/types/auth.types'
import { MainLayout } from '@/components/layout/MainLayout/MainLayout'
import LoadingSpinner from '@/components/common/LoadingSpinner'

// Lazy loading des pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'))
const AttendancePage = lazy(() => import('@/pages/attendance/AttendancePage'))
const EmployeesPage = lazy(() => import('@/pages/employees/EmployeesPage'))
const LeavesPage = lazy(() => import('@/pages/leaves/LeavesPage'))
const ReportsPage = lazy(() => import('@/pages/reports/ReportsPage'))
const NotificationsPage = lazy(() => import('@/pages/notifications/NotificationsPage'))
const UsersPage = lazy(() => import('@/pages/users/UsersPage'))
const UnauthorizedPage = lazy(() => import('@/pages/errors/UnauthorizedPage'))
const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'))

/**
 * Configuration des routes de l'application
 */
export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        
        {/* Routes protégées avec layout */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          {/* Dashboard - Accessible à tous les utilisateurs connectés */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* Profil - Accessible à tous */}
          <Route path="profile" element={<ProfilePage />} />
          
          {/* Présences - Accessible à tous */}
          <Route path="attendance/*" element={<AttendancePage />} />
          
          {/* Congés - Accessible à tous */}
          <Route path="leaves/*" element={<LeavesPage />} />
          
          {/* Notifications - Accessible à tous */}
          <Route path="notifications" element={<NotificationsPage />} />
          
          {/* Employés - RH et Directeur uniquement */}
          <Route path="employees/*" element={
            <RoleBasedRoute allowedRoles={[UserRole.DIRECTOR, UserRole.HR]}>
              <EmployeesPage />
            </RoleBasedRoute>
          } />
          
          {/* Gestion utilisateurs - RH et Directeur */}
          <Route path="users/*" element={
            <ProtectedRoute requiredPermissions={['canManageEmployees']}>
              <UsersPage />
            </ProtectedRoute>
          } />
          
          {/* Rapports - Selon les permissions */}
          <Route path="reports/*" element={<ReportsPage />} />
        </Route>
        
        {/* Pages d'erreur */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes