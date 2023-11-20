'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Text, Spacer, Box } from "@chakra-ui/react";

import {React} from 'react'

import Link from "next/link";
import { Image } from '@chakra-ui/react'



const NavBar = () => {
  return (
<Flex
      bg="#e0e0e0"
      p="2rem"
      justifyContent="space-between"
      alignContent="center"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.1)" // Ajout d'une ombre légère
    >
      <Link href="/">
      <Text as="a" fontSize="xl" color="#333" mr="1rem">
            Home
      </Text>
      </Link>
      <Box boxSize='sm' width='4%' height='20px' ml='1%' marginTop='-10px'>
  <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Logo_vote.svg/800px-Logo_vote.svg.png' alt='bulletin de vote' />
</Box>
    <Spacer />

      <Flex alignItems="center">
        <Link href="/admin" passHref>
          <Text as="a" fontSize="xl" color="#333" mr="1rem">
            Admin
          </Text>
        </Link>
        <Link href="/voter" passHref>
          <Text as="a" fontSize="xl" color="#333" mr="1rem">
            Voter
          </Text>
        </Link>
      </Flex>
      <ConnectButton />
    </Flex>
  )
}

export default NavBar