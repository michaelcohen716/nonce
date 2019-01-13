const web3 = require('web3')
const truffleAssert = require('truffle-assertions')
const Nonce = artifacts.require('Nonce')

contract('Nonce', async accounts => {
  let nonce
  const [alice, bob, christina] = accounts

  before(async () => {
    nonce = await Nonce.deployed()
  })

  it('Should have an address for Nonce', async () => {
    assert(nonce.address)
  })

  it('Should be able to mint a free token with minter as creator', async () => {
    const tx = await nonce.mintToken(
      web3.utils.fromAscii('FreeToken'),
      100,
      0,
      { from: alice }
    )

    truffleAssert.eventEmitted(tx, 'TokenMinted', async ev => {
      return ev.creator === alice
    })
  })

  it('Should be able to mint a free token with limited supply', async () => {
    const tx2 = await nonce.mintToken(
      web3.utils.fromAscii('SuperFreeToken'),
      100,
      0,
      { from: bob }
    )

    truffleAssert.eventEmitted(tx2, 'TokenMinted', async ev => {
      return ev.supply === 100
    })
  })

  it('Should be able to mint a token that costs ether', async () => {
    const priceInWei = 1000000
    const tx3 = await nonce.mintToken(
      web3.utils.fromAscii('ExpensiveToken'),
      100,
      priceInWei,
      { from: christina }
    )

    truffleAssert.eventEmitted(tx3, 'TokenMinted', async ev => {
      return ev.price === priceInWei
    })
  })
})
