// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
var solnSquareContract = artifacts.require('SoInSquareVerifier');
var verifierContract = artifacts.require("SquareVerifier");
var proofJson = require("./proof");


contract('znsnarks_verifier', accounts => {

  const account_one = accounts[0];
  const account_two = accounts[1];
  const symbol = "QEUR";
  const name = "Shakalaka Boom Boom";
  const uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";


  describe('Test if a new function can be added to the contract', function () {
    beforeEach(async function () {
      const verifier = await verifierContract.new({ from: account_one });
      this.contract = await solnSquareContract.new(verifier.address, name, symbol, { from: account_one });
    })

    it('Test add new function', async function () {
      //let result = await this.contract.addSolution(proofJson.proof.a,proofJson.proof.b,proofJson.proof.c,proofJson.inputs,{from:account_two});
      //assert.equal(result.logs[0].args[1], account_two,"Added function address must be same as senders adddress");
      let isAdd = true;
      try {
        await this.contract.CanMintToken(account_two, 2, proofJson.proof.a, proofJson.proof.b, proofJson.proof.c, proofJson.inputs, { from: account_one });
        //let second = await this.contract.addSolution(proofJson.proof.a,proofJson.proof.b,proofJson.proof.c,proofJson.inputs,{from:account_two});
        //throw(second)
      } catch (error) {
        isAdd = false;
        //assert.equal(error.reason,"Solution already exist","2 identical solutions were dveloped");
      }
      assert.equal(isAdd, true, "Function cannot be added to the contract");
    })

    it('Test check for duplicate function before adding', async function () {
      await this.contract.CanMintToken(account_two, 2, proofJson.proof.a, proofJson.proof.b, proofJson.proof.c, proofJson.inputs, { from: account_one });
      let isAdd = true;
      try {
        await this.contract.CanMintToken(account_two, 3, proofJson.proof.a, proofJson.proof.b, proofJson.proof.c, proofJson.inputs, { from: account_one });
        //let second = await this.contract.addSolution(proofJson.proof.a,proofJson.proof.b,proofJson.proof.c,proofJson.inputs,{from:account_two});
        //throw(second)
      } catch (error) {
        isAdd = false;
        //assert.equal(error.reason,"Solution already exist","2 identical solutions were dveloped");
      }
      assert.equal(isAdd, false, "Duplicate Function cannot be added to the contract");
    })
    /* describe('Test if an ERC721 token can be minted for contract', function () {
        beforeEach(async function () {
          const verifier = await verifierContract.new({from: account_one});
          this.contract = await solnSquareContract.new(verifier.address, name, symbol, {from: account_one});
        })

       it('mintERC721', async function () {

          let result = await this.contract.addSolution(proofJson.proof.a,proofJson.proof.b,proofJson.proof.c,proofJson.inputs,{from:account_one});
          assert.equal(result.logs[0].args[1], account_one,"Solution-address doesn't match senders adddress");
          await this.contract.mintNewNFT(proofJson.inputs[0],proofproofJson.inputs[1],account_three,{from:account_one});
          let balance = await this.contract.balanceOf(account_three);
          assert.equal(parseInt(balance), 1, "Incorrect token balance");

          let uri = await this.contract.tokenURI(0,{from:account_one});
          assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/0"," Incorrect uri");
          */

    it('Test if an ERC721 token can be minted for contract', async function () {
      let isMint = true;
      try {
        await this.contract.mintToken(account_two, 2, proofJson.proof.a, proofJson.proof.b, proofJson.proof.c, proofJson.inputs, { from: account_one });
        //let second = await this.contract.addSolution(proofJson.proof.a,proofJson.proof.b,proofJson.proof.c,proofJson.inputs,{from:account_two});
        //throw(second)
      } catch (error) {
        isMint = false;
        //assert.equal(error.reason,"Solution already exist","2 identical solutions were dveloped");
      }
      assert.equal(isMint, true, "Token can't be minted to the contract");
    })

    it('Test if an ERC721 token can be forged or tampered', async function () {
      let isMint = true;
      input = [3, 1];
      try {
        await this.contract.mintToken(account_two, 2, proofJson.proof.a, proofJson.proof.b, proofJson.proof.c, input, { from: account_one });
        //let second = await this.contract.addSolution(proofJson.proof.a,proofJson.proof.b,proofJson.proof.c,proofJson.inputs,{from:account_two});
        //throw(second)
      } catch (error) {
        isMint = false;
        //assert.equal(error.reason,"Solution already exist","2 identical solutions were dveloped");
      }
      assert.equal(isMint, false, "Token can be tampered/forged while minting");
    })
  })
});