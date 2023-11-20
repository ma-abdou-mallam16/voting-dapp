'use client';
import { useEffect, useState, createContext, useContext } from 'react';

const ThemeContext = createContext({});

export const ProposalTableProvider = ({children}) => {

    
    const [proposalTable, setProposalTable] = useState([{id: 0, description: 'GENESIS', voteCount: 0}]);


  return (
    <ThemeContext.Provider value={{proposalTable, setProposalTable}}>
     {children}
     </ThemeContext.Provider>
  );
};

//créer le hook
export const useProposalTableStatus = () => {
    return useContext(ThemeContext);
  };