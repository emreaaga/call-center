import { ContentLayout } from '@/components/admin-panel/content-layout'
import { ChartPieDonutActive }      from '@/components/admin-panel/CallStatus'
import { ChartAreaInteractive }    from '@/components/admin-panel/LongevityStatus'
import { OutgoingTableWithPagination } from '@/components/admin-panel/OutgoingTableWithPagination'

export default function OutgoingPage() {
  return (
    <ContentLayout title="Статистика исходящих звонков">
      <div className="flex gap-6 mb-6">
        <div className="h-96 w-[30%]">
          <ChartPieDonutActive />
        </div>
        <div className="h-96 w-[70%]">
          <ChartAreaInteractive />
        </div>
      </div>
      <OutgoingTableWithPagination />
    </ContentLayout>
  )
}


