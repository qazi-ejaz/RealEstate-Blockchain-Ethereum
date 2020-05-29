var ERC721MintableComplete = artifacts.require('myToken');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const symbol = "QEUR";
    const name = "Shakalaka Boom Boom";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name,symbol,{from: account_one});
            for(let n = 1; n < 5; n++) {
                await this.contract.mint(accounts[n],n,{from:account_one});
            }
            // TODO: mint multiple tokens
        })

       /* it('should return full tokenURI', async function() {
            let tokenURI = await this.contract.tokenURI(0);
            console.log(tokenURI);
          })
          */
        
        it('should return total supply', async function () {
        let amount = await this.contract.totalSupply();
        assert.equal(amount.toNumber(), 4, "Incorrect token amount");
        })

        it('should get token balance', async function () {
            let balance = await this.contract.balanceOf(account_two,{from: account_one});
            assert.equal(balance.toNumber(), 1, "Incorrect token balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await this.contract.tokenURI(1,{from: account_one});
            assert.equal(uri,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1","Incorrect uri");  
        })

        it('should transfer token from one owner to another', async function () {
            //let amountTwo = await this.contract.ownerOf(1);
            //await this.contract.approve(account_three, 1, {from: account_two});
            await this.contract.transferFrom(account_two, account_three, 1, {from: account_two});
            amount = await this.contract.ownerOf(1);
            assert.equal(amount,account_three,"Owner should be third account");  
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name,symbol,{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            try{
                let status = await this.contract.mint(account_two,8,{from:account_two});
              }catch{
              }
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract._owner.call({from: account_one});
            assert.equal(owner, account_one,"Owner should be account 1");
        })

    });
})