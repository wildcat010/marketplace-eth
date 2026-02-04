const isAdmin = (address) => {
  if (
    address &&
    address ==
      "0x5c45b75dea48eae47eabed390ff9c6461ed50129edcb603fb12f223a3fa0933a"
  ) {
    return true;
  } else {
    return false;
  }
};

export const useAccount = (web3) => async () => {
  if (!web3) {
    return;
  }
  let req;
  let eth;
  try {
    if (web3 && web3.provider && web3.provider.request) {
      req = await web3.provider.request({
        method: "eth_requestAccounts",
      });
    } else {
      req = await web3.eth.getAccounts();
    }
    const wei = await web3.eth.getBalance(req[0]);
    eth = web3.utils.fromWei(wei, "ether");
  } catch (err) {
    console.error("connect error:", err);
  }

  if (req && req[0]) {
    return {
      account: req,
      balance: eth,
      isAdmin: isAdmin(web3.utils.keccak256(req[0])),
    };
  }
};
