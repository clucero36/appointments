'use client'
import { useState } from "react"
import { createAppointment } from "../lib/actions"

export default function AppointmentForm({ params }) {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form action={createAppointment} className='flex flex-col w-4/5 lg:w-3/5 gap-4 mx-auto' autocomplete="off">
      <input
        className="h-8 block w-full border-0 py-1.5 pl-2 bg-[#c38b8b] ring-1 ring-inset ring-[#9b5d73] text-black placeholder:text-black focus:outline-none rounded-md"
        type='text'
        placeholder='First Name'
        name='fname'
        id='fname'
        onChange={(e) => setFname(e.target.value)}
      />
      <input
        className="h-8 block w-full border-0 py-1.5 pl-2 bg-[#c38b8b] ring-1 ring-inset ring-[#9b5d73] text-black placeholder:text-black focus:outline-none rounded-md"
        type='text'
        placeholder='Last Name'
        name='lname'
        id='lname'
        onChange={(e) => setLname(e.target.value)}
      />
      <input
        className="h-8 block w-full border-0 py-1.5 pl-2 bg-[#c38b8b] ring-1 ring-inset ring-[#9b5d73] text-black placeholder:text-black focus:outline-none rounded-md"
        type='email'
        placeholder='Email'
        name='email'
        id='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="h-8 block w-full border-0 py-1.5 pl-2 bg-[#c38b8b] ring-1 ring-inset ring-[#9b5d73] text-black placeholder:text-black focus:outline-none rounded-md"
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
      {
        fname === '' || lname === '' || email === '' ? 
        <div>Please enter your Name, Email, & Address</div> 
          :
        <input type='submit' className="w-2/5 mx-auto cursor-pointer border border-[#9b5d73] p-2 hover:border-[#c38b8b]"/>
      }
    </form>
  )
}