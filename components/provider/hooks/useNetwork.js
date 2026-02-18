const NETWORKS = {
  1: "mainnet",
  5: "goerli",
  11155111: "sepolia",
  137: "polygon",
  80001: "mumbai",
  1337: "Ganache Local"
};

export const useNetwork = (web3) => async () => {
  if (!web3) {
    return;
  }
  let req;
  try {
    if (web3.provider && web3.provider.request) {
      req = await web3.web3.provider.request({
        method: "eth_chainId",
      });
    } else {
      req = await web3.web3.eth.net.getId();
    }
  } catch (err) {
    console.error("connect error:", err);
  }

  if (req) {
    const chainId = typeof req === "string" ? parseInt(req, 16) : req;

    return {
      network: NETWORKS[chainId],
      isValidNetwork: chainId in NETWORKS,
    };
  }
};
