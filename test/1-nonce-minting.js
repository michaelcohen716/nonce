const web3 = require('web3')
const truffleAssert = require('truffle-assertions')
const Nonce = artifacts.require('Nonce')
const AccountRegistry = artifacts.require('AccountRegistry')
const utils = require('../test-utils/utils')

contract('Nonce', async accounts => {
  let nonce, accountRegistry, aliceUserId, bobUserId
  const [alice, bob, christina] = accounts

  before(async () => {
    accountRegistry = await AccountRegistry.deployed()
    nonce = await Nonce.deployed(accountRegistry.address)

    const aliceUserTx = await accountRegistry.createIdentity({ from: alice })
    aliceUserId = utils.grabUserIdFromTx(aliceUserTx)

    const bobeUserTx = await accountRegistry.createIdentity({ from: bob })
    bobUserId = utils.grabUserIdFromTx(bobeUserTx)
  })

  it('Should have an address for Nonce', async () => {
    assert(accountRegistry.address)
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
      { from: bob }
    )

    truffleAssert.eventEmitted(tx3, 'TokenMinted', async ev => {
      return ev.price === priceInWei
    })
  })
})
