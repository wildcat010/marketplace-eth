export const loadContract = async (name, web3, network) => {
  const res = await fetch(`./contracts/${name}.json`);
  const Artifact = await res.json();
  let contract = null;

  try {
    contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[network].address,
    );
  } catch (err) {
    console.log(`Contract ${name} cannot be loaded`, err);
  }

  return contract;
};
