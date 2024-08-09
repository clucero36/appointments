import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box, 
  Text,
  FormControl,
  FormLabel ,
  Input,
  Button
} from '@chakra-ui/react';
import axios from 'axios';

// prerender method takes url parameters after a client has selected a service, a team member, and a start time
export async function getServerSideProps(context) {
  const serviceId = context.query.serviceId;
  const serviceVersion = context.query.serviceVersion;
  const teamMemberId = context.query.teamMemberId;
  const startAt = context.query.startAt;
  const timeString = context.query.timeString;
  const service = context.query.service;
  
  const res = await fetch('https://us-central1-appointments-a917d.cloudfunctions.net/getTeamMemberServiceData?' + new URLSearchParams({
    serviceId: serviceId,
    serviceVersion: serviceVersion,
    teamMemberId: teamMemberId,
    startAt: startAt,
  }).toString())
  
  let data = await res.json();

  return {
    props: {
      serviceDetails: data,
      timeString: timeString,
      service: service,
    }
  }
}

// service data is passed as props
// client fills out the contact form, and an appointment is scheduled after a request to /create endpoint
export default function Contact({ serviceDetails, timeString, service }) {
  const reviver = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' || key === 'serviceVariationVersion' ? BigInt(value) : value;
  const replacer = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' || key === 'serviceVariationVersion' ? value.toString() : value;
  const [customerNote, setCustomerNote] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [custFname, setCustFname] = useState('');
  const [custLname, setCustLname] = useState('');
  const [custEmail, setCustEmail] = useState('');
    // const [bookingDur, setBookingDur] = useState('');
    // const [customerId, setCustomerId] = useState('');

  let serviceData = JSON.parse(serviceDetails, reviver);
  console.log(serviceData);

  const handleSubmit = (event) => { 
    event.preventDefault();
    setTeamMember(serviceData.teamMemberBookingProfile.displayName);
    setCustomerNote(event.target.note.value);
    setCustFname(event.target.first.value);
    setCustLname(event.target.last.value);
    setCustEmail(event.target.email.value);
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   let userData = {
  //     firstName: event.target.first.value,
  //     lastName: event.target.last.value,
  //     email: event.target.email.value,
  //     note: event.target.note.value,
  //   }

  //   const params = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //     data: JSON.stringify({userData, serviceData}, replacer),
  //   }
    
  //   axios.get('https://us-central1-appointments-a917d.cloudfunctions.net/createAppointment', {
  //     params: params
  //   }).then((res) => {
  //     let booking = JSON.parse(res.data.booking, reviver);
  //     setBookingStart(booking.startAt);
  //     setCustomerId(booking.customerId);
  //     setCustomerNote(booking.customerNote);
  //     setBookingDur(booking.appointmentSegments[0].durationMinutes);
  //     setTeamMember(res.data.teamMember);
  //   })
  // }

  if (customerNote === '' && teamMember === '' && custFname === '' &&
    custLname === '' && custEmail === '') {
    return (
      <Box w='75%' m='0 auto' >
        <Text textAlign='center'>Fill Out Your Contact Information To Complete The Booking</Text>
        <form onSubmit={handleSubmit}>
          <FormControl mt='2rem' p='10px' border='1px' borderRadius='md' borderColor='#9B5D73'>
            <FormLabel m='0'>FirstName:</FormLabel >
            <Input variant='flushed' focusBorderColor='#9B5D73' mb='1rem' size='sm' placeholder='First Name' type='text' name='first'/>
            <FormLabel m='0'>LastName:</FormLabel >
            <Input variant='flushed' focusBorderColor='#9B5D73' mb='1rem' size='sm' placeholder='Last Name' type='text' name='last'/>
            <FormLabel m='0'>Email:</FormLabel >
            <Input variant='flushed' focusBorderColor='#9B5D73' mb='1rem' size='sm' placeholder='Email' type='text' name='email'/>
            <FormLabel m='0'>Note:</FormLabel >
            <Input variant='flushed' focusBorderColor='#9B5D73' mb='1rem' size='sm' placeholder='Customer Note' type='text' name='note'/>
            <Button type='submit'>Submit</Button>
          </FormControl>
        </form>
      </Box>
    )
  }
  else {
    return (
      <Box >
        <Text align='center' fontSize='2xl' m='0 auto'>Thank you for your business!</Text>
        <Box align='left' p='1rem' m='5rem auto' w={['80%', '60%']} display='flex' flexDir='column' gap='1rem' border='1px'>
          <Text align='center'>Appointment Details</Text>
          {/* <Text>Cusotmer ID: {customerId}</Text> */}
          <Text>Booked Service: {service}</Text>
          <Text>Appointment Date: {serviceData.startAt.slice(0, 10)}</Text>
          <Text>Booking Start: {timeString}</Text>
          {/* <Text>Booking Duration: {bookingDur}</Text> */}
          <Text>Team Member: {teamMember}</Text>
          <Text>Customer Name: {custLname}, {custFname}</Text>
          <Text>Customer Email: {custEmail}</Text>
          <Text>Customer Note: {customerNote}</Text>
          <Link href='/'>
            <Text align='center'>Home</Text>
          </Link>
        </Box>
      </Box>
    )
  }
}