"use client";

import { useWeb3 } from "@components/provider/web3";

export function usePurchase() {
  const { web3, contract, hooks } = useWeb3();

  const purchaseCourse = async (course, email) => {
    try {
      const result = await hooks.useAccount(); // call the async function

      let hexCourseId = web3.utils.utf8ToHex(course.id);
      hexCourseId = hexCourseId.padEnd(34, "0"); // 0x + 32 chars

      const orderHash = web3.utils.soliditySha3(
        { type: "bytes16", value: hexCourseId },
        { type: "address", value: result.account[0] },
      );

      const emailHash = web3.utils.sha3(email);

      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash },
      );

      const value = web3.utils.toWei("0.01", "ether");

      await contract.methods
        .purchaseCourse(hexCourseId, proof, emailHash)
        .send({
          from: result.account[0],
          value,
        });
    } catch (err) {
      console.error("Purchase failed:", err);
      throw err;
    }
  };

  return { purchaseCourse };
}
