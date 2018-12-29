var Nonce = artifacts.require("./Nonce.sol");

module.exports = function (deployer, network) {
    if (network === 'rinkeby') {
        return
    }

    deployer.deploy(Nonce);
};