
import Calander from "../ui/Calander";
import TimeSlots from "../ui/TimeSlots";
import { Suspense } from "react";

export default function Page({ searchParams }) {

  return (
    <div>
      <div className='text-2xl font-bold my-8'>Select a Date & Time</div>
      <Suspense>
        <Calander />
      </Suspense>
      <Suspense >
        <TimeSlots params={searchParams}/>
      </Suspense>
    </div>
  )
}