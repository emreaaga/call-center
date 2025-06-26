'use client'
import * as React from 'react'
import { ru } from 'date-fns/locale'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import CalendarIcon from '@/icons/navbar/cld.svg'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Props = {
  date?: DateRange
  onSelect?: (range: DateRange | undefined) => void
}

export function DatePickerWithRange({ date, onSelect }: Props) {
  const [open, setOpen] = React.useState(false)
  const [tempRange, setTempRange] = React.useState<DateRange | undefined>(date)

  React.useEffect(() => {
    setTempRange(date)
  }, [date])

  function apply() {
    onSelect?.(tempRange)
    setOpen(false)
  }

  function clear() {
    setTempRange({ from: undefined, to: undefined })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[300px] rounded-2xl justify-start text-left',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2" />
          {date?.from
            ? date.to
              ? `${format(date.from, 'LLL dd, y')} – ${format(
                date.to,
                'LLL dd, y'
              )}`
              : format(date.from, 'LLL dd, y')
            : 'Выберите дату'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-4">
          <Calendar
            mode="range"
            selected={tempRange}
            onSelect={setTempRange}
            locale={ru}
            numberOfMonths={2}
          />

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={clear}>
              Сбросить
            </Button>
            <Button size="sm" onClick={apply}>
              Применить
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
