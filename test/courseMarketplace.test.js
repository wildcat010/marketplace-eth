const { before } = require("node:test");
const truffleAssert = require("truffle-assertions");

const courseMarketPlace = artifacts.require("CourseMarketplace");

contract("CourseMarketplace", (accounts) => {
  let contract = null;
  let contractowner = null;
  let buyer = null;

  const toBN = (value) => web3.utils.toBN(value);

  const getGas = async (result) => {
    const tx = await web3.eth.getTransaction(result.tx);

    const gasUsed = toBN(result.receipt.gasUsed);
    const gasPriced = toBN(tx.gasPrice);
    const gasCost = gasUsed.mul(gasPriced); // total gas cost in wei

    return gasCost;
  };

  before(async () => {
    contract = await courseMarketPlace.deployed();

    contractowner = accounts[0];
    buyer = accounts[1];
  });

  describe("contract config", () => {
    it("should deployed the contract", () => {
      assert.ok(contract.address);
    });

    it("marks contractowner as owner", async () => {
      const owner = await contract.owner();
      assert.equal(owner, contractowner);
    });

    it("should have 0 balance initially", async () => {
      const balance = await web3.eth.getBalance(contract.address);
      assert.equal(balance, 0, "Contract balance should be 0 initially");
    });

    it("should check the balance of the user before and after purchase", async () => {
      const courseId = web3.utils.asciiToHex("COURSE100");
      const proof = web3.utils.asciiToHex("proof101");
      const emailHash = web3.utils.sha3("user@example.com");
      const price = web3.utils.toWei("1", "ether");

      const balanceBeforeBuy = await web3.eth.getBalance(buyer);

      const result = await contract.purchaseCourse(courseId, proof, emailHash, {
        from: buyer,
        value: price,
      });

      //determine price of the gas
      const gas = await getGas(result);

      const balanceAfterBuy = await web3.eth.getBalance(buyer);

      assert.equal(
        toBN(balanceBeforeBuy).sub(toBN(price)).sub(gas).toString(),
        balanceAfterBuy.toString(),
        "balance is not correct",
      );

      const balanceSmartContract = await web3.eth.getBalance(contract.address);

      assert.equal(
        balanceSmartContract,
        web3.utils.toWei("1", "ether"),
        "smart contract balance is not correct",
      );
    });
  });

  describe("purchase the new course", () => {
    it("should purchase a course", async () => {
      // Prepare course data
      const courseId = web3.utils.asciiToHex("COURSE101");
      const proof = web3.utils.asciiToHex("proof101");
      const emailHash = web3.utils.sha3("user@example.com");
      const price = web3.utils.toWei("1", "ether");

      const result = await contract.purchaseCourse(courseId, proof, emailHash, {
        from: buyer,
        value: price,
      });

      assert.equal(result.receipt.status, true, "successful transaction");
    });

    it("should fail if we try to re-purchase the same course", async () => {
      const courseId = web3.utils.asciiToHex("COURSE102");
      const proof = web3.utils.asciiToHex("proof101");
      const emailHash = web3.utils.sha3("user@example.com");
      const price = web3.utils.toWei("1", "ether");

      // First purchase succeeds
      const first = await contract.purchaseCourse(courseId, proof, emailHash, {
        from: buyer,
        value: price,
      });
      assert.equal(first.receipt.status, true, "First purchase should succeed");

      // Second purchase should revert
      await truffleAssert.reverts(
        contract.purchaseCourse(courseId, proof, emailHash, {
          from: buyer,
          value: price,
        }),
      );
    });
  });
});
