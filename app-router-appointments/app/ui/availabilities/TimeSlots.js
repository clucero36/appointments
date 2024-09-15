import Link from 'next/link';
import { getTimeString } from '../../lib/util';
import { getTimeSlots } from '@/app/lib/data';

export default async function TimeSlots({ params }) {  

  const timeSlots = await getTimeSlots(params);
  
  if (!timeSlots) {
    return <div>Please Select a Weekday in the Near Future</div>
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 align-center w-4/5 lg:w-3/5 mx-auto my-4 pb-1">
      {
        timeSlots.map((timeSlot, index) => {

          const appointmentStartTime = new Date(timeSlot.startAt);
          const timeString = getTimeString(appointmentStartTime);

          return (
            <Link className="border border-[#9b5d73] hover:border-[#c38b8b] basis-28" key={index} href={{
              pathname: '/contact',
              query: {
                serviceId: params.serviceId,
                serviceVersion: params.serviceVariationId,
                teamMemberId: params.teamMemberId,
                startAt: timeSlot.startAt,
                timeString: timeString,
              }
            }}>
              <div className="p-2">
                {timeString}
              </div>                
            </Link>
          )
        })
      }
    </div>
  )
}