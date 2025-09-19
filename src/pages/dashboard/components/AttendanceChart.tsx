// src/pages/dashboard/components/AttendanceChart.tsx
import { DocumentChartBarIcon } from '@heroicons/react/24/outline'

export function AttendanceChart() {
  return (
    <div className="h-80 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <DocumentChartBarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Graphique des présences</p>
        <p className="text-sm">À implémenter avec une librairie de charts</p>
      </div>
    </div>
  )
}