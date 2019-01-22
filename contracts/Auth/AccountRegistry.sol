pragma solidity 0.4.24;

import "./AddressSet.sol";

// Sign up flow:
// 1) Sign up with phone number and password (4-digit pin too?), validated with text
// 2) On text validation, save number to Firebase
// 3) On text validation, generate and save Eth keys to local storage
// 4) On key generation, invoke createIdentity, assigning userID

// Sign in flow
// 1) Enter password
//    - Recover password  
//       1) 

contract AccountRegistry {
    using AddressSet for AddressSet.Set;

    uint nextUserId = 1;

    struct Identity {
        address primaryAddress;
        AddressSet.Set secondaryAddresses;
    }

    event IdentityCreated(address indexed primaryAddress, uint indexed userId);

    mapping (uint => Identity) private identityDirectory;
    mapping (address => uint) private primaryAddressDirectory;
    mapping (address => uint) private secondaryAddressesDirectory;

    function createIdentity() public returns (uint id) {
        return createIdentity(msg.sender);
    }

    function createIdentity(address primaryAddress) private _hasIdentity(primaryAddress, false) returns (uint) {
        uint userId = nextUserId++;
        Identity storage _identity = identityDirectory[userId];

        _identity.primaryAddress = primaryAddress;
        primaryAddressDirectory[primaryAddress] = userId;

        emit IdentityCreated(msg.sender, userId);

        return userId;
    }

    function hasIdentity(address _address) public view returns (bool) {
        return identityExists(secondaryAddressesDirectory[_address]) || (primaryAddressDirectory[_address] > 0);
    }

    modifier _hasIdentity(address _address, bool check) {
        require(
            hasIdentity(_address) == check,
            check ?
                "The passed address does not have an identity but should." :
                "The passed address has an identity but should not."
        );
        _;
    }

    function identityExists(uint userId) public view returns (bool) {
        return userId < nextUserId && userId > 0;
    }

    modifier _identityExists(uint userId) {
        require(identityExists(userId), "The identity does not exist.");
        _;
    }
    
    // mapping(uint => address[]) userIdToAddress;
    // mapping(address => uint) userAddressToId;
    // mapping(bytes32 => uint) hashedNumberToId;

    // function createIdentity(uint _phoneNumber) public {
    //     require(userAddressToId[msg.sender] == 0, "Address already registered");
    //     userIdToAddress[userId++].push(msg.sender);
    //     hashedNumberToId[keccak256(abi.encodePacked(_phoneNumber))] = userId - 1;
    // }

}