import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Divider, 
    Heading, 
    Text,
    Button, 
    Image,
    Box,
    Flex,
} from '@chakra-ui/react'

import { useState, useEffect } from 'react';

  //constants
  import { useWorkflowStatus } from '@/constants/workflowStatus';
  import { useProposalTableStatus } from '@/constants/proposalTable';

const WinningProposal = () => {

  //workflowStatus
  const {workflowStatus, setWorkflowStatus} = useWorkflowStatus();

  // On importe proposalTable
  const {proposalTable, setProposalTable} = useProposalTableStatus();

  const [winningProposal, setWinningProposal] = useState('');

  // function tallying votes
  useEffect(() => {
    if (proposalTable && proposalTable.length > 0) {
      const calculateWinningProposal = () => {
        let proposalWithMaxVotes = proposalTable[0];

        for (let i = 1; i < proposalTable.length; i++) {
          if (proposalTable[i].voteCount > proposalWithMaxVotes.voteCount) {
            proposalWithMaxVotes = proposalTable[i];
          }
        }

        setWinningProposal(proposalWithMaxVotes);
      };

      calculateWinningProposal();
    }
  }, [proposalTable]);
  


  return (
    <div>
<Card align='center' p='2rem'>
  <CardHeader>
  <Box boxSize='sm' width='30%' height='30%' ml='36%' >
  <Image src='https://img.freepik.com/vecteurs-premium/trophee-or-plaque-signaletique-du-gagnant-du-concours_68708-545.jpg' alt='trophée' />
</Box>
  </CardHeader>
  <CardBody>
    <Text>And the winner is...</Text>
  </CardBody>
  <CardFooter mt='-2.5%'>
  {workflowStatus.length < 5 ? (
         <Flex p='2rem'>
         <Button colorScheme='gray' disabled>Voting session still in progress</Button>
         </ Flex>
      ) : (
        <>
        <Flex p='2rem'>
        <Button colorScheme='purple' onClick={onOpen}>View here</Button>
        </ Flex>
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Warning</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Text>The winning proposal with {winningProposal.voteCount} votes is id {winningProposal.id} : {winningProposal.description}
      </Text>
    </ModalBody>

    <ModalFooter>
      <Button  variant='ghost' mr={3} onClick={onClose}>
        Return
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
</>
)}
<Divider />

  </CardFooter>
</Card>
    </div>
  )
}

export default WinningProposal;