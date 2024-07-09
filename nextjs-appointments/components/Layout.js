import React from 'react';
import Header from './Header';
import {
  Box, 
} from '@chakra-ui/react';

export default function Layout({children}) {
  return (
    <Box m='.5rem' border='2px' h='100%' borderColor='#9B5D73' borderRadius='xl'>
      <Header />
      <main>{children}</main>
    </Box>
  )
}