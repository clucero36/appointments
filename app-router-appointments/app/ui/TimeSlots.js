import Link from 'next/link';
import axios from 'axios';
import { getEndAtDate, getTimeString } from '../lib/util';

export default async function TimeSlots({ params }) {
  const reviver = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' || key === 'serviceVariationVersion' ? BigInt(value) : value;
  const dateParam = params?.date || '';
  const past = params?.past || '';

  var timeSlots = [];

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
    console.log('Fetching TimeSlot data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // axios to handle query params
    const res = await axios.get("https://us-central1-appointments-a917d.cloudfunctions.net/getAvailabilities?", {
      params: searchRequest
    });
    timeSlots = JSON.parse(res.data, reviver);
    timeSlots = timeSlots.availabilities;
  };

  if (timeSlots.length === 0) {
    return <span>Please Select a Weekday in the Near Future</span>
  }
  return (
    <div className="flex flex-wrap justify-center gap-4 align-center w-4/5 lg:w-3/5 mx-auto my-4">
      {
        timeSlots.map((timeSlot, index) => {

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
          )
        })
      }
    </div>
  )
}