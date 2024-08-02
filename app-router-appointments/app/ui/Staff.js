import Link from "next/link";


export default async function Staff({serviceId}) {

  const url = `https://us-central1-appointments-a917d.cloudfunctions.net/getStaffServiceVersion?serviceID=${serviceId}`;
  var staffData;

  try {
    const res = await fetch(url);

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

  let renderedTeam = team.map((teamMember) => {
    return (
      <Link key={teamMember.id} href={{
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
        <div>
          <div>{teamMember.givenName}</div>
          <div>{teamMember.familyName}</div>
          <div>{teamMember.emailAddress}</div>
          <div>{teamMember.phoneNumber}</div>
        </div>
      </Link>
    )
  })

  return (
    <div>
      Staff
      {renderedTeam}
    </div>
  )
}