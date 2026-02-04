import { useAccount } from "./useAccount";
import { useNetwork } from "./useNetwork";

export const setupHooks = (web3) => {
  return {
    useAccount: useAccount(web3),
    useNetwork: useNetwork(web3),
  };
};
