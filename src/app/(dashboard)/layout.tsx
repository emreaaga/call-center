'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout'
import { scheduleRefresh } from '@/hooks/auth'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')

    if (!token) {
      router.replace('/login')
    } else {
      setIsChecked(true)
    }
  }, [router])

  useEffect(() => {
    const expiresInStr = sessionStorage.getItem('expiresIn')
    if (expiresInStr) {
      const expiresIn = parseInt(expiresInStr, 10)
      scheduleRefresh(expiresIn)
      console.log('[auth] Запланирован рефреш токена через', expiresIn, 'мс')
    }
  }, [])

  if (!isChecked) {
    return null 
  }

  return <AdminPanelLayout>{children}</AdminPanelLayout>
}
