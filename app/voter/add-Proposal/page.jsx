'use client'

// chakra
import { 
  Textarea, 
  Button, 
  Heading,
  useToast, 
} from '@chakra-ui/react'

//react
import { useState, useEffect } from "react";

//wagmi
import { prepareWriteContract, writeContract } from '@wagmi/core'

// Address, ABI and CLIENT
import { getViemClient, abi, contractAddress } from '../../../constants/index';

//viem
import { parseAbiItem } from 'viem';

// constants
import { useProposalTableStatus } from '@/constants/proposalTable';

/////////////////


const AddProposal = () => {

  //viem client
  const viemClient = getViemClient();
  
  // Toast
  const toast = useToast();

  //input for newProposal
  const [newProposal, setNewProposal] = useState('');

  //table proposal
  const {proposalTable, setProposalTable} = useProposalTableStatus();

  // function to add a proposal to the proposal table
 // const addProposalTable = () => {
 //   setProposalTable([...proposalTable, {id: proposalTable.length, description: newProposal, voteCount: 0}])
 // }


  // function to add a proposal to the blockchain
  const addProposal = async() => {
    try {
      const { request } = await prepareWriteContract({
       address: contractAddress,
       abi: abi,
       functionName: 'addProposal',
       args: [newProposal],
      })
      const { hash } = await writeContract(request)
      // add new proposal to the table
 //     await addProposalTable()
      // catch the event
      await getEvents();
      console.log(proposalRegisteredEvents)
      //reset value
      setNewProposal('')
      toast({
        title: 'Confirmation',
        description: "Your proposal has been added.",
        status: 'success',
        duration: 4000,
        isClosable: true,
      })

    } catch(error) {
      console.log(error.message);
      toast({
        title: 'Oh no...',
        description: "An error occured...",
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }


  // Get logs EVENT ProposalRegistered
  //Even States
  const [proposalRegisteredEvents, setProposalRegisteredEvents] = useState([])
  //function get all the events with viem
  const getEvents = async() => {
    const proposalRegisteredLogs = await viemClient.getLogs({  
      address: contractAddress,
      event: parseAbiItem('event ProposalRegistered(uint proposalId)'),

      fromBlock: 0n,
      toBlock: 'latest'
    })

    setProposalRegisteredEvents(proposalRegisteredLogs.map(
      // à corriger ? 
      log => ({
        id: log.args.proposalId,
      })
    ))
    }
  
  // met à jour le tableau des proposition
  const updateProposalTable = () => {
    // Utilisez la fonction setVoterTable pour mettre à jour le tableau
    setProposalTable((prevProposalTable) => {
      // Créez une copie du tableau existant
      const updatedProposalTable = [...prevProposalTable];

      // Parcourez les nouveaux événements
      proposalRegisteredEvents.forEach((event) => {
        // Vérifiez si l'id n'est pas déjà dans le tableau
        if (!updatedProposalTable.some((proposal) => proposal.id === event.id)) {
          // Ajoutez la nouvelle adresse au tableau
          updatedVoterTable.push({
            id: updatedProposalTable.length -1,
            description: newProposal,
            voteCount: 0,
          });
        }
      });
      // Retournez le nouveau tableau mis à jour
      return updatedProposalTable;
    });
  };

  //Appeler la fonction de mise à jour lors de nouveaux events
  useEffect(() => {
    updateProposalTable();
  }, [proposalRegisteredEvents]);


  return (
    <div>
    <Heading as='h1' size="lg" mt='2rem' ml='4' mb='4'>
      Add a proposal
    </Heading>
    <Textarea
      placeholder='Proposal description'
      value={newProposal}
      onChange={(e) => setNewProposal(e.target.value)}
      ml='4'
      width='50%'
      height='100px'
      display='block'
    />
    <Button colorScheme='teal' size='md' onClick={addProposal} ml='4' mt='3'>
      Sendevent.address
    </Button>
  </div>
  )
}

export default AddProposal;