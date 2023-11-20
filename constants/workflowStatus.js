'use client';
import { useEffect, useState, createContext, useContext } from 'react';
import { getViemClient, getWagmiContract, abi, contractAddress } from './index';

const ThemeContext = createContext({});

export const WorkflowStatusProvider = ({children}) => {

    
  const [workflowStatus, setWorkflowStatus] = useState([]);




  return (
    <ThemeContext.Provider value={{workflowStatus, setWorkflowStatus}}>
     {children}
     </ ThemeContext.Provider>
  );
};

//créer le hook
export const useWorkflowStatus = () => {
    return useContext(ThemeContext);
  };
