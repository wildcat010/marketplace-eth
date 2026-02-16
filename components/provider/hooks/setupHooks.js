import { useAccount } from "./useAccount";
import { useNetwork } from "./useNetwork";
import { useOwnedCourses } from "./useOwnedCourses";
import { useCoursesByEmail } from "./useEmailToCourses"

export const setupHooks = (web3) => {
  return {
    useAccount: useAccount(web3),
    useNetwork: useNetwork(web3),
    useOwnedCourses: useOwnedCourses(web3),
    useCoursesByEmail: useCoursesByEmail(web3)
  };
};
