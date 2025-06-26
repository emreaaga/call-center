// OperationToolBox.tsx
"use client";

import React from "react";
import { useReactTable } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DatePickerWithRange } from "./data-picker";
import {
  Checkbox
} from "@/components/ui/checkbox";
interface OperationToolBoxProps {
  table: ReturnType<typeof useReactTable<any>>;
  onCreateClick: () => void;
}

export function OperationToolBar({ table, onCreateClick }: OperationToolBoxProps) {
  const handleCheckboxChange = (
    value: string,
    id: string,
    checked: boolean
  ) => {
    const currentFilters = table.getState().columnFilters.filter((f) => f.id !== id);
    const existing = table.getState().columnFilters.find((f) => f.id === id);
    const values = Array.isArray(existing?.value) ? existing!.value : [];

    const newValues = checked
      ? [...values, value]
      : values.filter((v: string) => v !== value);

    table.setColumnFilters([...currentFilters, { id, value: newValues }]);
  };

  return (
    <div className="flex items-center gap-4 px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <DatePickerWithRange />
        <div className="relative">
          <Input
            type="text"
            placeholder="Поиск..."
            className="pl-8 pr-3 py-2 border rounded-2xl text-sm"
            onChange={(e) =>
              table.setColumnFilters([{ id: "name", value: e.target.value }])
            }
          />
          <svg
            className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z"
            />
          </svg>
        </div>

        <Select>
          <SelectTrigger className="rounded-2xl w-fit text-xs py-1 px-2" id="filters">
            <SelectValue placeholder="Фильтры" className="text-xs" />
          </SelectTrigger>
          <SelectContent className="p-0 w-[300px] text-xs">
            <Accordion type="multiple" className="w-full">
              {/* По оператору */}
              <AccordionItem value="operator">
                <AccordionTrigger className="text-sm">По оператору</AccordionTrigger>
                <AccordionContent>
                  {["beeline", "uztelecom", "ucell"].map((operator) => (
                    <label key={operator} className="flex items-center gap-2 px-3 py-1">
                      <Checkbox
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(operator, "operator", !!checked)
                        }
                      />
                      <span className="capitalize">{operator}</span>
                    </label>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* По статусу */}
              <AccordionItem value="status">
                <AccordionTrigger className="text-sm">По статусу</AccordionTrigger>
                <AccordionContent>
                  {["успешно", "ошибка", "обработано"].map((status) => (
                    <label key={status} className="flex items-center gap-2 px-3 py-1">
                      <Checkbox
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(status, "status", !!checked)
                        }
                      />
                      <span className="capitalize">{status}</span>
                    </label>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* По отправителю */}
              <AccordionItem value="sender">
                <AccordionTrigger className="text-sm">По отправителю</AccordionTrigger>
                <AccordionContent>
                  {["QuickPay", "22700"].map((sender) => (
                    <label key={sender} className="flex items-center gap-2 px-3 py-1">
                      <Checkbox
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(sender, "sender", !!checked)
                        }
                      />
                      <span>{sender}</span>
                    </label>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
