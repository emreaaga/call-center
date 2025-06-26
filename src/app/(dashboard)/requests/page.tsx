"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DataTable } from "@/components/admin-panel/data-table";
import React, { useEffect, useState } from "react";
import {
  requestsSchema,
  requestsData,
  requestsColumns,
} from "@/lib/requests-table-config";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { OperationToolBar } from "@/components/admin-panel/operations-tool-bar";
import { useRouter } from "next/navigation";

export default function RequestsPage() {
  const router = useRouter();

  const validatedData = React.useMemo(() => {
    const result = z.array(requestsSchema).safeParse(requestsData);
    if (!result.success) {
      console.error("Ошибка валидации данных:", result.error.flatten());
      return [];
    }
    return result.data;
  }, []);

  if (validatedData.length === 0) {
    return (
      <ContentLayout title="SMS шаблоны">
        <div className="text-center text-muted-foreground">
          Данные отсутствуют или не прошли валидацию.
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="SMS шаблоны">
      <DataTable
        data={validatedData}
        columns={requestsColumns}
        schema={requestsSchema}
        getRowId={(row) => row.id.toString()}
        renderToolbar={(table) => (
          <OperationToolBar table={table} onCreateClick={() => console.log("create")} />
        )}
        renderActionButton={(row) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              localStorage.setItem("selectedRequest", JSON.stringify(row));
              router.push(`/requests/${row.id}?id=${row.id}`);
            }}
            className="text-xs text-blue-600 px-2 h-6 hover:text-blue-800 hover:underline"
          >
            Подробнее
          </Button>

        )}
      />
    </ContentLayout>
  );
}
