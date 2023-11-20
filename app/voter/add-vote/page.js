'use client'

// chakra
import { 
  Input, 
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
import { useVoterTableStatus } from '@/constants/voterTable';

/////////////////
const AddVote = () => {

  //viem client
  const viemClient = getViemClient();
  
  // Toast
  const toast = useToast();

  //input for newProposal
  const [newVote, setNewVote] = useState('');

  //table proposal
  const {proposalTable, setProposalTable} = useProposalTableStatus();

  //table voter
 const {voterTable, setVoterTable} = useVoterTableStatus();

  //Even States
  const [addVoteEvents, setAddVoteEvents] = useState([])


  // function to add a vote to the blockchain
  const addVote = async() => {
    try {
      const { request } = await prepareWriteContract({
       address: contractAddress,
       abi: abi,
       functionName: 'setVote',
       args: [parseInt(newVote)],
      })
      const { hash } = await writeContract(request)
      // catch the event
      await getEvents();
      //reset value
      setNewVote('')
      toast({
        title: 'Confirmation',
        description: "Your vote has been added.",
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


  //function get all the events with viem
  const getEvents = async() => {
        const voteLogs = await viemClient.getLogs({
            address: contractAddress,
            event: parseAbiItem('event Voted (address voter, uint proposalId)'),
            fromBlock: 0n,
            toBlock: 'latest'
        });
        console.log("Vote logs:", voteLogs);
        setAddVoteEvents(voteLogs.map(log => ({
            address: log.args.voter,
            proposalId: log.args.proposalId
        })));

};



    // met à jour la fiche des voters
    const updateVoter = () => {
      // Utilisation de map pour créer une nouvelle version de voterTable
      const updatedVoterTable = voterTable.map((voter) => {
        // Recherche d'une correspondance dans addVoteEvents en fonction de l'adresse
        const matchingVoteEvent = addVoteEvents.find(
          (voteEvent) => voteEvent.address === voter.address
        );
    
        // Si une correspondance est trouvée, mettez à jour voteId
        if (matchingVoteEvent) {
          return {
            ...voter,
            voteId: matchingVoteEvent.proposalId,
          };
        }
        return voter;
      });

      setVoterTable(updatedVoterTable);
    };



    // met à jour le tableau des propositions
    const updateProposalTable = () => {
      // Utilisation de map pour créer une nouvelle version de proposalTable
      const updatedProposalTable = proposalTable.map((proposal) => {
        // Recherche d'une correspondance dans addVoteEvents en fonction de l'id.
        const matchingVoteEvent = addVoteEvents.find(
          (voteEvent) => voteEvent.proposalId === proposal.id
        );
    
        // Si une correspondance est trouvée, mettez à jour voteCount
        if (matchingVoteEvent) {
          return {
            ...proposal,
            voteCount: proposal.voteCount + 1,
          };
        }
        return proposal;
      });

      setVoterTable(updatedProposalTable);
    };

// UseEffect pour mettre à jour tableau et fiche voter après chaque vote
  useEffect(() => {
    const update = async () => {
    await  updateProposalTable();
    await  updateVoter();
    }
    update();
  }, [addVoteEvents]); 



  return (
    <div p='1rem'>
        <Heading as='h1' size="lg" mt='2rem' p='0.5rem' ml='2'>
            Add a vote 
        </Heading>
        <Input htmlSize={7} width='auto' placeholder='Proposal ID' ml='3' value={newVote}
      onChange={(e) => setNewVote(e.target.value)} />


        <Button colorScheme='teal' size='md' ml='1' onClick={addVote} >
          Send
        </Button>
    </div>
  )
}

export default AddVote;