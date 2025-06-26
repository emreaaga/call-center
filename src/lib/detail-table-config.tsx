'use client'
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const detailSchema = z.object({
    id: z.number(),
    user: z.string(),
    sender: z.string(),
    draft: z.string(),
    example: z.string(),
    status: z.number(),
    sent_date: z.string(),
    updated_date: z.string()
});

export type Operation = z.infer<typeof detailSchema>;

export const detailColumns: ColumnDef<Operation>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-xs">ID</div>,
        cell: ({ row }) => <div className="text-[12px]">{row.original.id} </div>,
    },
    {
        accessorKey: "user",
        header: () => <div className="text-xs">Пользователь</div>,
        enableColumnFilter: true,
        cell: ({ row }) => <div className="text-xs">{row.original.user}</div>,
    },
    {
        accessorKey: "sender",
        header: () => <div className="text-xs">Отправитель</div>,
        cell: ({ row }) => (
            <div className="text-xs">
                {row.original.sender}
            </div>
        ),
    },
    {
        accessorKey: "draft",
        header: () => <div className="text-xs">Шаблон</div>,
        cell: ({ row }) => (
            <div className="text-xs">
                {row.original.draft}
            </div>
        ),
    },
    {
        accessorKey: "example",
        header: () => <div className="text-xs">Пример</div>,
        cell: ({ row }) => (
            <div className="text-xs">
                {row.original.example}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: () => <div className="text-xs">Статус</div>,
        cell: ({ row }) => {
            const status = row.original.status === 1;
            return (
                <Badge
                    variant="outline"
                    className={`text-xs font-medium ${status
                        ? "bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-800/20 dark:text-red-300"
                        }`}
                >
                    {status ? "Зарегистрировано" : "Ошибка"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "date",
        header: () => <div className="text-xs">Дата</div>,
        cell: ({ row }) => (
            <div className="text-xs space-y-1">
                <div>
                    <span className="font-semibold">Дата отправки:</span> {row.original.sent_date}
                </div>
                <div>
                    <span className="font-semibold">Дата обновления:</span> {row.original.updated_date}
                </div>
            </div>
        ),
    }
];