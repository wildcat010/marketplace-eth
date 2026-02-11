/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { loadContract } from "@utils/loadContract";
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
      let provider: any = await detectEthereumProvider();

      if (provider) {
        console.log("provider find", provider);

        let web3: any = new Web3(provider);

        // Wait until provider is ready to get chainId
        const chainId = (await web3.eth.getChainId()).toString();

        const contract = await loadContract("CourseMarketplace", web3, chainId);

        setWeb3Api({ provider, web3, contract, isLoading: false });

        // Listen for account / network changes
        provider.on("accountsChanged", (accounts: string[]) => {
          setWeb3Api((prev) => ({ ...prev, web3, contract })); // just refresh state
        });

        provider.on("chainChanged", async (_chainId: string) => {
          console.log("chain changed");
          //window.location.reload(); // reload if network changes
        });
      } else {
        console.log("fallback");

        const provider = new HDWalletProvider({
          privateKeys: [
            "5688e9741acf81487d7ce7c3bca4d2df243ec9ca81c8ed3e09d7b04c2a484796",
          ],
          providerOrUrl:
            "https://sepolia.infura.io/v3/13d42e71f5b149109e3abf6e83cb93e4",
        });
        const web3_2 = new Web3(provider);

        const myChaindId = await web3_2.eth.net.getId();

        const contract = await loadContract(
          "CourseMarketplace",
          web3_2,
          myChaindId,
        );

        setWeb3Api({
          provider,
          web3: web3_2,
          contract: contract,
          isLoading: false,
        });
      }
    };
    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    return {
      ...web3Api,
      hooks: setupHooks(web3Api),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}
