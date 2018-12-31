const NonceRinkebyToken = artifacts.require('./NonceRinkebyToken.sol')

module.exports = function (deployer, network, accounts) {
  if (network !== 'rinkeby') {
    return
  }

  deployer.then(async () => {
    await deployer.deploy(NonceRinkebyToken)
    const nonceInstance = await NonceRinkebyToken.deployed()
        
    console.log('\n*************************************************************************\n')
    console.log(`NonceRinkebyToken Contract Address: ${nonceInstance.address}`)
    console.log('\n*************************************************************************\n')
  })
}