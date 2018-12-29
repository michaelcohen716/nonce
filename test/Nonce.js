const web3 = require("web3");
const truffleAssert = require("truffle-assertions");
const Nonce = artifacts.require('Nonce');

contract('Nonce', (accounts) => {
    let nonce;
    const [alice, bob, christina] = accounts;

    beforeEach(async () => {
        nonce = await Nonce.new();
    })

    it('Should have an address for Nonce', async () => {
        assert(nonce.address)
    });

    it('Should be able to mint a free token with minter as creator', async() => {
        const tx = await nonce.mintToken(web3.utils.fromAscii("FreeToken"), 100, 0, { from: alice });

        truffleAssert.eventEmitted(tx, 'TokenMinted', (ev) => {
            return ev.creator === alice;
        });
    })
})