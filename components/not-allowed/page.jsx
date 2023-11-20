import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
const NotAllowed = () => {

  return (
    <Alert status='warning'>
        <AlertIcon />
        You are not allowed in this section. 
        Please connect your wallet or go back to 
        the home page. 
    </Alert>
  )
}

export default NotAllowed;