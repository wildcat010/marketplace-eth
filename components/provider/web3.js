"use client";

import { createContext, useContext,useEffect, useState } from "react";
import { initializeProvider } from '@metamask/providers';
import Web3 from "web3"


const Web3Context = createContext(null)

export default function Web3Provider({children}) {
    const [web3Api, setWeb3Api] = useState({})

    useEffect(() =>{
        const loadProvider = async() =>{
            const provider = await detectEthereumProvider();
            if(provider){
                console.log("provider find")

            }else{
                console.log("provider not find")
            }
        }
        loadProvider()  
    },[]);

  return (
    <Web3Context.Provider value={{test: "Hello"}}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
}