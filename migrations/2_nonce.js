var Nonce = artifacts.require('./Nonce.sol')
var AccountRegistry = artifacts.require('./AccountRegistry.sol')

module.exports = function(deployer, network) {
  if (network === 'rinkeby') {
    return
  }

  deployer.deploy(AccountRegistry).then(function() {
    return deployer.deploy(Nonce, AccountRegistry.address)
  })
}