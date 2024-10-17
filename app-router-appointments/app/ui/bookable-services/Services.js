import Link from "next/link";
import { getServices } from "@/app/lib/data";
import ServiceStaff from "./ServiceStaff";

export default async function ServicesCards() {

  const services = await getServices();

  if (!services) return null;

  return (
    <>
      <ServiceStaff services={services}/>
    </>
  )
}