import Link from "next/link";
import { getServices } from "@/app/lib/data";
import { catalogData } from "@/app/lib/data";
import ServiceCard from "../ServiceCard";

export default async function ServicesCards() {

  const services = await getServices();
  const catalogDetails = catalogData;

  if (!services) return null;

  return (
    <>
      {services.map((service, index) => (
        <div key={service.id} className="px-4 py-2 sm:px-0 w-4/5 md:w-2/5 mx-auto">
          <Link href={{
              pathname: '/staff-select',
              query: {
                serviceId: `${service.id}`,
              }
            }}>
              <ServiceCard service={service.itemData.name} description={catalogDetails[index].desc} />
            </Link>
        </div>
      ))}
    </>
  )
}