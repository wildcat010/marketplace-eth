const { before } = require("node:test");

const courseMarketPlace = artifacts.require("CourseMarketplace");

contract("CourseMarketplace", (accounts) => {
  let contract = null;
  let contractowner = null;
  let buyer = null;

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
  });
});
