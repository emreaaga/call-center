import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const userSchema = z.object({
  id: z.number(),
  login: z.string(),
  branch: z.string(),
  recordType: z.string(),
  status: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const userData: User[] = [
  {
    id: 6524886,
    login: "262 500.00",
    branch: "BRAND PAY (Madina - Файзабад ГАИ)",
    recordType: "Оператор",
    status: "включен",
  },
  {
    id: 6524887,
    login: "150 000.00",
    branch: "BRAND PAY (Chilanzar - Главный офис)",
    recordType: "Администратор",
    status: "выключен",
  },
  {
    id: 6524888,
    login: "500 000.00",
    branch: "BRAND PAY (Yunusabad - Рынок)",
    recordType: "Оператор",
    status: "включен",
  },
];

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-xs">ID</div>,
    cell: ({ row }) => <div className="text-[12px]">{row.original.id}</div>,
  },
  {
    accessorKey: "login",
    header: () => <div className="text-xs">Логин</div>,
    cell: ({ row }) => 
    <div className="text-xs">
      {row.original.login}
      <span className="text-[8px] text-muted-foreground"> UZS</span>
    </div>,
  },
  {
    accessorKey: "branch",
    header: () => <div className="text-xs">Отделение</div>,
    cell: ({ row }) => <div className="text-xs">{row.original.branch}</div>,
  },
  {
    accessorKey: "recordType",
    header: () => <div className="text-xs">Тип записи</div>,
    cell: ({ row }) => <div className="text-xs">{row.original.recordType}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-xs">Статус</div>,
    cell: ({ row }) => {
      const isEnabled = row.original.status === "включен";
      return (
        <Badge
          variant="outline"
          className={`text-xs font-medium ${
            isEnabled
              ? "bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-800/20 dark:text-red-300"
          }`}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
];