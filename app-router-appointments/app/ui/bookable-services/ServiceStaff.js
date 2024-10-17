'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import ServiceCard from "../ServiceCard";
import { catalogData } from "@/app/lib/data";
import { getStaff } from "@/app/lib/data";

export default function ServiceStaff({ services }) {

  const [staff, setStaff] = useState(null);
  const [service, setService] = useState(null);
  const catalogDetails = catalogData;

  async function clickHandler(id) {
    try {
      let res = await getStaff(id);
      setStaff(res.team);
      setService(res.service);
    } catch {
      console.error("nice try simp");
    }
  }


  if (staff === null && service === null) {
    return (
      <div className="grid grid-cols-7">
        <div className="col-span-7">
          <p>Service Select</p>
          {
          services.map((service, index) => (
              <button onClick={() => clickHandler(service.id)} key={service.id} className="px-4 py-2 w-4/5 md:w-2/3 sm:px-0 mx-auto">
                <ServiceCard  service={service.itemData.name} description={catalogDetails[index].desc} />
              </button>
          ))}
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="grid grid-cols-7">
        <div className="col-span-4">
          <p>Service Select</p>
          {
            services.map((service, index) => (
                <button onClick={() => clickHandler(service.id)} key={service.id} className="px-4 py-2 sm:px-0 w-4/5 md:w-2/3 mx-auto">
                  <ServiceCard  service={service.itemData.name} description={catalogDetails[index].desc} />
                </button>
            ))
          }
        </div>
        <div className="col-span-3 w-4/5 md:w-2/3">
          <p>Staff Select</p>
          {
            staff.map((teamMember) => {
              return (
                <div className="border border-[#9b5d73] my-2 p-2 hover:border-[#c38b8b] text-left" key={teamMember.id} >
                  <Link href={{
                    pathname: '/availabilities',
                    query: {
                      serviceId: `${service.object.id}`,
                      teamMemberId: `${teamMember.id}`,
                      serviceVariationId: `${service.object.itemData.variations[0].id}`,
                    }
                  }}>
                    <div>{teamMember.givenName} {teamMember.familyName}</div>
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}