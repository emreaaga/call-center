"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DollarSign, ArrowUpRight, BarChart2 } from "lucide-react";
import { ChartConfig } from "@/components/ui/chart";
import { ChartLineInteractive } from "@/components/admin-panel/interactive-chart";

export function StatisticsCard() {
  const chartData = [
    { date: "2024-04-01", replenishment: 222, withdrawal: 150 },
    { date: "2024-04-02", replenishment: 97, withdrawal: 180 },
    { date: "2024-04-03", replenishment: 167, withdrawal: 120 },
    { date: "2024-04-04", replenishment: 242, withdrawal: 260 },
    { date: "2024-04-05", replenishment: 373, withdrawal: 290 },
    { date: "2024-04-06", replenishment: 301, withdrawal: 340 },
    { date: "2024-04-07", replenishment: 245, withdrawal: 180 },
    { date: "2024-04-08", replenishment: 409, withdrawal: 320 },
    { date: "2024-04-09", replenishment: 59, withdrawal: 110 },
    { date: "2024-04-10", replenishment: 261, withdrawal: 190 },
    { date: "2024-04-11", replenishment: 327, withdrawal: 350 },
    { date: "2024-04-12", replenishment: 292, withdrawal: 210 },
    { date: "2024-04-13", replenishment: 342, withdrawal: 380 },
    { date: "2024-04-14", replenishment: 137, withdrawal: 220 },
    { date: "2024-04-15", replenishment: 120, withdrawal: 170 },
    { date: "2024-04-16", replenishment: 138, withdrawal: 190 },
    { date: "2024-04-17", replenishment: 446, withdrawal: 360 },
    { date: "2024-04-18", replenishment: 364, withdrawal: 410 },
    { date: "2024-04-19", replenishment: 243, withdrawal: 180 },
    { date: "2024-04-20", replenishment: 89, withdrawal: 150 },
    { date: "2024-04-21", replenishment: 137, withdrawal: 200 },
    { date: "2024-04-22", replenishment: 224, withdrawal: 170 },
    { date: "2024-04-23", replenishment: 138, withdrawal: 230 },
    { date: "2024-04-24", replenishment: 387, withdrawal: 290 },
    { date: "2024-04-25", replenishment: 215, withdrawal: 250 },
    { date: "2024-04-26", replenishment: 75, withdrawal: 130 },
    { date: "2024-04-27", replenishment: 383, withdrawal: 420 },
    { date: "2024-04-28", replenishment: 122, withdrawal: 180 },
    { date: "2024-04-29", replenishment: 315, withdrawal: 240 },
    { date: "2024-04-30", replenishment: 454, withdrawal: 380 },
    { date: "2024-05-01", replenishment: 165, withdrawal: 220 },
    { date: "2024-05-02", replenishment: 293, withdrawal: 310 },
    { date: "2024-05-03", replenishment: 247, withdrawal: 190 },
    { date: "2024-05-04", replenishment: 385, withdrawal: 420 },
    { date: "2024-05-05", replenishment: 481, withdrawal: 390 },
    { date: "2024-05-06", replenishment: 498, withdrawal: 520 },
    { date: "2024-05-07", replenishment: 388, withdrawal: 300 },
    { date: "2024-05-08", replenishment: 149, withdrawal: 210 },
    { date: "2024-05-09", replenishment: 227, withdrawal: 180 },
    { date: "2024-05-10", replenishment: 293, withdrawal: 330 },
    { date: "2024-05-11", replenishment: 335, withdrawal: 270 },
    { date: "2024-05-12", replenishment: 197, withdrawal: 240 },
    { date: "2024-05-13", replenishment: 197, withdrawal: 160 },
    { date: "2024-05-14", replenishment: 448, withdrawal: 490 },
    { date: "2024-05-15", replenishment: 473, withdrawal: 380 },
    { date: "2024-05-16", replenishment: 338, withdrawal: 400 },
    { date: "2024-05-17", replenishment: 499, withdrawal: 420 },
    { date: "2024-05-18", replenishment: 315, withdrawal: 350 },
    { date: "2024-05-19", replenishment: 235, withdrawal: 180 },
    { date: "2024-05-20", replenishment: 177, withdrawal: 230 },
    { date: "2024-05-21", replenishment: 82, withdrawal: 140 },
    { date: "2024-05-22", replenishment: 81, withdrawal: 120 },
    { date: "2024-05-23", replenishment: 252, withdrawal: 290 },
    { date: "2024-05-24", replenishment: 294, withdrawal: 220 },
    { date: "2024-05-25", replenishment: 201, withdrawal: 250 },
    { date: "2024-05-26", replenishment: 213, withdrawal: 170 },
    { date: "2024-05-27", replenishment: 420, withdrawal: 460 },
    { date: "2024-05-28", replenishment: 233, withdrawal: 190 },
    { date: "2024-05-29", replenishment: 78, withdrawal: 130 },
    { date: "2024-05-30", replenishment: 340, withdrawal: 280 },
    { date: "2024-05-31", replenishment: 178, withdrawal: 230 },
    { date: "2024-06-01", replenishment: 178, withdrawal: 200 },
    { date: "2024-06-02", replenishment: 470, withdrawal: 410 },
    { date: "2024-06-03", replenishment: 103, withdrawal: 160 },
    { date: "2024-06-04", replenishment: 439, withdrawal: 380 },
    { date: "2024-06-05", replenishment: 88, withdrawal: 140 },
    { date: "2024-06-06", replenishment: 294, withdrawal: 250 },
    { date: "2024-06-07", replenishment: 323, withdrawal: 370 },
    { date: "2024-06-08", replenishment: 385, withdrawal: 320 },
    { date: "2024-06-09", replenishment: 438, withdrawal: 480 },
    { date: "2024-06-10", replenishment: 155, withdrawal: 200 },
    { date: "2024-06-11", replenishment: 92, withdrawal: 150 },
    { date: "2024-06-12", replenishment: 492, withdrawal: 420 },
    { date: "2024-06-13", replenishment: 81, withdrawal: 130 },
    { date: "2024-06-14", replenishment: 426, withdrawal: 380 },
    { date: "2024-06-15", replenishment: 307, withdrawal: 350 },
    { date: "2024-06-16", replenishment: 371, withdrawal: 310 },
    { date: "2024-06-17", replenishment: 475, withdrawal: 520 },
    { date: "2024-06-18", replenishment: 107, withdrawal: 170 },
    { date: "2024-06-19", replenishment: 341, withdrawal: 290 },
    { date: "2024-06-20", replenishment: 408, withdrawal: 450 },
    { date: "2024-06-21", replenishment: 169, withdrawal: 210 },
    { date: "2024-06-23", replenishment: 480, withdrawal: 530 },
    { date: "2024-06-24", replenishment: 132, withdrawal: 180 },
    { date: "2024-06-25", replenishment: 141, withdrawal: 190 },
    { date: "2024-06-26", replenishment: 434, withdrawal: 380 },
    { date: "2024-06-27", replenishment: 448, withdrawal: 490 },
    { date: "2024-06-28", replenishment: 149, withdrawal: 200 },
    { date: "2024-06-29", replenishment: 103, withdrawal: 160 },
    { date: "2024-06-30", replenishment: 446, withdrawal: 400 },
  ];

  const chartConfig = {
    replenishment: {
      label: "Переводы",
      color: "var(--chart-1)",
    },
    withdrawal: {
      label: "Платежи",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-full shadow-md">
      <CardHeader className="flex flex-col items-stretch border-b py-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          BP_Jaxongir
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 h-full">
        <div className="grid grid-cols-[30%,70%] h-full gap-4">
          <div className="grid grid-rows-3 gap-3">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-start justify-center space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Оплата
                </h3>
              </div>
              <Separator className="my-1 bg-gray-300 dark:bg-gray-600" />
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Количество: 52
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Сумма: 25 128 750,00{" "}
                  <span className="text-[10px] text-muted-foreground">UZS</span>
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-start justify-center space-y-2">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4" />
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Переводы
                </h3>
              </div>
              <Separator className="my-1 bg-gray-300 dark:bg-gray-600" />
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Количество: 52
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Сумма: 25 128 750,00{" "}
                  <span className="text-[10px] text-muted-foreground">UZS</span>
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-start justify-center space-y-2">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Итого
                </h3>
              </div>
              <Separator className="my-1 bg-gray-300 dark:bg-gray-600" />
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Количество: 52
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Сумма: 25 128 750,00{" "}
                  <span className="text-[10px] text-muted-foreground">UZS</span>
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-center">
            <ChartLineInteractive
              data={chartData}
              config={chartConfig}
              title="Линейный график"
              defaultTimeRange="90d"
              defaultActiveChart="withdrawal"
              width="w-full"
              height="h-[300px]" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}