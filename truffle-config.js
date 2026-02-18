require("dotenv").config({ path: "./.env.development" });
const HDWalletProvider = require("@truffle/hdwallet-provider");

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
        new HDWalletProvider(
          "5688e9741acf81487d7ce7c3bca4d2df243ec9ca81c8ed3e09d7b04c2a484796",
          "https://eth-sepolia.g.alchemy.com/v2/fKAEOsW0bPfVJ-Blws3PL",
        ),
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
