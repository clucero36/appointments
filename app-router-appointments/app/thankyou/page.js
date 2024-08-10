

export default function Page({ searchParams }) {

  return (
    <div>
      Thank you, {searchParams.customerName}! Your Appointment has been scheduled for {searchParams.apptStart.slice(0,10)} at {searchParams.timeString}. 
    </div>
  )
}