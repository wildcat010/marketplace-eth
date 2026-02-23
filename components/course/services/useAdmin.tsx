import { create } from "zustand";

import { useWeb3 } from "@components/provider/web3";

export function useAdminFeatures() {
  const { web3, contract, hooks } = useWeb3();

  const getOwner = async () => {
    try {
      //get the owner
      const owner = await contract.methods.owner().call();

      return { status: "success", owner: owner };
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
        console.log("the same address");
      } else {
        const result = await hooks.useAccount(); // call the async function

        //overidde it
        await contract.methods
          .setContractOwner(newAddress)
          .send({ from: result.account[0] });

        return { status: "success", owner: newAddress };
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { setNewOwner, getOwner };
}
