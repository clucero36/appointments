import React from 'react';
import {
  Box, 
  Icon,
} from '@chakra-ui/react';
import { IoLogoTableau } from "react-icons/io5";
import Link from 'next/link';

const Header = () => {

  return (
    <Box display='flex' justifyContent='space-between' m='2rem' p='0 .5rem' gap={2} h='10vh'>
      <Link href='/'>
        <Icon boxSize='25' as={IoLogoTableau} mt='1px'/>
      </Link>
    </Box>
  )
}

export default Header;