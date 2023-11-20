'use client'
import {useState} from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
  } from '@chakra-ui/react'

import Proposal from './proposal/page';

//constant
import { useProposalTableStatus } from '@/constants/proposalTable';


const TableProposals = () => {

// On importe proposalTable
  const {proposalTable, setProposalTable} = useProposalTableStatus();

  return (
    <div>
        <Heading as='h1' p="2rem">
            List of Proposals :
        </Heading>
        <TableContainer p="1rem">
    <Table variant='striped' colorScheme='gray'>
      <Thead>
        <Tr >
          <Th style={{ backgroundColor: '#008080', color: 'white' }}>Proposal ID</Th>
          <Th style={{ backgroundColor: '#008080', color: 'white' }}>Description</Th>
          <Th isNumeric style={{ backgroundColor: '#008080', color: 'white' }}>VoteCount</Th>
        </Tr>
      </Thead>

      {proposalTable && proposalTable.length > 0 ? (
        proposalTable.map((proposal) => {
          return <Proposal key={proposal.id} id={proposal.id} 
          description={proposal.description} 
          voteCount={proposal.voteCount} /> 
        })

      ) : (
        <>
        <Tbody>
        <Tr>
          <Td></Td>
          <Td>No proposal added yet</Td>
          <Td isNumeric></Td>
        </Tr>
      </Tbody>
      </>
      )
    }

    </Table>
  </TableContainer>
  </div>
  )
}

export default TableProposals;