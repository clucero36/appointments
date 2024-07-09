import React from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

// pre rendering method makes a request to express server.
// passes staff data retrieved in response to StaffSelect as props.
export async function getServerSideProps(context) {
  const serviceID = context.query.serviceId;

  const res = await fetch(`https://us-central1-appointments-a917d.cloudfunctions.net/getStaffServiceVersion?serviceID=${serviceID}`)
  
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    }
  }

  return { 
    props: {
      staffData: data
    }
  }
};

// displays service selected, a description of the service, & a list of team members.
// Next.js Link component transitions user to /availabilities. Query params provided.
export default function StaffSelect({ staffData }) {
  const reviver = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' ? BigInt(value) : value;
  const team = JSON.parse(staffData.team, reviver);
  const service = JSON.parse(staffData.service, reviver);

  let renderedTeam = team.map((teamMember) => {
    return (
      <Link key={teamMember.id} href={{
        pathname: '/availabilities',
        query: {
          serviceId: `${service.object.id}`,
          serviceVersion: `${service.object.version}`,
          teamMemberId: `${teamMember.id}`,
          serviceVariationId: `${service.object.itemData.variations[0].id}`,
          locationId: team[0].assignedLocations.locationIds[0],
          teamMember: `${teamMember.givenName}`,
          serviceName: `${service.object.itemData.name}`
        }
      }}>
        <Box border='1px' p='1rem' m='.5rem auto' borderRadius='sm' w={['100%', '95%', '50%']}>
          <Text>{teamMember.givenName}</Text>
          <Text>{teamMember.familyName}</Text>
          <Text>{teamMember.emailAddress}</Text>
          <Text>{teamMember.phoneNumber}</Text>
        </Box>
      </Link>
    )
  })

  return (
    <Box p='5rem' align='center' h='86vh'>
      <Text fontSize='2xl'>StaffSelect</Text>
      <Text>Select a Staff Member for the {service.object.itemData.name} Service</Text>
      <Box align='left'>
        {renderedTeam}
      </Box>
    </Box>
  )
}

