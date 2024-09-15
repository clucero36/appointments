import { getEndAtDate } from "./util";
import axios from 'axios';

const reviver = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' ? BigInt(value) : value;

export async function getServices() {
  try {
    const res = await fetch('https://us-central1-appointments-a917d.cloudfunctions.net/getCatalogServices');

    if (!res.ok) 
      throw new Error(`Response status: ${res.status}`);

    const serviceData = await res.json();
    const services = JSON.parse(serviceData.items, reviver);

    return services;
  }
  catch (error) {
    console.error(error.message);
  }

}

export async function getStaff(serviceId) {
  try {
    const res = await fetch(`https://us-central1-appointments-a917d.cloudfunctions.net/getStaffServiceVersion?serviceID=${serviceId}`);
    if (!res.ok) 
      throw new Error(`Response status: ${res.status}`);

    const staffData = await res.json();

    const team = JSON.parse(staffData.team, reviver);
    const service = JSON.parse(staffData.service, reviver);
    
    return {team, service}
  }
  catch (error) {
    console.error(error.message);
  }
}

export async function getTimeSlots(params) {
  const dateParam = params?.date || '';
  const past = params?.past || '';

  try {
    if (dateParam.length !== 0 && past !== 'past') {
      const start_date = new Date(dateParam);
      const end_date = getEndAtDate(dateParam);
  
      const staffDataRes = await fetch(`https://us-central1-appointments-a917d.cloudfunctions.net/getStaffServiceVersion?serviceID=${params.serviceId}`);
      if (!staffDataRes.ok) 
        throw new Error(`Response status: ${staffDataRes.status}`);
      const staffData = await staffDataRes.json();
      const team = JSON.parse(staffData.team, reviver);
      const locationId = team[0].assignedLocations.locationIds[0];
  
  
      const searchRequest = {
        query: {
          filter: {
            startAtRange: {
              startAt: start_date,
              endAt: end_date
            },
            locationId: locationId,
            segmentFilters: [{ serviceVariationId: params.serviceVariationId }]
          }
        }
      };
  
      const res = await axios.get("https://us-central1-appointments-a917d.cloudfunctions.net/getAvailabilities?", { params: searchRequest });
      let timeSlots = JSON.parse(res.data, reviver);
      timeSlots = timeSlots.availabilities;
      return timeSlots
    }
  } catch (error) {
    console.error(error.message);
  } 
}

export const catalogData = [
  {
    service: 'Color Treatment',
    desc: 'Transform your look with our expert hair color treatment, offering personalized, vibrant shades and long-lasting results for healthy, shiny, and beautiful hair.'
  },
  {
    service: 'Men\'s Haircut',
    desc: 'Achieve a fresh, stylish look with our professional men\'s haircut service, tailored to your preferences for a precise, polished finish every time.',
  },
  {
    service: 'Shampoo Style',
    desc: 'Revitalize your hair with our luxurious shampoo and style service, leaving you with clean, beautifully styled hair that\'s ready for any occasion.',
  },
  {
    service: 'Wax Lam',
    desc: 'Enhance and define your brows with our professional eyebrow wax and lamination service, delivering perfectly shaped, fuller-looking brows that last.'
  },
  {
    service: 'Women\'s Haircut',
    desc: 'Experience a fresh, beautiful look with our expert women\'s haircut service, tailored to your style and preferences for a perfect finish every time.'
  }
]
