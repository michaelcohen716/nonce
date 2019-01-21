pragma solidity 0.4.24;

interface AccountRegistryInterface {
    function identityExists(uint userId) external view returns (bool);
    function hasIdentity(address _address) external view returns (bool);
    function getUserId(address _address) external view returns (uint userId);

    function getIdentity(uint userId) external view returns (address primaryAddress, address[] memory secondaryAddresses);
    function createIdentity(address recoveryAddress) external returns (uint userId);
}