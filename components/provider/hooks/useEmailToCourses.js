
export const useCoursesByEmail = (web3) => async () => {
  if (!web3 && !web3.contract) {
    return;
  }
  let req;
 
  try {
    const emailHash = web3.web3.utils.sha3("test@gmail.com");

    req = await web3.contract.methods.getCoursesByEmail(emailHash).call();
  } catch (err) {
    console.log("error:", err);
  }

  if (req) {
    return {
      coursesByEmail: req
    };
  }
};
