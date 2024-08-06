import AppointmentForm from "../ui/AppointmentForm";

export default function Page({ searchParams }) {

  return (
    <div>
      Contact Page
      <AppointmentForm params={searchParams}/>
    </div>
  )
}