
import Calander from "../ui/availabilities/Calander";
import TimeSlots from "../ui/availabilities/TimeSlots";
import { Suspense } from "react";
import { TimeSlotsSkeleton } from "../ui/skeletons";

export default function Page({ searchParams }) {

  return (
    <div>
      <div className='text-2xl font-bold my-8'>Select a Date & Time</div>
      <Calander />
      <Suspense key={searchParams.date} fallback={<TimeSlotsSkeleton />}>
        <TimeSlots params={searchParams}/>
      </Suspense>
    </div>
  )
}