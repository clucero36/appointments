import AppointmentForm from "../ui/AppointmentForm";

export default function Page({ searchParams }) {

  return (
    <div>
      <div className='text-2xl font-bold my-8'>Contact Page</div>
      <AppointmentForm params={searchParams}/>
    </div>
  )
}