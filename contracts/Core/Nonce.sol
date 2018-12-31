pragma solidity ^0.4.24;

import "./ERC721X/ERC721XToken.sol";
import "../Helpers/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

// Deployed to extdev
contract Nonce is ERC721XToken, Ownable {
    function name() external view returns (string) {
        return "Nonce";
    }

    function symbol() external view returns (string) {
        return "NONCE";
    }

    mapping(uint => uint) internal tokenIdToSupply;
    mapping(uint => address) public tokenIdToOwner;
    mapping(uint => bytes32) public tokenIdToName;
    mapping(uint => uint) public tokenIdToPrice;

    event TokenMinted(address indexed creator, uint tokenId);
    event TokenAwarded(uint indexed tokenId, address claimer, uint amount);

    function individualSupply(uint _tokenId) public view returns (uint) {
        return tokenIdToSupply[_tokenId];
    }

    /** @dev future implementation of transfer gateway
     * address public gateway; 
     * constructor(address _gateway) public{
     *   gateway = _gateway;
     * }
    */

    mapping(uint => uint) internal nftTokenIdToMouldId;
    uint nftTokenIdIndex = 1000000;

    /**
     * @dev Creates a new unique token, controlled by the creator
     * @param _tokenName Name given to token by creator
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
        
        emit TokenMinted(msg.sender, tokenId);
    }

    /**
     * @dev Assigns a token to purchaser/acquirer
     * @param _tokenId tokenId
     * @param _amount quantity of tokens purchased/acquired
     */
    function acquireToken(uint _tokenId, uint _amount) public payable { 
        require(exists(_tokenId), "TokenID has not been minted"); 
        require(msg.value == tokenIdToPrice[_tokenId], "Incorrect price for token");
        require(msg.sender != tokenIdToOwner[_tokenId], "Can't buy your own token");

        if (individualSupply(_tokenId) > 0) { // Fixed supply token
            require(_amount <= balanceOf(msg.sender, _tokenId), "Quantity greater than available balance"); //DOES THIS WORK
            _updateTokenBalance(address(this), _tokenId, _amount, ObjectLib.Operations.SUB); 
        } 
        _updateTokenBalance(msg.sender, _tokenId, _amount, ObjectLib.Operations.ADD); 
        emit TokenAwarded(_tokenId, msg.sender, _amount); 
    }

     /**
     * @dev Converts token to NFT with unique ID in order to comply with ERC721 standard on main chain
     * @param _tokenId tokenId
     * @param _amount quantity of tokens to be converted
     */
    function convertToNFT(uint _tokenId, uint _amount) public {
        require(tokenType[_tokenId] == FT, "Already a NFT");
        require(_amount <= balanceOf(msg.sender, _tokenId), "You do not own enough tokens");
        _updateTokenBalance(msg.sender, _tokenId, _amount, ObjectLib.Operations.SUB);
        for (uint i = 0; i < _amount; i++) {
            _mint(nftTokenIdIndex, msg.sender);
            nftTokenIdToMouldId[nftTokenIdIndex] = _tokenId;
            nftTokenIdIndex++;
        }
    }

     /**
     * @dev Converts token back to FT using unique ID to recontextualize ERC721X token in PlasmaChain environment
     * @param _tokenId tokenId
     */
    function convertToFT(uint _tokenId) public {
        require(tokenType[_tokenId] == NFT, "Token must be an NFT");
        require(ownerOf(_tokenId) == msg.sender, "You do not own this token");
        _updateTokenBalance(msg.sender, _tokenId, 0, ObjectLib.Operations.REPLACE);
        _updateTokenBalance(msg.sender, nftTokenIdToMouldId[_tokenId], 1, ObjectLib.Operations.ADD);
        emit TransferWithQuantity(address(this), msg.sender, nftTokenIdToMouldId[_tokenId], 1);
    }


}