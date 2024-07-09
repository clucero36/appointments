import React from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';


const ServiceCard = ({props}) => {


  return (
    <Box w={['95%', '95%', '50%']} m='0 auto'>
      <Box borderRadius='xl' p='1rem' backgroundColor='#C38B8B' color='white'>
        <Text fontWeight='bold' fontSize='xl' borderBottom='1px' mb='.5rem' borderColor='#9B5D73'>{props.service}</Text>
        <Box borderBottom='1px' borderColor='#9B5D73'>
          <Text w='95%' fontSize='sm' lineHeight='19px' m='0 auto' mb='.5rem' >
            {props.desc}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default ServiceCard;