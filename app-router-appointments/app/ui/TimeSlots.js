import Link from 'next/link';
import axios from 'axios';
import { getEndAtDate, getTimeString } from '../lib/util';


export default async function TimeSlots({ params }) {
  const reviver = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' || key === 'serviceVariationVersion' ? BigInt(value) : value;
  const dateParam = params?.date || '';
  const past = params?.past || '';

  var timeSlots = [];
  var renderedTimeSlots = [];
  let skeletons = new Array(14);
  skeletons.fill(' ');

  const renderedSkeletons = skeletons.map((skeleton, index) => {
    return (
      <div key={index} className="border border-[#9b5d73] p-2 hover:border-[#c38b8b] basis-28">
        {skeleton}
      </div>
    )
  })

  if (dateParam.length !== 0 && past !== 'past') {
    const start_date = new Date(dateParam);
    const end_date = getEndAtDate(dateParam);

    const searchRequest = {
      query: {
        filter: {
          startAtRange: {
            startAt: start_date,
            endAt: end_date
          },
          locationId: params.locationId,
          segmentFilters: [{ serviceVariationId: params.serviceVariationId }]
        }
      }
    };
    // axios to handle query params
    const res = await axios.get("https://us-central1-appointments-a917d.cloudfunctions.net/getAvailabilities?", {
      params: searchRequest
    });
    timeSlots = JSON.parse(res.data, reviver);
    timeSlots = timeSlots.availabilities;
  };
  
  if (past === 'past') {
    renderedTimeSlots=['Please Select a Future Date']
  }

  if (timeSlots.length !== 0) {
    renderedTimeSlots = timeSlots.map((timeSlot, index) => {

      const appointmentStartTime = new Date(timeSlot.startAt);
      const timeString = getTimeString(appointmentStartTime);

      return (
          <div key={index} className="border border-[#9b5d73] p-2 hover:border-[#c38b8b] basis-28">
            <Link href={{
              pathname: '/contact',
              query: {
                serviceId: params.serviceId,
                serviceVersion: params.serviceVariationId,
                teamMemberId: params.teamMemberId,
                startAt: timeSlot.startAt,
                service: params.service,
                timeString: timeString,
              }
            }}>
              {timeString}
            </Link>
          </div>
      ); // returned component
    }); // end map
  }; // end if


  if (timeSlots.length === 0) {
    return (
      <>Please Select a Weekday in the Near Future
        <div className="flex flex-wrap justify-center gap-4 align-center w-4/5 lg:w-3/5 mx-auto my-4">
          {renderedSkeletons}
        </div>
      </>
    )
  }
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 align-center w-4/5 lg:w-3/5 mx-auto my-4">
          {renderedTimeSlots.length !== 0 ? renderedTimeSlots : <div>Please Select A Week Day</div>}
      </div>
    </>
  )
}