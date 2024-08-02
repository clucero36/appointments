
import serviceData from "../data/data"
import ServiceCard from "../ui/ServiceCard"

export default function Page() {

  const renderedServices = serviceData.map((service, index) => {
    return (
      <ServiceCard key={index} service={service.service} description={service.desc} />
    )
  })

  return (
    <div className="h-svh">
      <div>Service Details Page</div>
      <div className='flex flex-col w-4/5 my-0 mx-auto gap-5'>
        {renderedServices}
      </div>
    </div>
  )
}