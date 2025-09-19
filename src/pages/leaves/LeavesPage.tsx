// src/pages/leaves/LeavesPage.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import LeavesOverview from './LeavesOverview'
import { LeaveRequestForm } from './components/LeaveRequestForm'
import { ApprovalQueue } from './components/ApprovalQueue'

export default function LeavesPage() {
  // TODO: Remplacer par la vérification des rôles appropriée une fois le store disponible
  const isManager = true // Temporaire

  return (
    <Routes>
      <Route path="/" element={<LeavesOverview />} />
      <Route path="/request" element={<LeaveRequestForm />} />
      <Route path="/approval" element={
        isManager ? <ApprovalQueue /> : <Navigate to="/leaves" />
      } />
    </Routes>
  )
}