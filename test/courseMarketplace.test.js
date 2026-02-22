const { before } = require("node:test");
const truffleAssert = require("truffle-assertions");

const courseMarketPlace = artifacts.require("CourseMarketplace");

contract("CourseMarketplace", (accounts) => {
  let contract = null;
  let contractOwner = null;
  let buyer = null;

  const toBN = (value) => web3.utils.toBN(value);

  const getGas = async (result) => {
    const tx = await web3.eth.getTransaction(result.tx);

    const gasUsed = toBN(result.receipt.gasUsed);
    const gasPriced = toBN(tx.gasPrice);
    const gasCost = gasUsed.mul(gasPriced); // total gas cost in wei

    return gasCost;
  };

  const bytes16ToNumber = (hex) => {
  if (!hex) return 0;

  let str = "";
  for (let i = 2; i < hex.length; i += 2) {
    // skip "0x"
    const byte = parseInt(hex.substr(i, 2), 16);
    if (byte === 0) break; // stop at null byte
    str += String.fromCharCode(byte);
  }

  return Number(str);
};

  beforeEach(async () => {
    contract = await courseMarketPlace.new(); // deploys a fresh contract for each test
    contractOwner = accounts[0];
    buyer = accounts[1];
  });

  describe("contract config", () => {
    it("should deployed the contract", () => {
      assert.ok(contract.address);
    });

    it("marks contractOwner as owner", async () => {
      const owner = await contract.owner();
      assert.equal(owner, contractOwner);
    });

    it("should transfer the owner of the contract to another account address", async () => {
      const owner = await contract.owner();
      assert.equal(owner, contractOwner);

      await contract.setContractOwner(buyer,{
        from: contractOwner
      })

      const newOwner = await contract.owner();
      assert.equal(newOwner, buyer);
    });

    it("should NOT allow buyer to transfer contract ownership", async () => {
      const owner = await contract.owner();
      assert.equal(owner, contractOwner);

      await truffleAssert.reverts(
        contract.setContractOwner(buyer, {
          from: buyer,     
        }),
        "Only manager allowed"
      );
    });



    it("should NOT allow to override with the same address the contract owner", async () => {
      const owner = await contract.owner();
      assert.equal(owner, contractOwner);

      await truffleAssert.reverts(
        contract.setContractOwner(contractOwner, {
          from: contractOwner,     
        }),
        "Same address"
      );
    });

    it("should have 0 balance initially", async () => {
      const balance = await web3.eth.getBalance(contract.address);
      assert.equal(balance, 0, "Contract balance should be 0 initially");
    });


    it("should have a balance of 1 eth on the smart contract", async () => {
      const balance = await web3.eth.getBalance(contract.address);
      assert.equal(balance, 0, "Contract balance should be 0 initially");

      const courseId = web3.utils.utf8ToHex("COURSE100");
      const proof = web3.utils.utf8ToHex("proof101");
      const emailHash = web3.utils.sha3("user@example.com");
      const price = web3.utils.toWei("1", "ether");

      await contract.purchaseCourse(courseId, proof, emailHash, {
        from: buyer,
        value: price,
      });

      const balanceAfterPurchase = await web3.eth.getBalance(contract.address);
      assert.equal(balanceAfterPurchase, web3.utils.toWei("1", "ether"), "Contract balance should be 1 eth");
    });

    

    it("should check the balance of the user before and after purchase", async () => {
      const courseId = web3.utils.utf8ToHex("COURSE100");
      const proof = web3.utils.utf8ToHex("proof101");
      const emailHash = web3.utils.sha3("user@example.com");
      const price = web3.utils.toWei("0.0001", "ether");

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
        web3.utils.toWei("0.0001", "ether"),
        "smart contract balance is not correct",
      );
    });
  });

  describe("contract behavior isStopped flag and shutdown", () => {
    it("should turn the isStopped flag to true only if you are owner of the contract",async()=>{

      const resultTransaction = await contract.stopContract({from: contractOwner});
      
      assert.equal(resultTransaction.receipt.status,true,"query should be successful")
      assert.equal(await contract.isStopped(),true,"isStopped flag should be true")
    });

    it("should not turn the isStopped flag to true only if you are owner of the contract",async()=>{

      await truffleAssert.reverts(
        contract.stopContract( {
          from: buyer,     
        }),
        "Only manager allowed"
      );
    });

    it("should not authorise a purchase if the contract is stopped",async()=>{
      const resultTransaction = await contract.stopContract({from: contractOwner});
      assert.equal(resultTransaction.receipt.status,true,"query should be successful")

      // Prepare course data
      const courseId = web3.utils.utf8ToHex("COURSE101");
      const proof = web3.utils.utf8ToHex("proof101");
      const emailHash = web3.utils.sha3("user@example.com");
      const price = web3.utils.toWei("0.0001", "ether");

      await truffleAssert.reverts(
        contract.purchaseCourse(courseId, proof, emailHash, {
          from: buyer,
          value: price,
        }),"Contract is stopped"
      );
    });

    it("should enable the contract only if you are the contract owner and revert if you are not",async()=>{
      const resultTransaction = await contract.resumeContract({from: contractOwner});
      assert.equal(resultTransaction.receipt.status,true,"query should be successful")

      assert.equal(await contract.isStopped(),false,"isStopped flag should be false")

    });

    it("should shutdown the contract, mark isStopped to true and withdraw all the money of the contract",async()=>{

      const balanceContractOwnerBeforeShutdown = await web3.eth.getBalance(contractOwner);

      // Send 0.01 ETH to contract
      const deposit = web3.utils.toWei("0.01", "ether");
      await web3.eth.sendTransaction({
        from: buyer,
        to: contract.address,
        value: deposit
      });

      const balanceSmartContract = await web3.eth.getBalance(contract.address);
      assert.equal(
        balanceSmartContract,
        web3.utils.toWei("0.01", "ether"),
        "smart contract balance is not correct",
      );

      const shutdownTransaction = await contract.shutdown({from:contractOwner});

       const gas = await getGas(shutdownTransaction);

      //contract should be stopped
      assert.equal(await contract.isStopped(),true,"isStopped flag should be true")

      const balanceSmartContractAfterShutdown = await web3.eth.getBalance(contract.address);

      //balance of the contract should be empty
      assert.equal(
        balanceSmartContractAfterShutdown,
        web3.utils.toWei("0", "ether"),
        "smart contract balance is not correct",
      );

      const balanceContractOwnerAfterShutdown = await web3.eth.getBalance(contractOwner);


      const ownerBefore = web3.utils.toBN(balanceContractOwnerBeforeShutdown);
      const ownerAfter = web3.utils.toBN(balanceContractOwnerAfterShutdown);
      const depositBN = web3.utils.toBN(web3.utils.toWei("0.01", "ether"));
      assert.equal(
        ownerAfter.sub(ownerBefore).toString(),
        depositBN.sub(gas).toString(),
        "should receive the 0.01 eth - gas"
      );

    });

    it("should not execute shutdown if you are not the manager",async()=>{
      
      await truffleAssert.reverts(
        contract.shutdown({
          from: buyer
        }),"Only manager allowed"
      );

    });

  });

  describe("Withdraw functions of the contract",()=>{
    it("should withdraw an amount availabe of the contract",async()=>{

      const balanceContractOwnerBeforeWithdraw = await web3.eth.getBalance(contractOwner);


      // Send 0.01 ETH to contract
      const deposit = web3.utils.toWei("0.01", "ether");
      await web3.eth.sendTransaction({
        from: buyer,
        to: contract.address,
        value: deposit
      });

      const transaction = await contract.withdraw(web3.utils.toWei("0.001", "ether"))

      const gas = await getGas(transaction)

      assert.equal(transaction.receipt.status,true,"transaction successfull")

      const balanceContractOwnerAfterWithdraw = await web3.eth.getBalance(contractOwner);

      const ownerBefore = web3.utils.toBN(balanceContractOwnerBeforeWithdraw);
      const ownerAfter = web3.utils.toBN(balanceContractOwnerAfterWithdraw);
      const depositBN = web3.utils.toBN(web3.utils.toWei("0.001", "ether"));
      assert.equal(
        ownerAfter.sub(ownerBefore).toString(),
        depositBN.sub(gas).toString(),
        "should receive the 0.001 eth - gas"
      );


    });

    it("should not withdraw an amount availabe of the contract",async()=>{

 
      // Send 0.01 ETH to contract
      const deposit = web3.utils.toWei("0.01", "ether");
      await web3.eth.sendTransaction({
        from: buyer,
        to: contract.address,
        value: deposit
      });

      await truffleAssert.reverts(
         contract.withdraw(web3.utils.toWei("1", "ether"))
      );

    });

    it("should withdraw all the balance from the smart contract and give it to the owner",async()=>{

      const balanceContractOwnerBeforeWithdraw = await web3.eth.getBalance(contractOwner);

        // Send 0.01 ETH to contract
      const deposit = web3.utils.toWei("0.1", "ether");
      await web3.eth.sendTransaction({
        from: buyer,
        to: contract.address,
        value: deposit
      });

      const balanceContract = await web3.eth.getBalance(contract.address);
      const depositBN = web3.utils.toBN(web3.utils.toWei("0.1", "ether"));

  
      assert.equal(
        balanceContract.toString(),
        depositBN.toString(),
        "should receive the 0.1 eth"
      );

      const withdranTransaction = await contract.withdrawAllBalance({from:contractOwner})
      assert.equal(withdranTransaction.receipt.status,true,"transaction successfull")


      const gas = await getGas(withdranTransaction)

      const balanceContractOwnerAfterWithdraw = await web3.eth.getBalance(contractOwner);

      const ownerBefore = web3.utils.toBN(balanceContractOwnerBeforeWithdraw);
      const ownerAfter = web3.utils.toBN(balanceContractOwnerAfterWithdraw);
      assert.equal(
        ownerAfter.sub(ownerBefore).toString(),
        depositBN.sub(gas).toString(),
        "should receive the 0.1 eth - gas"
      );

      const balanceContractFinal = await web3.eth.getBalance(contract.address);

      assert.equal(
        balanceContractFinal.toString(),
        web3.utils.toWei("0", "ether"),
        "should be the 0 eth"
      );


    });

    it("should not execute whithdraw if you are not the manager",async()=>{
      
      await truffleAssert.reverts(
        contract.withdraw(web3.utils.toWei("0.001", "ether"),{
          from: buyer
        }),"Only manager allowed"
      );

    });

    it("should not execute whithdrawAll if you are not the manager",async()=>{
      
      await truffleAssert.reverts(
        contract.withdrawAllBalance({
          from: buyer
        }),"Only manager allowed"
      );

    });
  });

  describe("purchase the new course", () => {
    it("should purchase a course", async () => {
      // Prepare course data
      const courseId = web3.utils.utf8ToHex("COURSE101");
      const proof = web3.utils.utf8ToHex("proof101");
      const emailHash = web3.utils.sha3("user@example.com");
      const price = web3.utils.toWei("0.0001", "ether");

      const result = await contract.purchaseCourse(courseId, proof, emailHash, {
        from: buyer,
        value: price,
      });

      assert.equal(result.receipt.status, true, "successful transaction");
    });

    it("should fail if we try to re-purchase the same course", async () => {
      const courseId = web3.utils.utf8ToHex("COURSE102");
      const proof = web3.utils.utf8ToHex("proof101");
      const emailHash = web3.utils.sha3("user@example.com");
      const price = web3.utils.toWei("0.0001", "ether");

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
  })

  describe("retrieve data", () => {
    it("should purchase 2 courses and retrieve the ",async()=>{

      const courseId = web3.utils.utf8ToHex("COURSE202");
      const proof = web3.utils.utf8ToHex("proof101");
      const emailHash = web3.utils.sha3("user1@example.com");
      const price = web3.utils.toWei("0.0001", "ether");
      // First purchase succeeds
      const first = await contract.purchaseCourse(courseId, proof, emailHash, {
        from: buyer,
        value: price,
      });
      assert.equal(first.receipt.status, true, "First purchase should succeed");


      const courseId2 = web3.utils.utf8ToHex("COURSE203");
      const proof2 = web3.utils.utf8ToHex("proof102");
      // First purchase succeeds
      const second = await contract.purchaseCourse(courseId2, proof2, emailHash, {
        from: buyer,
        value: price,
      });
      assert.equal(second.receipt.status, true, "First purchase should succeed");

      //retrieve courses
      const courses = await contract.getCoursesByEmail(emailHash)
      
      assert.equal(courses.length, 2, "First purchase should succeed");
    })

    it("should retrieve all the courses purchased",async()=>{

      //prepare array of course ID
      const IDS = ["10","11","101"]

      //1
      const courseId = web3.utils.utf8ToHex(IDS[0]);
      const proof = web3.utils.utf8ToHex("proof101");
      const emailHash = web3.utils.sha3("user1@example.com");
      const price = web3.utils.toWei("0.0001", "ether");
      // First purchase succeeds
      const first = await contract.purchaseCourse(courseId, proof, emailHash, {
        from: buyer,
        value: price,
      });
      assert.equal(first.receipt.status, true, "First purchase should succeed");

      //2
      const courseId_2 = web3.utils.utf8ToHex(IDS[1]);
      const proof_2 = web3.utils.utf8ToHex("proof102");

      // second
      const second = await contract.purchaseCourse(courseId_2, proof_2, emailHash, {
        from: buyer,
        value: price,
      });
      assert.equal(second.receipt.status, true, "second purchase should succeed");

      //3
      const courseId_3 = web3.utils.utf8ToHex(IDS[2]);
      const proof_3 = web3.utils.utf8ToHex("proof103");
      
      // third
      const third = await contract.purchaseCourse(courseId_3, proof_3, emailHash, {
        from: buyer,
        value: price,
      });
      assert.equal(third.receipt.status, true, "third purchase should succeed");


      const total = await contract.totalOwnedCourses();
      assert.equal(total, 3, "we should have 3 courses in total");

      for(let i = 0;i<total; i++){
        const courseHash = await contract.getOwnedCourseHash(i);
        const course = await contract.getOwnedCourse(courseHash);

        const courseId = bytes16ToNumber(course.courseId)

        assert.equal(courseId,IDS[i],"course id should match")
      }

    });
  });
});
