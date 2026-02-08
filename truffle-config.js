require('dotenv').config({ path: './.env.development' });
const HDWalletProvider = require("@truffle/hdwallet-provider");

console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);
console.log("INFURA_PROJECT_ID:", process.env.INFURA_PROJECT_ID);

module.exports = {
  contracts_build_directory: "./public/contracts",

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "1337",
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY],
          providerOrUrl: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        }),
      network_id: 11155111,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  compilers: {
    solc: {
      version: "0.8.4",
    },
  },
};
