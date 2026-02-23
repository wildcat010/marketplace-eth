const NETWORKS = {
  1: "mainnet",
  5: "goerli",
  11155111: "sepolia",
  137: "polygon",
  80001: "mumbai",
  1337: "Ganache Local",
};

export const useNetwork = (web3) => async () => {
  if (!web3) {
    return;
  }
  let req;
  let chainId;
  let contractBalanceWei = null;
  try {
    if (web3.provider && web3.provider.request) {
      req = await web3.web3.provider.request({
        method: "eth_chainId",
      });
    } else {
      req = await web3.web3.eth.net.getId();
    }

    chainId = typeof req === "string" ? parseInt(req, 16) : req;

    const res = await fetch("/contracts/CourseMarketplace.json");
    const MyContractArtifact = await res.json();
    const deployedNetwork = MyContractArtifact.networks[chainId.toString()];

    const contractAddress = deployedNetwork.address;

    // Contract balance
    if (contractAddress) {
      contractBalanceWei = await web3.web3.eth.getBalance(contractAddress);
      contractBalanceWei = web3.web3.utils.fromWei(contractBalanceWei, "ether");
    }
  } catch (err) {
    console.error("connect error:", err);
  }

  if (req) {
    return {
      network: NETWORKS[chainId],
      isValidNetwork: chainId in NETWORKS,
      contractBalanceWei: contractBalanceWei,
    };
  }
};
