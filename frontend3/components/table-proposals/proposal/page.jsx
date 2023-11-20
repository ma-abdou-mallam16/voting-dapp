import {
    Tbody,
    Tr,
    Td,

  } from '@chakra-ui/react'


const Proposal = ({id, description, voteCount}) => {
  return (
    <Tbody>
          <Tr>
            <Td>{id}</Td>
            <Td>{description}</Td>
            <Td isNumeric>{voteCount}</Td>
          </Tr>
    </Tbody>
  )
}

export default Proposal