'use server'

import { redirect } from 'next/navigation';

const reviver = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' || key === 'serviceVariationVersion' ? BigInt(value) : value;

export async function createAppointment(formData) {

  // grab form data
  const service = {
    serviceId: formData.get('serviceId'),
    serviceVersion: formData.get('serviceVersion'),
    teamMemberId: formData.get('teamMemberId'),
    startAt: formData.get('startAt'),
    timeString: formData.get('timeString'),
  }


  //URL params for thankyou page
  const params = {
    // teamMemberName: serviceData.teamMemberBookingProfile.displayName,
    // service: serviceData.serviceItem.itemData.name,
    customerName: formData.get('fname'),
    customerEmail: formData.get('email'),
    apptStart: service.startAt,
    timeString: service.timeString,
  }

  let URLParams = new URLSearchParams(params).toString()
  redirect(`/thankyou?${URLParams}`);
}
