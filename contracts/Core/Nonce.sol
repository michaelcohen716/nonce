pragma solidity ^0.4.24;

import "./ERC721XToken.sol";
import "../Helpers/Ownable.sol";

contract Nonce is ERC721XToken, Ownable {
    function name() external view returns (string) {
        return "Nonce";
    }

    mapping(uint => uint) internal tokenIdToSupply;
    mapping(uint => address) public tokenIdToOwner;
    mapping(uint => bytes32) public tokenIdToName;
    mapping(uint => uint) public tokenIdToPrice;

    function individualSupply(uint _tokenId) public view returns (uint) {
        return tokenIdToSupply[_tokenId];
    }

    /**
     * @dev Creates a new unique token, controlled by the creator
     * @param _tokenName
     * @param _supply Maximum quantity of token available [Enter '0' for unlimited supply token]
     * @param _priceInGwei Price for other users to buy token [Enter '0' for free token]
     */
    function mintToken(bytes32 _tokenName, uint _supply, uint _priceInGwei) public {
        uint tokenId = uint(keccak256(abi.encodePacked(msg.sender, _tokenName, block.number)));
        require(!exists(tokenId), "Error: Tried to mint duplicate token id");
        _mint(tokenId, msg.sender, _supply);
        tokenIdToSupply[tokenId] = _supply;
        tokenIdToOwner[tokenId] = msg.sender;
        tokenIdToName[tokenId] = _tokenName;
        tokenIdToPrice[tokenId] = _priceInGwei;
    }



}