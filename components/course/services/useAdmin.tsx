import { create } from "zustand";

import { useWeb3 } from "@components/provider/web3";

export function useAdminFeatures() {
  const { web3, contract, hooks } = useWeb3();

  const getOwner = async () => {
    try {
      //get the owner
      const owner = await contract.methods.owner().call();

      return { status: true, owner: owner };
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusContract = async () => {
    try {
      //get the contract flag
      const isStopped = await contract.methods.isStopped().call();

      return { status: true, stopped: isStopped };
    } catch (e) {
      console.error(e);
    }
  };

  const setNewOwner = async (newAddress) => {
    try {
      //get the owner
      const owner = await contract.methods.owner().call();

      //check if not the same address
      if (newAddress == owner) {
        return { status: false, error: "same address", owner: newAddress };
      } else {
        const result = await hooks.useAccount(); // call the async function

        //overidde it
        await contract.methods
          .setContractOwner(newAddress)
          .send({ from: result.account[0] });
        return { status: true, owner: newAddress, error: "" };
      }
    } catch (e: any) {
      return { status: true, owner: newAddress, error: e.message };
    }
  };

  return { setNewOwner, getOwner, getStatusContract };
}
