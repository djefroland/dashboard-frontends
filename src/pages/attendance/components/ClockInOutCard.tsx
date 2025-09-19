// src/pages/attendance/components/ClockInOutCard.tsx
import { useState } from 'react'
import { Card, CardHeader, CardBody, Button, Input, Select, Checkbox } from '@/components/ui'
import { ClockIcon, MapPinIcon, PlayIcon, StopIcon, PauseIcon } from '@heroicons/react/24/outline'
import type { AttendanceStatus } from '../types.ts'

interface ClockInOutCardProps {
  currentStatus: AttendanceStatus | null
  currentTime: Date
  onClockIn: (data: any) => Promise<void>
  onClockOut: (notes?: string) => Promise<void>
  onStartBreak: () => Promise<void>
  onEndBreak: () => Promise<void>
  isLoading: boolean
}

export function ClockInOutCard({ 
  currentStatus, 
  currentTime, 
  onClockIn, 
  onClockOut,
  onStartBreak,
  onEndBreak,
  isLoading 
}: ClockInOutCardProps) {
  const [notes, setNotes] = useState('')
  const [location, setLocation] = useState('')
  const [isRemote, setIsRemote] = useState(false)
  const [attendanceType, setAttendanceType] = useState('PRESENT')

  const handleClockIn = async () => {
    try {
      await onClockIn({
        location: location || 'Bureau',
        notes,
        isRemote,
        status: attendanceType
      })
      
      setNotes('')
      setLocation('')
    } catch (error) {
      console.error('Erreur lors du pointage:', error)
    }
  }

  const handleClockOut = async () => {
    try {
      await onClockOut(notes)
      setNotes('')
    } catch (error) {
      console.error('Erreur lors du pointage de sortie:', error)
    }
  }

  const canClockIn = !currentStatus?.clockIn
  const canClockOut = currentStatus?.clockIn && !currentStatus?.clockOut
  const canStartBreak = currentStatus?.clockIn && !currentStatus?.clockOut && !currentStatus?.isOnBreak
  const canEndBreak = currentStatus?.isOnBreak

  const getWorkingTime = () => {
    if (!currentStatus?.clockIn) return '00:00:00'
    
    const start = new Date(currentStatus.clockIn)
    const now = currentTime
    const diff = now.getTime() - start.getTime()
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center">
          <ClockIcon className="h-6 w-6 text-primary-600 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">Pointage</h3>
            <p className="text-sm text-gray-500">Gérez vos heures de travail</p>
          </div>
        </div>
      </CardHeader>

      <CardBody className="space-y-6">
        {/* Temps de travail actuel */}
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {getWorkingTime()}
          </div>
          <p className="text-sm text-gray-600">Temps de travail aujourd'hui</p>
          
          {currentStatus?.isOnBreak && (
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
              <PauseIcon className="h-4 w-4 mr-1" />
              En pause
            </div>
          )}
        </div>

        {/* Formulaire de pointage */}
        {canClockIn && (
          <div className="space-y-4">
            <Select
              label="Type de présence"
              value={attendanceType}
              onChange={(e) => setAttendanceType(e.target.value)}
              options={[
                { value: 'PRESENT', label: 'Présent au bureau' },
                { value: 'REMOTE', label: 'Télétravail' },
                { value: 'HALF_DAY', label: 'Demi-journée' },
                { value: 'TRAINING', label: 'Formation' },
                { value: 'BUSINESS_TRIP', label: 'Déplacement professionnel' }
              ]}
            />

            <Input
              label="Localisation"
              placeholder="Bureau principal, domicile, client..."
              leftIcon={<MapPinIcon className="h-5 w-5" />}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Checkbox
              label="Travail à distance"
              checked={isRemote}
              onChange={(e) => setIsRemote(e.target.checked)}
            />

            <Input
              label="Notes (optionnel)"
              placeholder="Commentaires sur votre journée..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        )}

        {(canClockOut || currentStatus?.isOnBreak) && (
          <Input
            label="Notes de fin de journée"
            placeholder="Résumé de votre journée..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          {canClockIn && (
            <Button
              variant="primary"
              leftIcon={<PlayIcon className="h-4 w-4" />}
              onClick={handleClockIn}
              isLoading={isLoading}
              fullWidth
            >
              Pointer l'arrivée
            </Button>
          )}

          {canClockOut && (
            <Button
              variant="danger"
              leftIcon={<StopIcon className="h-4 w-4" />}
              onClick={handleClockOut}
              isLoading={isLoading}
              fullWidth
            >
              Pointer le départ
            </Button>
          )}

          {canStartBreak && (
            <Button
              variant="warning"
              leftIcon={<PauseIcon className="h-4 w-4" />}
              onClick={onStartBreak}
              isLoading={isLoading}
              fullWidth
            >
              Commencer pause
            </Button>
          )}

          {canEndBreak && (
            <Button
              variant="success"
              leftIcon={<PlayIcon className="h-4 w-4" />}
              onClick={onEndBreak}
              isLoading={isLoading}
              fullWidth
            >
              Reprendre travail
            </Button>
          )}
        </div>

        {/* Statut actuel */}
        {currentStatus && (
          <div className="pt-4 border-t space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Arrivée:</span>
              <span className="font-medium">
                {currentStatus.clockIn ? new Date(currentStatus.clockIn).toLocaleTimeString('fr-FR') : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Départ:</span>
              <span className="font-medium">
                {currentStatus.clockOut ? new Date(currentStatus.clockOut).toLocaleTimeString('fr-FR') : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Localisation:</span>
              <span className="font-medium">{currentStatus.location || 'Bureau'}</span>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  )
}