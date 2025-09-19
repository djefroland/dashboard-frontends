// src/pages/dashboard/components/UpcomingEvents.tsx
import { Card, CardHeader, CardBody } from '@/components/ui'

export function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: 'Congé - Marie Dubois',
      date: 'Demain',
      type: 'leave',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      title: 'Réunion équipe',
      date: 'Vendredi 14h',
      type: 'meeting',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 3,
      title: 'Formation sécurité',
      date: 'Lundi prochain',
      type: 'training',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 4,
      title: 'Entretien candidat',
      date: 'Mercredi 10h',
      type: 'interview',
      color: 'bg-yellow-100 text-yellow-800'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900">
          Événements à venir
        </h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {event.title}
                </p>
                <p className="text-xs text-gray-500">{event.date}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.color}`}>
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}