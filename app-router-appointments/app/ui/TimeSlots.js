import Link from 'next/link';
import axios from 'axios';


export default async function TimeSlots({ params }) {
  const reviver = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' || key === 'serviceVariationVersion' ? BigInt(value) : value;
  const dateParam = params?.date || '';

  var timeSlots = [];
  var renderedTimeSlots;

  if (dateParam.length !== 0) {
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
    let res = await axios.get("https://us-central1-appointments-a917d.cloudfunctions.net/getAvailabilities?", {
      params: searchRequest
    })
    timeSlots = JSON.parse(res.data, reviver);
    timeSlots = timeSlots.availabilities;
  }

  if (timeSlots.length !== 0) {
    renderedTimeSlots = timeSlots.map((timeSlot, index) => {
      return (
        <div key={index}>
          <Link href={{
            pathname: '/contact',
            query: {
              serviceId: params.serviceId,
              serviceVersion: params.serviceVariationId,
              teamMemberId: params.teamMemberId,
              startAt: timeSlot.startAt,
              service: params.service,
            }
          }}>
            {timeSlot.startAt}
          </Link>
        </div>
      )
    })
  }

  return (
    <div>
      {renderedTimeSlots}
    </div>
  )
}

function getEndAtDate(date) {
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);
  return endDate;
}