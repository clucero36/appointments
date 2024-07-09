import React from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

// pre rendering method makes a request to express server
// passes services retrieved in response as props to 
// BookableServices
export async function getServerSideProps() {

  const url = 'https://us-central1-appointments-a917d.cloudfunctions.net/getCatalogServices'

  try {
    const res = await fetch(url);

    if (!res.ok) 
      throw new Error(`Response status: ${res.status}`);

    const data = await res.json();

    if (!data) 
      return {notFound: true}

    return { 
      props: {
        serviceData: data
      }
    } 
  }
  catch (error) {
    console.error(error.message);
  }
}

// BookableServices Displays list of services retrieved from pre render.
// Next.js Link component transitions user to /staffSelect page. Query params provided.
export default function BookableServices({ serviceData }) {
  // passed as second arg to JSON.parse to handle BigInts
  const reviver = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' ? BigInt(value) : value;
  let services = JSON.parse(serviceData.items, reviver);
  let renderedServices = services.map((service) => {
    return (
      <Box key={service.id}>
        <Link href={{
          pathname: '/staffSelect',
          query: {
            serviceId: `${service.id}`,
          }
        }}>
          <Text border='1px' p='1rem' m='.5rem' borderRadius='sm' w='50%'>{service.itemData.name}</Text>
        </Link>
      </Box>
    )
  })
  return (
    <Box align='center'>
      <Text fontSize='2xl'>Select a Service</Text>
      {renderedServices}
    </Box>
  )
}