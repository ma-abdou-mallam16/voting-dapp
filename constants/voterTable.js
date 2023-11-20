'use client';
import { useState, createContext, useContext } from 'react';
import {ownerAddress} from './index'


const ThemeContext = createContext({});

export const VoterTableProvider = ({children}) => {

    
    const [voterTable, setVoterTable] = useState([]);


  return (
    <ThemeContext.Provider value={{voterTable, setVoterTable}}>
     {children}
     </ThemeContext.Provider>
  );
};

//créer le hook
export const useVoterTableStatus = () => {
    return useContext(ThemeContext);
  };