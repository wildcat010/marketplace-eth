export const useAccount = (web3) => async () => {
  let req;
  let eth;
  try {
    if (web3.provider.request) {
      req = await web3Api.provider.request({
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

  return {
    account: req,
    balance: eth,
  };
};
