'use client'

import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const operationSchema = z.object({
  id: z.number(),
  date: z.string(),
  period: z.string(),
  name: z.string(),
  type: z.number(),
  structure: z.string(),
  status: z.number(),
});

export type Operation = z.infer<typeof operationSchema>;

export const operationData: Operation[] = [
  {
    id: 1,
    date: "2023-10-01 12:00",
    period: "Период 1",
    name: "Название 1",
    type: 1,
    structure: "test",
    status: 1,
  },
  {
    id: 2,
    date: "2023-10-02 14:00",
    period: "Период 2",
    name: "Название 2",
    type: 0,
    structure: "test",
    status: 0,
  },
  {
    id: 3,
    date: "2023-10-03 09:00",
    period: "Период 3",
    name: "Название 3",
    type: 2,
    structure: "test",
    status: 3,
  },
];

export const operationColumns: ColumnDef<Operation>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-xs">ID</div>,
    cell: ({ row }) => <div className="text-[12px]">{row.original.id}</div>,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-xs">Дата</div>,
    cell: ({ row }) => <div className="text-xs">{row.original.date}</div>,
  },
  {
    accessorKey: "period",
    header: () => <div className="text-xs">Период</div>,
    cell: ({ row }) => <div className="text-xs">{row.original.period}</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-xs">Название</div>,
    cell: ({ row }) => <div className="text-xs">{row.original.name}</div>,
  },
  {
    accessorKey: "type",
    header: () => <div className="text-xs">Тип</div>,
    cell: ({ row }) => {
      const typeMap: Record<number, string> = {
        0: "Списание",
        1: "Пополнение",
        2: "Перевод",
      };
      return <div className="text-xs">{typeMap[row.original.type] || "Неизвестно"}</div>;
    },
  },
  {
    accessorKey: "structure",
    header: () => <div className="text-xs">Структура ор.</div>,
    cell: ({ row }) => <div className="text-xs">{row.original.structure}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-xs">Статус</div>,
    cell: ({ row }) => {
      const statusMap: Record<number, string> = {
        0: "Ошибка",
        1: "Успешно",
        3: "Обработано",
      };

      const status = row.original.status;
      let className = "";

      switch (status) {
        case 1:
          className =
            "bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-300";
          break;
        case 0:
          className =
            "bg-red-100 text-red-700 dark:bg-red-800/20 dark:text-red-300";
          break;
        case 3:
          className =
            "bg-blue-100 text-blue-700 dark:bg-blue-800/20 dark:text-blue-300";
          break;
        default:
          className =
            "bg-gray-100 text-gray-700 dark:bg-gray-800/20 dark:text-gray-300";
      }

      return (
        <Badge variant="outline" className={`text-xs font-medium ${className}`}>
          {statusMap[status] || "Неизвестно"}
        </Badge>
      );
    },
  }

];