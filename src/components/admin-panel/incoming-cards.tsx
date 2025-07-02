'use client'

import { Skeleton } from "@/components/ui/skeleton"
import * as React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import TodayIcon from '@/icons/incomingCalls/totalСalls.svg'
import AnsweredIcon from '@/icons/incomingCalls/answeredCalls.svg'
import MissedIcon from '@/icons/incomingCalls/missedCalls.svg'
import AvrIcon from '@/icons/incomingCalls/avrCalls.svg'
import TransferIcon from '@/icons/incomingCalls/transfer.svg'

interface Stats {
  total_calls_today: number
  answered_calls: number
  missed_calls: number
  average_duration: string
  transferred_calls: number
}

const infoCards: Array<{
  label: keyof Stats
  title: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  percent: number
}> = [
  { label: 'total_calls_today', title: 'Всего звонков сегодня', Icon: TodayIcon, percent: 0 },
  { label: 'answered_calls', title: 'Отвеченные звонки', Icon: AnsweredIcon, percent: 0 },
  { label: 'missed_calls', title: 'Пропущенные звонки', Icon: MissedIcon, percent: 0 },
  { label: 'average_duration', title: 'Средняя длительность', Icon: AvrIcon, percent: 0 },
  { label: 'transferred_calls', title: 'Переведено на оператора', Icon: TransferIcon, percent: 0 },
]

export function IncomingCards() {
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetch('/api/dashboard/stats', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error(`Ошибка ${res.status}`)
        return res.json()
      })
      .then(json => setStats(json as Stats))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (error) return <div className="text-red-600">Ошибка: {error}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
      {infoCards.map(({ label, title, Icon, percent }) => (
        <Card key={label} className="flex flex-col p-3 w-48 h-36">
          <CardHeader className="flex items-start gap-3 p-0">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{ backgroundColor: '#E4F2FD', width: 32, height: 32 }}
            >
              <Icon className="h-6 w-6" />
            </div>
            <CardTitle className="text-xs text-left flex-1 p-0 leading-tight">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-baseline gap-1 p-0">
            {loading ? (
              <>
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-8" />
              </>
            ) : (
              <>
                <div className="text-xl font-bold text-left">
                  {label === 'average_duration'
                    ? stats![label] || '—'
                    : (stats![label] as number).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  +{percent}%
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
