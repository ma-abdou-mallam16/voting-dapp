'use client'
//chakra
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    useToast,
    Heading,
  } from '@chakra-ui/react'

  //react
  import { useState, useEffect, React } from "react";



  //wagmi
  import { prepareWriteContract, writeContract } from '@wagmi/core'


  // Address, ABI and CLIENT
  import { getViemClient, abi, contractAddress } from '../../../constants/index';

  //viem
  import { parseAbiItem } from 'viem';

  // constants
  import { useVoterTableStatus } from '@/constants/voterTable';
  /////////////////////////////////


  const RegisterVoter = () => {

    //viem client
    const viemClient = getViemClient();

    // Toast
    const toast = useToast()

      //modal
    const { isOpen, onOpen, onClose } = useDisclosure()
   // const initialRef = React.useRef(null)
   // const finalRef = React.useRef(null)


     //table voter
  const {voterTable, setVoterTable} = useVoterTableStatus();

  // function to add a proposal to the proposal table
 // const addVoterTable = () => {
 //   setVoterTable([...voterTable, {id: voterTable.length, address: voterAddress, voteId: 0}])
 // }


    //input for voter address
    const [voterAddress, setVoterAddress] = useState('');

    //function add a voter
    const addVoter = async() => {
      try {
        const { request } = await prepareWriteContract({
         address: contractAddress,
         abi: abi,
         functionName: 'addVoter',
         args: [voterAddress],
        })
        const { hash } = await writeContract(request)
        
        // catch the event
        await getEvents();
        console.log(voterRegisteredEvents)
        //add to the voter table
      //  await addVoterTable();
        //reset value
        setVoterAddress('')

        toast({
          title: 'Confirmation',
          description: "A new voter was successfully added.",
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


    // Get logs EVENT VoterRegistered
      //Even States
  const [voterRegisteredEvents, setVoterRegisteredEvents] = useState([]);

    //function get all the events with viem
    const getEvents = async() => {
      try {
      const voterRegisteredLogs = await viemClient.getLogs({  
        address: contractAddress,
        event: parseAbiItem('event VoterRegistered(address voterAddress)'),
  
        fromBlock: 0n,
        toBlock: 'latest'
      })
      setVoterRegisteredEvents(voterRegisteredLogs.map(
        log => ({
          address: log.args.account,
        })
      ))
      console.log(voterRegisteredEvents);

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

          // met à jour la whitelist
  const updateVoterTableWithNewAddresses = () => {
    // Utilisez la fonction setVoterTable pour mettre à jour le tableau
    setVoterTable((prevVoterTable) => {
      // Créez une copie du tableau existant
      const updatedVoterTable = [...prevVoterTable];

      // Parcourez les nouveaux événements d'inscription des votants
      voterRegisteredEvents.forEach((event) => {
        // Vérifiez si l'adresse n'est pas déjà dans le tableau
        if (!updatedVoterTable.some((voter) => voter.address === event.address)) {
          // Ajoutez la nouvelle adresse au tableau
          updatedVoterTable.push({
            id: updatedVoterTable.length + 1,
            address: event.address,
            voteId: 0,
          });
        }
      });
      // Retournez le nouveau tableau mis à jour
      return updatedVoterTable;
    });
  };

  //Appeler la fonction de mise à jour lors de nouveaux events
  useEffect(() => {
    updateVoterTableWithNewAddresses();
  }, [voterRegisteredEvents]);

  
    return (

    <div>    
    <Heading as='h1' size="lg" mt='2rem' ml='4'>
    Add a new voter to the whitelist
  </Heading>
      <Button onClick={onOpen} colorScheme='teal' ml='4' mt='3' >Register voter</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register a new voter</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter voter's address</FormLabel>
              <Input placeholder='voter address' value={voterAddress} onChange={(e) =>
                setVoterAddress(e.target.value) }/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={addVoter}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>

    )
  }
  
  export default RegisterVoter;

