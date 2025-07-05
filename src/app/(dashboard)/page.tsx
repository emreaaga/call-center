import { ContentLayout } from '@/components/admin-panel/content-layout'
import { ChartPieDonut }      from '@/components/admin-panel/CallStatus'
import { ChartAreaInteractive }    from '@/components/admin-panel/LongevityStatus'
import { OutgoingTableWithPagination } from '@/components/admin-panel/OutgoingTableWithPagination'

export default function OutgoingPage() {
  return (
    <ContentLayout title="Статистика исходящих звонков">
      <div className="flex gap-6 mb-6">
        {/* 30% ширины */}
        <div className="h-96 w-[30%]">
          <ChartPieDonut />
        </div>
        {/* 70% ширины */}
        <div className="h-96 w-[70%]">
          <ChartAreaInteractive />
        </div>
      </div>
      <OutgoingTableWithPagination />
    </ContentLayout>
  )
}


