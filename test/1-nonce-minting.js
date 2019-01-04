const web3 = require("web3");
const truffleAssert = require("truffle-assertions");
const Nonce = artifacts.require('Nonce');

contract('Nonce', async(accounts) => {
    let nonce;
    const [alice, bob, christina] = accounts;

    before(async () => {
        nonce = await Nonce.deployed();
    })
    
    it('Should have an address for Nonce', async () => {
        assert(nonce.address)
    });
    
    it('Should be able to mint a free token with minter as creator', async() => {
        const tx = await nonce.mintToken(web3.utils.fromAscii("FreeToken"), 100, 0, { from: alice });
        
        truffleAssert.eventEmitted(tx, 'TokenMinted', async(ev) => {
            return ev.creator === alice;
        });
    })
    
    it('Should be able to mint a free token with limited supply', async () => {
        const tx2 = await nonce.mintToken(web3.utils.fromAscii("SuperFreeToken"), 100, 0, { from: bob });

        truffleAssert.eventEmitted(tx2, 'TokenMinted', async(ev) => {
            return ev.supply === 100;
        });
    })
})