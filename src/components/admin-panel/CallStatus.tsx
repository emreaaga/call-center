'use client';

import * as React from 'react';
import useSWR from 'swr';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';

import { fetchCharts, StatusDistribution } from '@/lib/fetch-charts';

export const description = 'A donut chart with an active sector';

export function ChartPieDonutActive() {
  const { data, error, isLoading } = useSWR(
    '/api/dashboard/charts',
    fetchCharts
  );

  if (isLoading) {
    return (
      <Card className="h-96 flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center">
          Загрузка...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-96 flex flex-col">
        <CardContent className="flex-1 text-red-600 flex items-center justify-center">
          {error.message}
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  // 1. Получаем массив статусов
  const slices: StatusDistribution[] = data.status_distribution;

  // 2. Если пуст, показываем «нет данных»
  if (slices.length === 0) {
    return (
      <Card className="h-96 flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Статус вызова</CardTitle>
          <CardDescription>За последние 7 дней</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center text-gray-500">
          Нет данных
        </CardContent>
      </Card>
    );
  }

  // 3. Подготавливаем данные для Pie
  const COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
  ];
  const chartData = slices.map((s, i) => ({
    browser:  s.label_ru,
    visitors: s.count,
    fill:     COLORS[i % COLORS.length],
  }));

  // 4. Вычисляем активный индекс (максимальный visitors)
  const activeIndex = chartData.reduce(
    (maxIdx, item, idx, arr) =>
      item.visitors > arr[maxIdx].visitors ? idx : maxIdx,
    0
  );

  // 5. Полный config для ChartContainer: visitors + категории
  const chartConfig: ChartConfig = {
    visitors: { label: 'Количество звонков', color: COLORS[0] },
    ...Object.fromEntries(
      slices.map((s, i) => [
        s.label_ru,
        { label: s.label_ru, color: COLORS[i % COLORS.length] },
      ])
    ),
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Статус вызова</CardTitle>
        <CardDescription>За последние 7 дней</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const { browser, visitors } = payload[0].payload;
                  return (
                    <div className="bg-white p-2 rounded shadow">
                      <div className="font-medium">{browser}</div>
                      <div>Звонков: {visitors}</div>
                    </div>
                  );
                }}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              >
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
            <ChartLegend content={<ChartLegendContent />} />
          </>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
