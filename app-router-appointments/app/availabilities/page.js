import TimeSlots from "../ui/TimeSlots";
import Calander from "../ui/Calander";

export default async function Page({ searchParams }) {

  const dateParam = searchParams?.date || '';

  console.log(dateParam);

  
  return (
    <div>
      Availabilites Page
      <Calander />
      <TimeSlots />
    </div>
  )
}