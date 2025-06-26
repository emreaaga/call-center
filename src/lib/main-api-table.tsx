import { z } from 'zod'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

export const apiSchema = z.object({
  id: z.number(),
  status: z.string(),
  operatorId: z.number(),
  merchantId: z.string(),
  originator: z.string(),
  internalMessageId: z.string().nullable(),
  createdDate: z.number(),
  modifiedDate: z.number(),
})

export type ApiEntry = z.infer<typeof apiSchema>

const operatorMap: Record<number, string> = {
  1: 'BEELINE',
  2: 'UCELL',
  3: 'UZMOBILE',
  4: 'MOBIUZ',
  5: 'PERFECTUM',
  10: 'HUMANS',
}

export const apiColumns: ColumnDef<ApiEntry>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-xs">ID</div>,
    cell: ({ row }) => (
      <div className="text-[12px]">{row.original.id}</div>
    ),
  },
  {
    accessorKey: 'Партнер',
    header: () => <div className="text-xs">Партнер</div>,
    cell: ({ row }) => {
      const name = operatorMap[row.original.operatorId] ?? String(row.original.operatorId)
      return <span className="text-xs">{name}</span>
    },
  },
  {
    accessorKey: 'ID Партнера',
    header: () => <div className="text-xs">ID Партнера</div>,
    cell: ({ row }) => (
      <span className="text-xs">{row.original.merchantId}</span>
    ),
  },
  {
    accessorKey: 'Отправитель',
    header: () => <div className="text-xs">Отправитель</div>,
    cell: ({ row }) => (
      <span className="text-xs">{row.original.originator}</span>
    ),
  },
  {
    accessorKey: 'Получатель',
    header: () => <div className="text-xs">Получатель</div>,
    cell: ({ row }) => (
      <span className="text-xs">{row.original.internalMessageId}</span>
    ),
  },
  {
    accessorKey: 'Статус',
    header: () => <div className="text-xs">Статус</div>,
    cell: ({ row }) => {
      const ok = row.original.status === 'DELIVERED'
      return (
        <Badge
          variant="outline"
          className={`text-xs font-medium ${ok
              ? 'bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-300'
              : 'bg-red-100 text-red-700 dark:bg-red-800/20 dark:text-red-300'
            }`}
        >
          {ok ? 'Зарегистрировано' : 'Ошибка'}
        </Badge>
      )
    },
  },
  {
  accessorKey: "Дата",
  header: () => <div className="text-xs">Дата</div>,
  cell: ({ row }) => {
    const sent = new Date(row.original.createdDate).toLocaleString()
    const updated = new Date(row.original.modifiedDate).toLocaleString()
    return (
      <div className="text-xs space-y-1">
        <div>
          <span className="font-semibold">Дата отправки:</span> {sent}
        </div>
        <div>
          <span className="font-semibold">Дата обновления:</span> {updated}
        </div>
      </div>
    )
  },
}

]
