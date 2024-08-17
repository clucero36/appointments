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

  // make a requeest to get teamMember serviceData
  // const res = await fetch('https://us-central1-appointments-a917d.cloudfunctions.net/getTeamMemberServiceData?' + new URLSearchParams({
  //   serviceId: service.serviceId,
  //   serviceVersion: service.serviceVersion,
  //   teamMemberId: service.teamMemberId,
  //   stratAt: service.startAt,
  // }).toString())

  // const data = await res.json();
  // const serviceData = JSON.parse(data, reviver);

  //URL params for thankyou page
  const params = {
    // teamMemberName: serviceData.teamMemberBookingProfile.displayName,
    // service: serviceData.serviceItem.itemData.name,
    customerName: formData.get('fname'),
    customerEmail: formData.get('email'),
    apptStart: service.startAt,
    timeString: service.timeString,
  }

  // const response = await fetch('https://us-central1-appointments-a917d.cloudfunctions.net/createAppointment', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //   },
  //   body: JSON.stringify({userData, serviceData}, replacer),
  // })

  let URLParams = new URLSearchParams(params).toString()
  redirect(`/thankyou?${URLParams}`);
}
