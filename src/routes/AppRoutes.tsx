// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleBasedRoute } from './RoleBasedRoute'
import { PublicRoute } from './PublicRoute'
import { UserRole } from '@/types/auth.types'
import { MainLayout } from '@/components/layout/MainLayout/MainLayout'
import LoadingSpinner from '@/components/common/LoadingSpinner'

// Lazy loading des pages avec error boundary
const withLazyLoading = (Component: React.ComponentType) => {
  return (props: any) => (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  )
}

// Pages d'authentification
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const ChangePasswordPage = lazy(() => import('@/pages/auth/ChangePasswordPage'))

// Pages principales
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'))

// Modules métier
const AttendancePage = lazy(() => import('@/pages/attendance/AttendancePage'))
const EmployeesPage = lazy(() => import('@/pages/employees/EmployeesPage'))
const LeavesPage = lazy(() => import('@/pages/leaves/LeavesPage'))
const ReportsPage = lazy(() => import('@/pages/reports/ReportsPage'))
const NotificationsPage = lazy(() => import('@/pages/notifications/NotificationsPage'))
const UsersPage = lazy(() => import('@/pages/users/UsersPage'))

// Pages d'erreur
const UnauthorizedPage = lazy(() => import('@/pages/errors/UnauthorizedPage'))
const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'))

/**
 * Configuration complète des routes de l'application
 */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques - Accessibles sans authentification */}
      <Route path="/login" element={
        <PublicRoute>
          {withLazyLoading(LoginPage)({})}
        </PublicRoute>
      } />
      
      {/* Routes protégées avec layout principal */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        {/* Redirection racine vers dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboard - Accessible à tous les utilisateurs connectés */}
        <Route path="dashboard" element={withLazyLoading(DashboardPage)({})} />
        
        {/* Profil utilisateur - Accessible à tous */}
        <Route path="profile/*" element={
          <>
            <Route index element={withLazyLoading(ProfilePage)({})} />
            <Route path="change-password" element={withLazyLoading(ChangePasswordPage)({})} />
          </>
        } />
        
        {/* Module Présences - Accessible à tous les utilisateurs */}
        <Route path="attendance/*" element={withLazyLoading(AttendancePage)({})} />
        
        {/* Module Congés - Accessible à tous les utilisateurs */}
        <Route path="leaves/*" element={withLazyLoading(LeavesPage)({})} />
        
        {/* Notifications - Accessible à tous */}
        <Route path="notifications" element={withLazyLoading(NotificationsPage)({})} />
        
        {/* Gestion des Employés - RH et Directeur uniquement */}
        <Route path="employees/*" element={
          <RoleBasedRoute allowedRoles={[UserRole.DIRECTOR, UserRole.HR]}>
            {withLazyLoading(EmployeesPage)({})}
          </RoleBasedRoute>
        } />
        
        {/* Gestion des Utilisateurs - RH et Directeur uniquement */}
        <Route path="users/*" element={
          <RoleBasedRoute allowedRoles={[UserRole.DIRECTOR, UserRole.HR]}>
            {withLazyLoading(UsersPage)({})}
          </RoleBasedRoute>
        } />
        
        {/* Rapports - Accès basé sur les permissions */}
        <Route path="reports/*" element={
          <ProtectedRoute requiredPermissions={['canViewGlobalStats']}>
            {withLazyLoading(ReportsPage)({})}
          </ProtectedRoute>
        } />
        
        {/* Routes administratives - Directeur uniquement */}
        <Route path="admin/*" element={
          <RoleBasedRoute allowedRoles={[UserRole.DIRECTOR]}>
            {/* Routes admin à développer plus tard */}
            <div className="p-6">
              <h1 className="text-2xl font-bold">Administration</h1>
              <p>Interface d'administration - À développer</p>
            </div>
          </RoleBasedRoute>
        } />
      </Route>
      
      {/* Pages d'erreur */}
      <Route path="/unauthorized" element={withLazyLoading(UnauthorizedPage)({})} />
      <Route path="*" element={withLazyLoading(NotFoundPage)({})} />
    </Routes>
  )
}

export default AppRoutes