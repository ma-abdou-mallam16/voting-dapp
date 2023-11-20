'use client'

import AddProposal from "./add-Proposal/page";
import AddVote from "./add-vote/page";
import NotAllowed from "@/components/not-allowed/page";
import Finished from "@/components/finished/page";

 // constants
 import { useVoterTableStatus } from '../../constants/voterTable';
import { useWorkflowStatus } from '@/constants/workflowStatus';

//wagmi
import { useAccount } from 'wagmi';

const Voter = () => {

  //connect address
  const { address, isConnected } = useAccount();

    //table voter
  const {voterTable, setVoterTable} = useVoterTableStatus();

  //workflowStatus
  const {workflowStatus, setWorkflowStatus} = useWorkflowStatus();

    // Vérifier si l'adresse est connectée et existe dans la table des votants
  const isVoter = isConnected && voterTable.some(voter => voter.address === address);

  return (
    <div>
      {isVoter ? (
        <>
          {workflowStatus.length === 1 && <AddProposal />}
          {workflowStatus.length === 3 && <AddVote />}
          {workflowStatus.length !== 1 && workflowStatus.length !== 3 && <Finished />}
        </>
      ) : (
         <NotAllowed />
      )}
    </div>
  )
}

export default Voter;