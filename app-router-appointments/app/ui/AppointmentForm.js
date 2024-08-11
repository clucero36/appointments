import { createAppointment } from "../lib/actions"

export default function AppointmentForm({ params }) {

  return (
    <form action={createAppointment} className='flex flex-col w-4/5 lg:w-3/5 gap-4 mx-auto'>
      <label></label>
      <input
        className="h-8"
        type='text'
        placeholder='First Name'
        name='fname'
        id='fname'
      />
      <label></label>
      <input
        className="h-8"
        type='text'
        placeholder='Last Name'
        name='lname'
        id='lname'
      />
      <label></label>
      <input
        className="h-8"
        type='text'
        placeholder='Email'
        name='email'
        id='email'
      />
      <label></label>
      <input
        className="h-8"
        type='text'
        placeholder='Note'
        name='note'
        id='note'
      />
      <input 
        type='hidden'
        name='serviceId'
        id='serviceId'
        value={`${params.serviceId}`}
      />
      <input 
        type='hidden'
        name='serviceVersion'
        id='serviceVersion'
        value={`${params.serviceVersion}`}
      />
      <input 
        type='hidden'
        name='teamMemberId'
        id='teamMemberId'
        value={`${params.teamMemberId}`}
      />
      <input 
        type='hidden'
        name='startAt'
        id='startAt'
        value={`${params.startAt}`}
      />
      <input 
        type='hidden'
        name='timeString'
        id='timeString'
        value={`${params.timeString}`}
      />
      <input type='submit' className="w-2/5 mx-auto cursor-pointer border border-[#9b5d73] p-2 hover:border-[#c38b8b]"/>
    </form>
  )
}