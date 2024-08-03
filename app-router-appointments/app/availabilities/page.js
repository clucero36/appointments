
import Calander from "../ui/Calander";
import TimeSlots from "../ui/TimeSlots";

export default function Page({ searchParams }) {

  return (
    <div>
      Availabilites Page
      <Calander />
      <TimeSlots params={searchParams}/>
    </div>
  )
}