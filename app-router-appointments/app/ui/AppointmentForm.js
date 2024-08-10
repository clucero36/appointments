import { createAppointment } from "../lib/actions"

export default function AppointmentForm({ params }) {

  return (
    <form action={createAppointment} >
      <label></label>
      <input
        type='text'
        placeholder='First Name'
        name='fname'
        id='fname'
      />
      <label></label>
      <input
        type='text'
        placeholder='Last Name'
        name='lname'
        id='lname'
      />
      <label></label>
      <input
        type='text'
        placeholder='Email'
        name='email'
        id='email'
      />
      <label></label>
      <input
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
      <input type='submit' />
    </form>
  )
}