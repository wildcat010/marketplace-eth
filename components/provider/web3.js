/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
const HDWalletProvider = require("@truffle/hdwallet-provider");

import { setupHooks } from "./hooks/setupHooks";

const Web3Context = createContext(null);

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        console.log("provider find");
        const web3 = new Web3(provider);
        setWeb3Api({ provider, web3, contract: null, isLoading: false });
      } else {
        console.log("provider not find, load HDwalletProvider", 1);
        const provider = new HDWalletProvider({
          privateKeys: [
            "5688e9741acf81487d7ce7c3bca4d2df243ec9ca81c8ed3e09d7b04c2a484796",
          ],
          providerOrUrl:
            "https://sepolia.infura.io/v3/13d42e71f5b149109e3abf6e83cb93e4",
        });

        const web3_2 = new Web3(provider);

        setWeb3Api({
          provider,
          web3: web3_2,
          contract: null,
          isLoading: false,
        });
        console.log("provider not find, load HDwalletProvider", 2);
      }
    };
    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    return {
      ...web3Api,
      hooks: setupHooks(web3Api.web3),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}
