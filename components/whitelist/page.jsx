'use client'
import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Heading, 
    SimpleGrid,
    Text,
    Button,
    Flex,
    Box,
    StepSeparator
 } from '@chakra-ui/react'

 import { VoterCard } from './voter-card/page';

 import { useState } from 'react'
 import { ownerAddress } from '@/constants';

 // constants
 import { useVoterTableStatus } from '../../constants/voterTable';

const Whitelist = () => {

  //table voter
 const {voterTable, setVoterTable} = useVoterTableStatus();



// <VoterCard key={voter.id} address={voter.address} proposalId={voter.voteId} /> 



  return (
    <div>
    <Heading as='h1' p="2rem">
        Whitelist :
    </Heading>
    {voterTable.length === 0 ? (
              <Heading as='h1' p="2rem" size='md'>
              No voter has been added yet.
          </Heading>
        ) : (
    <Box overflowX="overlay" >
      <Box flex='none' overflowX="overlay" width="max-content" spacing={4}>

          {voterTable.map((voter) => {
            return voter.voteId === 0 ? (
              
               <Card display='inline-block' key={voter.id}>
                <CardHeader>
                  <Heading size='sd'> ID : {voter.id}</Heading>
                </CardHeader>
                <CardBody>
                <Heading as="h1" fontSize="xl" fontWeight="bold">Address</Heading>
                  <Text>{voter.address}</Text>
                </CardBody>
                <CardFooter>
                  <Text color='red'>Has not voted yet</Text>  
                </CardFooter>
              </Card>
              
              ) : (     
                <Card key={voter.id}>
                <CardHeader>
                  <Heading size='md'> Address</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{voter.address}</Text>
                </CardBody>
                <CardFooter>
                
                <Text color='green'>Voted for id {voter.voteId}</Text>  
                </CardFooter>
                </Card>
              )
              })}
          </Box>
        </Box>
        )}

  </div>
  )
}

export default Whitelist