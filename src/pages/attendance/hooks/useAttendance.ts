// src/pages/attendance/hooks/useAttendance.ts
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import type { AttendanceStatus } from '../types.ts'

export function useAttendance() {
  const [currentStatus, setCurrentStatus] = useState<AttendanceStatus | null>(null)
  const [todayStats, setTodayStats] = useState<any>(null)
  const [weekStats, setWeekStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Charger le statut actuel
    fetchCurrentStatus()
    fetchTodayStats()
    fetchWeekStats()
  }, [])

  const fetchCurrentStatus = async () => {
    // Simulation API call
    setCurrentStatus({
      id: 1,
      clockIn: null,
      clockOut: null,
      breakStart: null,
      breakEnd: null,
      isOnBreak: false,
      status: 'PRESENT',
      location: 'Bureau',
      isRemote: false
    })
  }

  const fetchTodayStats = async () => {
    setTodayStats({
      hoursWorked: 0,
      breakTime: 0,
      status: 'NOT_STARTED'
    })
  }

  const fetchWeekStats = async () => {
    setWeekStats({
      totalHours: 32,
      daysPresent: 4,
      punctualityRate: 85,
      overtimeHours: 2,
      breakTime: 4.5,
      remoteDays: 1
    })
  }

  const clockIn = async (data: any) => {
    setIsLoading(true)
    try {
      // Simulation API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCurrentStatus(prev => ({
        id: prev?.id || 1,
        clockIn: new Date().toISOString(),
        clockOut: prev?.clockOut || null,
        breakStart: prev?.breakStart || null,
        breakEnd: prev?.breakEnd || null,
        isOnBreak: prev?.isOnBreak || false,
        status: data.status,
        location: data.location,
        isRemote: data.isRemote,
        notes: data.notes
      }))
      
      toast.success('Arrivée pointée avec succès!')
    } catch (error) {
      toast.error('Erreur lors du pointage')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const clockOut = async (notes?: string) => {
    setIsLoading(true)
    try {
      // Simulation API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCurrentStatus(prev => {
        if (!prev) return null
        return {
          ...prev,
          clockOut: new Date().toISOString(),
          notes: notes
        }
      })
      
      toast.success('Départ pointé avec succès!')
    } catch (error) {
      toast.error('Erreur lors du pointage de sortie')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const startBreak = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCurrentStatus(prev => {
        if (!prev) return null
        return {
          ...prev,
          breakStart: new Date().toISOString(),
          isOnBreak: true
        }
      })
      
      toast.success('Pause commencée')
    } catch (error) {
      toast.error('Erreur lors du début de pause')
    } finally {
      setIsLoading(false)
    }
  }

  const endBreak = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCurrentStatus(prev => {
        if (!prev) return null
        return {
          ...prev,
          breakEnd: new Date().toISOString(),
          isOnBreak: false
        }
      })
      
      toast.success('Pause terminée')
    } catch (error) {
      toast.error('Erreur lors de la fin de pause')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    currentStatus,
    todayStats,
    weekStats,
    isLoading,
    clockIn,
    clockOut,
    startBreak,
    endBreak,
    refetch: fetchCurrentStatus
  }
}