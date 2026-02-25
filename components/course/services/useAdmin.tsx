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

  const enableDisableStatusContract = async () => {
    try {
      const result = await hooks.useAccount();
      const isStopped = await contract.methods.isStopped().call();
      if (!isStopped) {
        await contract.methods.stopContract().send({ from: result.account[0] });
      } else {
        await contract.methods
          .resumeContract()
          .send({ from: result.account[0] });
      }
      const updatedStatus = await contract.methods.isStopped().call();
      return { status: true, stopped: updatedStatus };
    } catch (e: any) {
      return { status: false, error: e?.error.message };
    }
  };

  const withdrawSome = async (amount) => {
    try {
      debugger;
      const balanceWeiStr = await web3.eth.getBalance(contract.options.address);
      const balanceWei = BigInt(balanceWeiStr);

      const amountWei = web3.utils.toWei(amount.toString(), "wei");

      if (BigInt(balanceWei) < BigInt(amountWei)) {
        return { status: false, error: "Insufficient contract balance!" };
      }

      // proceed to call withdraw
      const account = (await hooks.useAccount()).account[0];
      await contract.methods.withdraw(amountWei).send({ from: account });

      return { status: true };
    } catch (error) {
      return { status: false, error: "Withdraw error" };
    }
  };

  const withdrawAllAndShutdown = async () => {
    debugger;
    try {
      const result = await hooks.useAccount();

      await contract.methods.shutdown().send({ from: result.account[0] });
    } catch (e: any) {
      alert(`error: ${e.error.message}`);
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
      return { status: false, owner: newAddress, error: e?.error.message };
    }
  };

  return {
    setNewOwner,
    getOwner,
    getStatusContract,
    enableDisableStatusContract,
    withdrawSome,
    withdrawAllAndShutdown,
  };
}
