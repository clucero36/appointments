import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {
  Box,
  calc, 
} from '@chakra-ui/react';

export default function Layout({children}) {
  return (
    <Box border='2px' borderColor='#9B5D73' borderRadius='xl' m='1rem' h='calc(100vh - 2rem)'>
      <Header />
      <main>{children}</main>
    </Box>
  )
}