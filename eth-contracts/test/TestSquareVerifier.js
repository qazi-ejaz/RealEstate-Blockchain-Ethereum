// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var verifier = artifacts.require('SquareVerifier');
var proofJson = require('./proof');
// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps
contract('Test verification', accounts => {
    const account_one = accounts[0];

    describe('Test verification with correct proof', function () {
        beforeEach(async function () {
            this.contract = await verifier.new({ from: account_one });
        })

        it('Test verification with correct proof', async function () {
            let verifyProof = await this.contract.verifyTx.call(proofJson.proof.a, proofJson.proof.b, proofJson.proof.c, proofJson.inputs, { from: account_one });
            assert.equal(verifyProof, true, "Proof test passed")
        })
        // Test verification with incorrect proof
        it('Test verification with incorrect proof', async function () {
            proofJson = {
                proof:
                {
                    a:
                        ['0x0a6443ebf4a43abb27aedfbfe85e15fcd8c584e8f98c365062718ec000b1bb87',
                            '0x1846f9e106cf63a0cf6cf01cce48e834a4e54bf1c22e82cd92b7dd3fb80fd185'],
                    b: [["0x069559dab516dcad73fc5281f8be6f51abdbbeef0a4d87852ea2d18a9dec70a6", "0x1bf8da35145352ad98ba3dff7930e4190764809da982165c017aa77c36412ebf"], ["0x060438a7c56acd273cef29c850290a4b8f91dc9ea959a70c757d133713a2bc62", "0x144acd610553d714935a8067858f17a9107d282a7bba9e017c325b25895853ce"]],
                    c:
                        ['0x072c7ea4803653064fca84ddd93e78c03263ea1e973d577cb68b27f645156ad0',
                            '0x1f9c85723c15888240e80b696b10271ce6175291de6d5cef516b39129037993e']
                },
                inputs:
                    ['0x0000000000000000000000000000000000000000000000000000000000000008',
                        '0x0000000000000000000000000000000000000000000000000000000000000003']
            };
            let verifyProof = await this.contract.verifyTx.call(proofJson.proof.a, proofJson.proof.b, proofJson.proof.c, proofJson.inputs, { from: account_one });
            assert.equal(verifyProof, false, "Proof test passed")
        })
    })
});