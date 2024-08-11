import Staff from "../ui/Staff"

export default function Page({ searchParams }) {

  return (
    <div>
      <div className='text-2xl font-bold my-8'>Select Your Stylist</div>
      <Staff serviceId={searchParams.serviceId} />
    </div>
  )
}