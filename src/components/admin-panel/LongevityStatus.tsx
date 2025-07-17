'use client'

import * as React from 'react'
import useSWR from 'swr'
import { AreaChart, Area, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { fetchCharts, WeeklyDuration } from '@/lib/fetch-charts'

const chartConfig = {
  call_count: { label: 'Кол-во звонков', color: 'var(--chart-1)' },
  duration:   { label: 'Длительность',    color: 'var(--chart-2)' },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const { data, error, isLoading } = useSWR('/api/dashboard/charts', fetchCharts)

  if (isLoading) {
    return (
      <Card className="pt-0">
        <CardContent>Загрузка...</CardContent>
      </Card>
    )
  }
  if (error) {
    return (
      <Card className="pt-0">
        <CardContent className="text-red-600">{error.message}</CardContent>
      </Card>
    )
  }
  if (!data) {
    return null
  }

  let chartData: WeeklyDuration[] = data.weekly_duration

  const dayOrder = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  chartData = [...chartData].sort(
    (a,b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
  )

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="flex-1">
          <CardTitle>Статистика по звонкам</CardTitle>
          <CardDescription>За последние 7 дней</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart
            data={chartData}
          >
            <defs>
              <linearGradient id="fillCallCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--chart-1)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="fillDuration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--chart-2)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              interval={0}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Area
              dataKey="call_count"
              type="natural"
              fill="url(#fillCallCount)"
              stroke="var(--chart-1)"
              stackId="a"
            />
            <Area
              dataKey="duration"
              type="natural"
              fill="url(#fillDuration)"
              stroke="var(--chart-2)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
        <CardFooter>
          
        </CardFooter>
      </CardContent>
    </Card>
  )
}
