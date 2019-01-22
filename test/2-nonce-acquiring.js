const web3 = require('web3')
const truffleAssert = require('truffle-assertions')
const Nonce = artifacts.require('Nonce')
const AccountRegistry = artifacts.require('AccountRegistry')

contract('Nonce', async accounts => {
  let nonce, accountRegistry
  const [alice, bob, christina] = accounts

  before(async () => {
    accountRegistry = await AccountRegistry.deployed()
    nonce = await Nonce.deployed(accountRegistry.address)

    await accountRegistry.createIdentity({ from: alice })
    await accountRegistry.createIdentity({ from: bob })
  })

  it('Should let a user acquire a free token', async () => {
    await nonce.mintToken(web3.utils.fromAscii('FreeToken'), 100, 0, {
      from: alice,
    })

    let tokenId = await nonce.getTokenIdByIndex(0)
    tokenId = tokenId.toString()

    const numTokens = 1
    const tx = await nonce.acquireToken(tokenId, numTokens, { from: bob })

    truffleAssert.eventEmitted(tx, 'TokenAwarded', async ev => {
      return ev.claimer === bob && ev['0'].toString() === tokenId
    })
  })

  it('Should let a user acquire a non-free token', async () => {
    const price = web3.utils.toWei('0.5', 'ether').toString()
    await nonce.mintToken(web3.utils.fromAscii('ExpensiveToken'), 100, price, {
      from: alice,
    })

    let tokenId = await nonce.getTokenIdByIndex(1)
    tokenId = tokenId.toString()

    const numTokens = 1
    const tx = await nonce.acquireToken(tokenId, numTokens, {
      from: bob,
      value: price,
    })

    truffleAssert.eventEmitted(tx, 'TokenAwarded', async ev => {
      return ev.claimer === bob && ev['0'].toString() === tokenId
    })
  })

  it('Should decrement available supply when a fixed supply token is acquired', async () => {
    const supply = 100
    await nonce.mintToken(web3.utils.fromAscii('FixedSupplyToken'), supply, 0, {
      from: alice,
    })

    let tokenId = await nonce.getTokenIdByIndex(2)
    tokenId = tokenId.toString()

    const oldSupply = await nonce.getAvailableSupply(tokenId)

    const numTokens = 1
    await nonce.acquireToken(tokenId, numTokens, { from: bob })

    const newSupply = await nonce.getAvailableSupply(tokenId)

    assert.equal(oldSupply - numTokens, newSupply)
  })

  it('Should not let a user acquire a fixed supply token with less than available quantity', async () => {
    const supply = 2
    await nonce.mintToken(
      web3.utils.fromAscii('LimitedFixedSupplyToken'),
      supply,
      0,
      { from: alice }
    )

    let tokenId = await nonce.getTokenIdByIndex(3)
    tokenId = tokenId.toString()

    const numTokens = 3
    try {
      const tx = await nonce.acquireToken(tokenId, numTokens, { from: bob })
    } catch (error) {
      return true
    }

    assert.fail('Token quantity should prevent acquisition')
  })
})
