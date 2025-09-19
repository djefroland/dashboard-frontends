// src/pages/attendance/AttendancePage.tsx
import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { ClockInOutCard } from './components/ClockInOutCard.tsx'
import { TodayStatus } from './components/TodayStatus.tsx'
import { AttendanceHistory } from './components/AttendanceHistory.tsx'
import { AttendanceStats } from './components/AttendanceStats.tsx'
import { useAttendance } from './hooks/useAttendance.ts'

export default function AttendancePage() {
  const {
    currentStatus,
    todayStats,
    weekStats,
    isLoading,
    clockIn,
    clockOut,
    startBreak,
    endBreak
  } = useAttendance()

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <PageHeader
        title="Pointage & Présences"
        subtitle={`${formatDate(currentTime)} - ${formatTime(currentTime)}`}
      />

      <div className="space-y-8">
        {/* Status aujourd'hui */}
        <TodayStatus currentStatus={currentStatus} todayStats={todayStats} />

        {/* Actions de pointage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ClockInOutCard
            currentStatus={currentStatus}
            currentTime={currentTime}
            onClockIn={clockIn}
            onClockOut={clockOut}
            onStartBreak={startBreak}
            onEndBreak={endBreak}
            isLoading={isLoading}
          />

          <AttendanceStats weekStats={weekStats} />
        </div>

        {/* Historique */}
        <AttendanceHistory />
      </div>
    </>
  )
}
