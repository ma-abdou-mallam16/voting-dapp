'use client'
import {
    Button,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    Flex,
    Divider,
    useToast,
  } from '@chakra-ui/react'

  //constants
import { useWorkflowStatus } from '@/constants/workflowStatus';
import { getViemClient, abi, contractAddress } from '../../../constants/index';

//viem
import { parseAbiItem } from 'viem';

//react
import { useState, useEffect } from "react";

//wagmi
import { prepareWriteContract, writeContract } from '@wagmi/core'



const ChangeWorkflow = () => {

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Toast
  const toast = useToast();

  //viem client
  const viemClient = getViemClient();

  //workflowStatus
  const {workflowStatus, setWorkflowStatus} = useWorkflowStatus();


  // update button's descrition
  let workflowButton =  '';
  switch (workflowStatus.length) {
    case 0:
      workflowButton = 'Start proposals registration';
      break;
    case 1 :
      workflowButton ='End proposals registration';
      break;
    case 2 :
      workflowButton = 'Start voting session';
      break;
    case 3 :
      workflowButton = 'End voting session';
      break;
    case 4 :
      workflowButton = 'Start tallying votes';
      break;
    default: 
      workflowButton = 'No more action';
              
  }


  // update the argument for changeCurrentWorflow
  let functionWorkflow = '';
  switch (workflowStatus.length) {
    case 0:
      functionWorkflow = 'startProposalsRegistering';
      break;
    case 1 :
      functionWorkflow ='endProposalsRegistering';
      break;
    case 2 :
      functionWorkflow = 'startVotingSession';
      break;
    case 3 :
      functionWorkflow = 'endVotingSession';
      break;
    case 4 :
      functionWorkflow = 'tallyVotes';
      break;
    default: 
      functionWorkflow = 'No more action';
              
  }
  // function to start proposal's registering
  const changeCurrentWorflow = async() => {
    try {
      const { request } = await prepareWriteContract({
       address: contractAddress,
       abi: abi,
       functionName: functionWorkflow,
      })
      const { hash } = await writeContract(request)
      // catch the event
      await getEvents();
      //verify value
      console.log(workflowEvents);
      //update current workflow
      setWorkflowStatus(workflowEvents);
      toast({
        title: 'Confirmation',
        description: "The current workflow has been updated.",
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


    //Even States
    const [workflowEvents, setWorkflowEvents] = useState([])
    //function get all the events with viem
    const getEvents = async() => {
      const workflowLogs = await viemClient.getLogs({  
        address: contractAddress,
        event: parseAbiItem('event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus)'),
  
        fromBlock: 0n,
        toBlock: 'latest'
      })
      setWorkflowEvents(workflowLogs.map(
        // à corriger ? 
        log => ({
          status: log.args.newStatus,
        })
      ))
      }

  return (
    <div>
      {functionWorkflow === 'No more action' ? (
         <Flex p='2rem'>
         <Button colorScheme='gray' disabled>{workflowButton}</Button>
         </ Flex>
      ) : (
        <>
        <Flex p='2rem'>
        <Button colorScheme='purple' onClick={onOpen}>{workflowButton}</Button>
        </ Flex>
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Warning</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Text>Warning : You won't be able to go back to the previous status. 
        Are you sure you want to continue ?
      </Text>
    </ModalBody>

    <ModalFooter>
      <Button  variant='ghost' mr={3} onClick={onClose}>
        Cancel
      </Button>
      <Button  colorScheme='blue' onClick={changeCurrentWorflow }>Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
<Divider />
</>
      )}
    </div>
  )
}

export default ChangeWorkflow;