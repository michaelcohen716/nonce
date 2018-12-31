pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

// Deployed to mainnet/Rinkeby
contract NonceRinkebyToken is ERC721Token{
    constructor() ERC721Token("Nonce", "NONCE") public {
        // No constructor logic beyond initialization
    }

    function mint(uint256 _uid) public {
        _mint(msg.sender, _uid);
    }

    function depositToGateway(address _gateway, uint256 _uid) public {
        safeTransferFrom(msg.sender, _gateway, _uid);
    }
}
