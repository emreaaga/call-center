'use client'

import * as React from 'react'
import { DataTable } from '@/components/admin-panel/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
    ChevronsLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsRightIcon,
} from 'lucide-react'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { z } from 'zod'

// 1) Zod-схемы и типы
const CallRecordSchema = z.object({
    id: z.number(),
    phone: z.string(),
    client_name: z.string(),
    status_ru: z.string(),
    start_date: z.string().nullable(),
    recording_url: z.string().nullable(),
})
type CallRecord = z.infer<typeof CallRecordSchema>

const CallsPageSchema = z.object({
    calls: z.array(CallRecordSchema),
    total: z.number(),
    page: z.number(),
    per_page: z.number(),
})

function formatCustomDate(raw: string | null) {
    if (!raw) return '—'
    // ожидаем "DD.MM.YYYY HH:mm"
    const m = raw.match(/^(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})$/)
    if (!m) return '—'
    // m = [ whole, dd, mm, yyyy, hh, mi ]
    const [, dd, mm, yyyy, hh, mi] = m
    const d = new Date(
        Number(yyyy),
        Number(mm) - 1,
        Number(dd),
        Number(hh),
        Number(mi)
    )
    return isNaN(d.getTime())
        ? '—'
        : d.toLocaleString()
}


// 2) Колонки таблицы
const columns: ColumnDef<CallRecord>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'client_name', header: 'Клиент' },
    {
        accessorKey: 'recording_url',
        header: 'Запись',
        cell: info => {
            const url = info.getValue<string | null>()
            if (!url) return <span className="text-muted-foreground">—</span>
            return (
                <audio controls className="h-8 w-full">
                    <source src={url} type="audio/mpeg" />
                    Ваш браузер не поддерживает аудио.
                </audio>
            )
        },
    },
    { accessorKey: 'phone', header: 'Телефон' },
    {
        accessorKey: 'start_date',
        header: 'Дата',
        cell: ({ getValue }) => {
            const raw = getValue() as string | null
            return raw && raw.trim() !== '' ? raw : '—'
        },
    },

    {
        accessorKey: 'status_ru',
        header: 'Статус',
        cell: ({ getValue }) => {
            const s = getValue<string>()
            let bg = 'bg-gray-100 text-gray-800'
            if (s === 'Активно') bg = 'bg-[#E2FBE8] text-green-700'
            else if (s === 'Ожидает') bg = 'bg-[#F7EFFF] text-[#9F25EB]'
            return (
                <span className={`inline-block px-2 py-1 text-sm font-medium rounded-lg ${bg}`}>
                    {s}
                </span>
            )
        },
    },
]

export function OutgoingTableWithPagination() {
    const [data, setData] = React.useState<CallRecord[]>([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    const [page, setPage] = React.useState(1)
    const [perPage, setPerPage] = React.useState(10)
    const [total, setTotal] = React.useState(0)

    const totalPages = Math.max(1, Math.ceil(total / perPage))

    React.useEffect(() => {
        setLoading(true)
        fetch(`/api/calls/outgoing?page=${page}&per_page=${perPage}`, {
            credentials: 'include',
            headers: { Accept: 'application/json' },
        })
            .then(res => {
                if (!res.ok) throw new Error(`Ошибка ${res.status}`)
                return res.json()
            })
            .then(json => {
                const p = CallsPageSchema.safeParse(json)
                if (!p.success) {
                    console.error(p.error)
                    throw new Error('Неправильный формат ответа API')
                }
                setData(p.data.calls)
                setTotal(p.data.total)
            })
            .catch(err => {
                console.error(err)
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }, [page, perPage])

    if (loading) return <div>Загрузка исходящих…</div>
    if (error) return <div className="text-red-600">Ошибка: {error}</div>

    return (
        <div className="flex flex-col gap-6">
            <div className="w-full">
                <DataTable
                    data={data}
                    columns={columns}
                    schema={CallRecordSchema}
                    getRowId={row => row.id.toString()}
                />
            </div>

            {/* пагинация */}
            <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => setPage(1)} disabled={page === 1}>
                        <ChevronsLeftIcon />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                        <ChevronLeftIcon />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                        <ChevronRightIcon />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
                        <ChevronsRightIcon />
                    </Button>
                </div>
                <div className="text-sm font-medium">
                    Страница {page} из {totalPages}
                </div>
                <div className="flex items-center gap-2">
                    <span>На странице:</span>
                    <Select
                        value={String(perPage)}
                        onValueChange={v => { setPerPage(Number(v)); setPage(1) }}
                    >
                        <SelectTrigger className="w-20">
                            <SelectValue placeholder={String(perPage)} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[5, 10, 20, 50].map(s => (
                                <SelectItem key={s} value={String(s)}>
                                    {s}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
