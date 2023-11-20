'use client'
import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Heading, 
    Text,
 } from '@chakra-ui/react'

const VoterCard = ({address, proposalId}) => {
  return (
    <Card display='inline-block'>
    <CardHeader>
      <Heading size='md'> Address</Heading>
    </CardHeader>
    <CardBody>
      <Text>{address}</Text>
    </CardBody>
    <CardFooter>
   
    <Text>Voted for id {proposalId}</Text>  
    </CardFooter>
  </Card>
  )
}

export default VoterCard