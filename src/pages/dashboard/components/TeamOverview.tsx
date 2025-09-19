// src/pages/dashboard/components/TeamOverview.tsx
import { Card, CardHeader, CardBody } from '@/components/ui'

export function TeamOverview() {
  const teamData = [
    { name: 'Développement', present: 8, total: 10, percentage: 80 },
    { name: 'Marketing', present: 5, total: 6, percentage: 83 },
    { name: 'RH', present: 3, total: 3, percentage: 100 },
    { name: 'Commercial', present: 12, total: 15, percentage: 80 }
  ]

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900">
          Présences par équipe
        </h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {teamData.map((team) => (
            <div key={team.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-900">{team.name}</span>
                <span className="text-gray-500">
                  {team.present}/{team.total} ({team.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${team.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}