'use client'
import { Box } from '@chakra-ui/react';
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from '@chakra-ui/react';

//workflow
import { useWorkflowStatus } from '@/constants/workflowStatus';


const Welcome = () => {

  //importer la valeur de workflow
  const { workflowStatus, setWorkflowStatus } = useWorkflowStatus();

// Stepper
  let defineIndex;
  let des1;
  let des2;
  let des3;
  switch(workflowStatus.length) {
    case 0:
      defineIndex = 0;
      des1 = 'Started'
      des2 = 'Soon'
      des3 = 'Soon'
      break;
    case 1 :
      defineIndex = 1;
      des1 = 'Ended'
      des2 = 'Soon'
      des3 = 'Soon'
      break;
    case 2 :
      defineIndex = 1;
      des1 = 'Ended'
      des2 = 'Started'
      des3 = 'Soon'
      break;
    case 3 :
      defineIndex = 2;
      des1 = 'Ended'
      des2 = 'Ended'
      des3 = 'Soon'
      break;
    case 4 :
      defineIndex = 2;
      des1 = 'Ended'
      des2 = 'Ended'
      des3 = 'Started'
      break;
    default: 
    defineIndex = 3;
    des1 = 'Ended'
    des2 = 'Ended'
    des3 = 'Ended'
  }
  const steps = [
    { title: 'Registering', description: des1 },
    { title: 'Proposals', description: des2 },
    { title: 'Voting', description: des3 },
  ];
  const { activeStep } = useSteps({
    index: defineIndex,
    count: steps.length,
  });




  return (
    <>
    <Card align='center'>
  <CardHeader>
    <Heading size='md' fontSize='5xl'> Welcome to the voting session</Heading>
  </CardHeader>
  <CardBody>
    <Text>If you are a voter or an administrator, please connect your wallet here.</Text>
  </CardBody>
  <CardFooter>

  <Stepper size='lg' index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  </CardFooter>
</Card>
    
    </>
  );
};

export default Welcome;