import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import data from "./transaction.json";

export const mainSchema = z.object({
  id: z.number(),
  partner: z.string(),
  partner_id: z.string(),
  sender: z.string(),
  receiver: z.string(),
  status: z.number(),
  sent_date: z.string(),
  updated_date: z.string(),
});

export type MainData = z.infer<typeof mainSchema>;

export const mainData: MainData[] = data as MainData[];

export const fullColumns: ColumnDef<MainData>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-xs">ID</div>,
    cell: ({ row }) => <div className="text-[12px]">{row.original.id}</div>,
  },
  {
    accessorKey: "partner",
    header: () => <div className="text-xs">Партнер</div>,
    cell: ({ row }) => <div className="text-[12px]">{row.original.partner}</div>,
  },
  {
    accessorKey: "partner_id",
    header: () => <div className="text-xs">ID Партнера</div>,
    cell: ({ row }) => <div className="text-[12px]">{row.original.partner_id}</div>,
  },
  {
    accessorKey: "sender",
    header: () => <div className="text-xs">Отправитель</div>,
    cell: ({ row }) => <div className="text-[12px]">{row.original.sender}</div>,
  },
  {
    accessorKey: "receiver",
    header: () => <div className="text-xs">Получитель</div>,
    cell: ({ row }) => <div className="text-[12px]">{row.original.receiver}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-xs">Статус</div>,
    cell: ({ row }) => {
      const status = row.original.status === 1;
      return (
        <Badge
          variant="outline"
          className={`text-xs font-medium ${
            status
              ? "bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-800/20 dark:text-red-300"
          }`}
        >
          {status ? "Доставлено" : "Ошибка"}
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
