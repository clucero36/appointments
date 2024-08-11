
import Calander from "../ui/Calander";
import TimeSlots from "../ui/TimeSlots";

export default function Page({ searchParams }) {

  return (
    <div>
      <div className='text-2xl font-bold my-8'>Select a Date & Time</div>
      <Calander />
      <TimeSlots params={searchParams}/>
    </div>
  )
}