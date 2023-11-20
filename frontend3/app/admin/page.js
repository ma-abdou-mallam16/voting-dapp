'use client'

import ChangeWorkflow from "./changeWorkflow/page";
import RegisterVoter from "./registerVoter/page";
import NotAllowed from "@/components/not-allowed/page";

//wagmi
import { useAccount } from 'wagmi'

//administrator
import { ownerAddress } from "@/constants";

//constants
import { useWorkflowStatus } from '@/constants/workflowStatus';

const Admin = () => {

  const { address, isConnected } = useAccount();

    //workflowStatus
    const {workflowStatus, setWorkflowStatus} = useWorkflowStatus();


  return (
    <div>
      {isConnected && address == ownerAddress ? (
        <>
      {workflowStatus.length === 0 ?(
        <>
        <ChangeWorkflow />
        <RegisterVoter />
        </>
      ) : (
        <ChangeWorkflow />
      )}
        </>
      ) : (
        <NotAllowed />
      )}

    </div>
  )
}

export default Admin