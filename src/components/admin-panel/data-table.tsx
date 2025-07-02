'use client'

import * as React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove } from '@dnd-kit/sortable'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table'
import { z } from 'zod'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent } from '@/components/ui/tabs'

type DataTableProps<TData, TSchema extends z.ZodObject<any>> = {
  data: TData[]
  columns: ColumnDef<TData>[]
  schema: TSchema
  getRowId?: (row: TData) => string
  renderToolbar?: (table: ReturnType<typeof useReactTable<TData>>) => JSX.Element
  renderActionButton?: (row: TData) => JSX.Element
  twoColumnsMode?: boolean
  loading?: boolean
}

export function DataTable<TData, TSchema extends z.ZodObject<any>>({
  data: initialData,
  columns: initialColumns,
  schema,
  getRowId = (row: any) => (row as any).id.toString(),
  renderToolbar,
  renderActionButton,
  twoColumnsMode = false,
  loading = false,
}: DataTableProps<TData, TSchema>) {
  const [data, setData] = React.useState<TData[]>(initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const sortableId = React.useId()

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  )

  const columns = React.useMemo<ColumnDef<TData>[]>(
    () =>
      renderActionButton
        ? [
            ...initialColumns,
            {
              id: 'actions',
              cell: ({ row }) => (
                <div className="flex justify-end">
                  {renderActionButton(row.original)}
                </div>
              ),
              enableSorting: false,
              enableHiding: false,
            },
          ]
        : initialColumns,
    [initialColumns, renderActionButton]
  )

  // Keep local data in sync
  React.useEffect(() => {
    setData(initialData)
  }, [initialData])

  // Validate with Zod schema
  React.useEffect(() => {
    try {
      z.array(schema).parse(data)
    } catch (error) {
      console.error('Ошибка валидации данных:', error)
    }
  }, [data, schema])

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data.map(item => getRowId(item)),
    [data, getRowId]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    getRowId,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active.id !== over?.id) {
      setData(current =>
        arrayMove(
          current,
          dataIds.indexOf(active.id),
          dataIds.indexOf(over!.id)
        )
      )
    }
  }

  // For skeleton rows
  const visibleColumns = table.getVisibleFlatColumns()

  return (
    <Tabs defaultValue="outline" className="flex flex-col gap-2 w-full">
      {renderToolbar && <div>{renderToolbar(table)}</div>}
      <TabsContent value="outline" className="overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          {twoColumnsMode ? (
            // Двухколоночный режим
            (() => {
              const obj = initialData[0] as Record<string, any> | undefined
              const rows = obj
                ? Object.entries(obj).map(([parameter, value]) => ({
                    parameter,
                    value: String(value),
                  }))
                : []
              return (
                <Table>
                  <TableHeader className="sticky top-0 bg-muted z-10">
                    <TableRow>
                      <TableHead>Параметр</TableHead>
                      <TableHead>Значение</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map(({ parameter, value }) => (
                      <TableRow key={parameter}>
                        <TableCell className="text-xs font-semibold">
                          {parameter}
                        </TableCell>
                        <TableCell className="text-xs">
                          {parameter === 'status' ? (
                            value === '1' ? (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-300"
                              >
                                Зарегистрировано
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-red-100 text-red-700 dark:bg-red-800/20 dark:text-red-300"
                              >
                                Ошибка
                              </Badge>
                            )
                          ) : (
                            value
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            })()
          ) : (
            // Обычный режим с drag'n'drop и скелетоном
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
              id={sortableId}
            >
              <Table>
                <TableHeader className="sticky top-0 bg-muted z-10">
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {loading ? (
                    // 10 строк скелетона
                    Array.from({ length: 10 }).map((_, rowIndex) => (
                      <TableRow key={`skeleton-${rowIndex}`}>
                        {visibleColumns.map(col => (
                          <TableCell key={col.id}>
                            <Skeleton className="h-4 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map(row => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map(cell => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={visibleColumns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </DndContext>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
