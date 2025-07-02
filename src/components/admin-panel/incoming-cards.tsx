'use client'

import * as React from 'react'
import useSWR from 'swr'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import TodayIcon from '@/icons/incomingCalls/totalСalls.svg'
import AnsweredIcon from '@/icons/incomingCalls/answeredCalls.svg'
import MissedIcon from '@/icons/incomingCalls/missedCalls.svg'
import AvrIcon from '@/icons/incomingCalls/avrCalls.svg'
import TransferIcon from '@/icons/incomingCalls/transfer.svg'
import { z } from 'zod'

interface Stats {
  total_calls_today: number
  answered_calls: number
  missed_calls: number
  average_duration: string
  transferred_calls: number
}

// Zod-схема для Stats
const StatsSchema = z.object({
  total_calls_today: z.number(),
  answered_calls: z.number(),
  missed_calls: z.number(),
  average_duration: z.string(),
  transferred_calls: z.number(),
})

// fetcher с Zod-валидацией и no-store
const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Ошибка ${res.status}`)
  const json = await res.json()
  return StatsSchema.parse(json)
}

const infoCards: Array<{
  label: keyof Stats
  title: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  percent: number
}> = [
  { label: 'total_calls_today',    title: 'Всего звонков сегодня', Icon: TodayIcon,     percent: 0 },
  { label: 'answered_calls',       title: 'Отвеченные звонки',     Icon: AnsweredIcon,  percent: 0 },
  { label: 'missed_calls',         title: 'Пропущенные звонки',     Icon: MissedIcon,    percent: 0 },
  { label: 'average_duration',     title: 'Средняя длительность',   Icon: AvrIcon,       percent: 0 },
  { label: 'transferred_calls',    title: 'Переведено на оператора',Icon: TransferIcon,  percent: 0 },
]

export function IncomingCards() {
  const { data: stats, error, isLoading, isValidating } = useSWR<Stats>(
    '/api/dashboard/stats',
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
      dedupingInterval: 0,
    }
  )
  const loadingInitial = isLoading

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
            {loadingInitial ? (
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

      {error && (
        <div className="col-span-full text-red-600 text-center">
          Ошибка загрузки статистики: {error.message}
        </div>
      )}
    </div>
  )
}
