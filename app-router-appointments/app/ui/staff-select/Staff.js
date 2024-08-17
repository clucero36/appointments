import Link from "next/link";


export default async function Staff({serviceId}) {

  const url = `https://us-central1-appointments-a917d.cloudfunctions.net/getStaffServiceVersion?serviceID=${serviceId}`;
  var staffData;

  try {
    const res = await fetch(url);
    console.log('Fetching Staff data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (!res.ok) 
      throw new Error(`Response status: ${res.status}`);

    staffData = await res.json();
  }
  catch (error) {
    console.error(error.message);
  }

  const reviver = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' ? BigInt(value) : value;
  const team = JSON.parse(staffData.team, reviver);
  const service = JSON.parse(staffData.service, reviver);

  return (
    <div className="flex flex-col gap-4">
      {
        team.map((teamMember) => {
          return (
            <Link className="w-4/5 lg:w-2/5 mx-auto" key={teamMember.id} href={{
              pathname: '/availabilities',
              query: {
                serviceId: `${service.object.id}`,
                serviceVersion: `${service.object.version}`,
                teamMemberId: `${teamMember.id}`,
                serviceVariationId: `${service.object.itemData.variations[0].id}`,
                locationId: team[0].assignedLocations.locationIds[0],
                teamMember: `${teamMember.givenName}`,
                serviceName: `${service.object.itemData.name}`
              }
            }}>
              <div className="border border-[#9b5d73] p-2 hover:border-[#c38b8b] text-left">
                <div>{teamMember.givenName}</div>
                <div>{teamMember.familyName}</div>
                <div>{teamMember.emailAddress}</div>
                <div>{teamMember.phoneNumber}</div>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}