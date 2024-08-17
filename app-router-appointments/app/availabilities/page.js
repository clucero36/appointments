
import Calander from "../ui/Calander";
import TimeSlots from "../ui/TimeSlots";
import { Suspense } from "react";
import { TimeSlotsSkeleton } from "../ui/skeletons";

export default function Page({ searchParams }) {

  return (
    <div>
      <div className='text-2xl font-bold my-8'>Select a Date & Time</div>
      <Suspense>
        <Calander />
      </Suspense>
      <Suspense fallback={<TimeSlotsSkeleton />}>
        <TimeSlots params={searchParams}/>
      </Suspense>
    </div>
  )
}