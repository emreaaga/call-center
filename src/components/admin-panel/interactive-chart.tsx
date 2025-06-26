"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ChartDataItem {
    date: string;
    [key: string]: string | number;
}

interface TimeRangeOption {
    value: string;
    label: string;
    days: number;
}

interface DataTypeOption {
    value: string;
    label: string;
}

interface ChartLineInteractiveProps {
    data: ChartDataItem[];
    config: ChartConfig;
    title?: string;
    defaultTimeRange?: string;
    defaultActiveChart?: string;
    timeRangeOptions?: TimeRangeOption[];
    referenceDate?: string;
    className?: string;
    showDataTypeSelector?: boolean;
    dataTypeOptions?: DataTypeOption[];
    defaultDataType?: string;
    onDataTypeChange?: (dataType: string) => void;
    width?: string; 
    height?: string; 
}

const defaultTimeRangeOptions: TimeRangeOption[] = [
    { value: "90d", label: "За последние 3 месяца", days: 90 },
    { value: "30d", label: "За последние 30 дней", days: 30 },
    { value: "7d", label: "За последние 7 дней", days: 7 },
];

const defaultDataTypeOptions: DataTypeOption[] = [
    { value: "turnover", label: "Оборот" },
    { value: "count", label: "Количество" },
];

export function ChartLineInteractive({
    data,
    config,
    title = "Линейный график",
    defaultTimeRange = "90d",
    defaultActiveChart,
    timeRangeOptions = defaultTimeRangeOptions,
    referenceDate,
    className = "",
    showDataTypeSelector = false,
    dataTypeOptions = defaultDataTypeOptions,
    defaultDataType = "turnover",
    onDataTypeChange,
    width = "w-full", 
    height = "h-[350px]",
}: ChartLineInteractiveProps) {
    const firstConfigKey = Object.keys(config)[0];
    const [activeChart, setActiveChart] = React.useState<string>(
        defaultActiveChart || firstConfigKey
    );
    const [timeRange, setTimeRange] = React.useState(defaultTimeRange);
    const [dataType, setDataType] = React.useState(defaultDataType);

    const handleDataTypeChange = (newDataType: string) => {
        setDataType(newDataType);
        if (onDataTypeChange) {
            onDataTypeChange(newDataType);
        }
    };

    const getReferenceDate = () => {
        if (referenceDate) {
            return new Date(referenceDate);
        }
        const maxDate = data.reduce((max, item) => {
            const itemDate = new Date(item.date);
            return itemDate > max ? itemDate : max;
        }, new Date(data[0]?.date || new Date()));
        return maxDate;
    };

    const filteredData = React.useMemo(() => {
        const refDate = getReferenceDate();
        const selectedTimeOption = timeRangeOptions.find(option => option.value === timeRange);
        const daysToSubtract = selectedTimeOption?.days || 90;
        
        const startDate = new Date(refDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        
        return data.filter((item) => {
            const date = new Date(item.date);
            return date >= startDate;
        });
    }, [data, timeRange, timeRangeOptions, referenceDate, getReferenceDate]);

    return (
        <Card className={`py-4 sm:py-0 ${className}`}>
            <CardHeader className="flex flex-col items-stretch border-b py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 flex-col justify-center gap-1 px-2 pb-3 sm:pb-0">
                    <CardTitle>{title}</CardTitle>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 pb-3 sm:pb-0">
                    {showDataTypeSelector && dataTypeOptions.length > 0 && (
                        <Select value={dataType} onValueChange={handleDataTypeChange}>
                            <SelectTrigger className="w-[200px] rounded-2xl" aria-label="Выберите тип данных">
                                <SelectValue placeholder="Тип данных" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {dataTypeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value} className="rounded-2xl">
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[200px] rounded-2xl" aria-label="Выберите период">
                            <SelectValue placeholder="Выберите период" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            {timeRangeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="rounded-2xl">
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={activeChart} onValueChange={setActiveChart}>
                        <SelectTrigger className="w-[200px] rounded-2xl" aria-label="Выберите тип графика">
                            <SelectValue placeholder="Тип графика" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            {Object.entries(config).map(([key, { label }]) => (
                                <SelectItem key={key} value={key} className="rounded-2xl">
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={config}
                    className={`aspect-auto ${width} ${height}`}
                >
                    <LineChart
                        accessibilityLayer
                        data={filteredData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("ru-RU", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey={activeChart}
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("ru-RU", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        });
                                    }}
                                />
                            }
                        />
                        <Line
                            dataKey={activeChart}
                            type="monotone"
                            stroke={
                                activeChart === "replenishment" ? "#2563eb" :
                                activeChart === "withdrawal" ? "#ef4444" :
                                "#22c55e"
                            }
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}