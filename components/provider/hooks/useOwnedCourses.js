export const useOwnedCourses = (web3) => async () => {
  if (!web3 && !web3.contract) {
    return;
  }

  let req;

  try {
    console.log("web3:", web3);
    console.log("web3.contract:", web3.contract);
    req = await web3.contract.methods.totalOwnedCourses().call();
    console.log("req:", req);
  } catch (err) {
    console.log("error:", err);
  }

  if (req) {
    return {
      ownedCourses: req,
    };
  }
};
