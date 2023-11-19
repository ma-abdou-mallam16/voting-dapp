// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Voting is Ownable {
    uint public winningProposalID;
    uint private winningProposalIDTempory;
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        bytes32 description; // Optimisation du type de données
        uint voteCount;
    }

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;
    mapping(address => Voter) public voters; // Utilisation d'un mapping
    mapping(uint => Proposal) public proposals; // Utilisation d'un mapping

    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted(address voter, uint proposalId);

    constructor() Ownable(msg.sender) {
        workflowStatus = WorkflowStatus.RegisteringVoters;
    }
    
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    modifier onlyDuringVotingSession() {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session has not started yet');
        _;
    }

    modifier onlyAfterVotingSession() {
        require(workflowStatus == WorkflowStatus.VotingSessionEnded, 'Voting session has not ended yet');
        _;
    }

    modifier onlyDuringProposalsRegistration() {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposal registration has not started yet');
        _;
    }

    modifier onlyAfterProposalsRegistration() {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Proposal registration has not ended yet');
        _;
    }

    // ::::::::::::: GETTERS ::::::::::::: //

    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }
    
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposals[_id];
    }

    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(!voters[_addr].isRegistered, 'Already registered');
    
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    function addProposal(bytes32 _desc) external onlyDuringProposalsRegistration onlyVoters {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(_desc != bytes32(0), 'You cannot propose nothing');

        uint proposalId = uint(_desc); // Utilisation de la description comme ID de proposition
        require(proposals[proposalId].description == bytes32(0), 'Proposal already exists');

        proposals[proposalId].description = _desc;
        emit ProposalRegistered(proposalId);
    }

    function setVote(uint _id) external onlyDuringVotingSession onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session haven\'t started yet');
        require(!voters[msg.sender].hasVoted, 'You have already voted');
        require(proposals[_id].description != bytes32(0), 'Proposal not found');

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposals[_id].voteCount++;

        if (proposals[_id].voteCount > proposals[winningProposalIDTempory].voteCount) {
            winningProposalIDTempory = _id;
        }

        emit Voted(msg.sender, _id);
    }

    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals can\'t be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    function endProposalsRegistration() external onlyOwner onlyDuringProposalsRegistration {
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    function startVotingSession() external onlyOwner onlyAfterProposalsRegistration {
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    function endVotingSession() external onlyOwner onlyDuringVotingSession {
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }

    function tallyVotes() external onlyOwner onlyAfterVotingSession {

        winningProposalID = winningProposalIDTempory;
       
        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}
