var Nonce = artifacts.require("./Nonce.sol");

module.exports = function (deployer, network) {
    if (network === 'rinkeby') {
        return
    }

    deployer.then(async () => {
        await deployer.deploy(Nonce)
        const nonceInstance = await Nonce.deployed();

        console.log('\n*************************************************************************\n')
        console.log(`Nonce Contract Address: ${nonceInstance.address}`)
    })

    deployer.deploy(Nonce);
};