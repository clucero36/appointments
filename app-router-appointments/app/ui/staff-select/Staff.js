import Link from "next/link";
import { getStaff } from "@/app/lib/data";

export default async function Staff({serviceId}) {

  const { team, service } = await getStaff(serviceId);
  
  if (!team || !service) return null;

  return (
    <div className="flex flex-col gap-4">
      {
        team.map((teamMember) => {
          return (
            <Link className="w-4/5 lg:w-2/5 mx-auto" key={teamMember.id} href={{
              pathname: '/availabilities',
              query: {
                serviceId: `${service.object.id}`,
                teamMemberId: `${teamMember.id}`,
                serviceVariationId: `${service.object.itemData.variations[0].id}`,
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

// serviceVersion: `${service.object.version}`,
// teamMember: `${teamMember.givenName}`,
// serviceName: `${service.object.itemData.name}`
// locationId: team[0].assignedLocations.locationIds[0],