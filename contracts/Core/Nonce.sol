pragma solidity ^0.4.24;

import "./ERC721X/ERC721XToken.sol";
import "../Helpers/Ownable.sol";
// import "../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "../Auth/AccountRegistryInterface.sol";

// Deployed to extdev
contract Nonce is ERC721XToken, Ownable {
    function name() external view returns (string) {
        return "Nonce";
    }

    function symbol() external view returns (string) {
        return "NONCE";
    }

    bool hello = false;

    function sayHello() public {
        hello = true;
    }

    AccountRegistryInterface accountRegistry;

    mapping(uint => uint) public tokenIdToIndex;
    mapping(uint => uint) public tokenIdToAvailableSupply;

    struct NonceToken {
        uint tokenId;
        bytes32 name;
        address creator;
        uint supply;
        uint price;
    }

    NonceToken[] public allNonceTokens;

    event TokenMinted(address indexed creator, uint tokenId, uint supply);
    event TokenAwarded(uint indexed tokenId, address claimer, uint amount);

    /** @dev future implementation of transfer gateway
     * address public gateway; 
     * constructor(address _gateway) public{
     *   gateway = _gateway;
     * }
    */

    constructor (address accountRegistryAddress) public {
        accountRegistry = AccountRegistryInterface(accountRegistryAddress);
    }

    modifier ensureRegisteredAddress(address _address){
        require(accountRegistry.hasIdentity(_address), "Address not registered");
        _;
    }

    mapping(uint => uint) internal nftTokenIdToMouldId;
    uint nftTokenIdIndex = 1000000;

    /**
     * @dev Creates a new unique token, controlled by the creator
     * @param _tokenName Name given to token by creator
     * @param _supply Maximum quantity of token available [Enter '0' for unlimited supply token]
     * @param _price Price for other users to buy token [Enter '0' for free token]
     */
    function mintToken(bytes32 _tokenName, uint _supply, uint _price) public ensureRegisteredAddress(msg.sender) {
        uint tokenId = uint(keccak256(abi.encodePacked(msg.sender, _tokenName, block.number)));
        require(!exists(tokenId), "Error: Tried to mint duplicate token id");

        uint tokenIndex = allNonceTokens.push(
            NonceToken(
                tokenId, 
                _tokenName, 
                msg.sender, 
                _supply, 
                _price
                )
            ) - 1;
        tokenIdToIndex[tokenId] = tokenIndex;
        tokenIdToAvailableSupply[tokenId] = _supply;

        _mint(tokenId, msg.sender, _supply);
        emit TokenMinted(msg.sender, tokenId, _supply);
    }

    /**
     * @dev Assigns a token to purchaser/acquirer
     * @param _tokenId tokenId
     * @param _amount quantity of tokens purchased/acquired
     */
    function acquireToken(uint _tokenId, uint _amount) public payable ensureRegisteredAddress(msg.sender) { 
        (, , address tokenOwner, uint supply, uint price) = getTokenWithId(_tokenId);
        require(exists(_tokenId), "TokenID has not been minted"); 
        require(msg.value == price, "Incorrect price for token");
        require(msg.sender != tokenOwner, "Can't buy your own token");

        if (supply > 0) { // Fixed supply token
            require(_amount <= balanceOf(tokenOwner, _tokenId), "Quantity greater than available balance"); //DOES THIS WORK
            _updateTokenBalance(tokenOwner, _tokenId, _amount, ObjectLib.Operations.SUB); 
            tokenIdToAvailableSupply[_tokenId] -= _amount;
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


    /** 
    * @dev utilities    
    */
    function getTokenWithIndex(uint _index) public view returns(uint, bytes32, address, uint, uint){
        return (
            allNonceTokens[_index].tokenId,
            allNonceTokens[_index].name,
            allNonceTokens[_index].creator,
            allNonceTokens[_index].supply,
            allNonceTokens[_index].price
        );
    }

    function getTokenWithId(uint _tokenId) public view returns(uint tokenId, bytes32 tokenName, address creator, uint supply, uint price){
        uint _index = tokenIdToIndex[_tokenId];
        return (
            allNonceTokens[_index].tokenId,
            allNonceTokens[_index].name,
            allNonceTokens[_index].creator,
            allNonceTokens[_index].supply,
            allNonceTokens[_index].price
        );
    }

    function getTokenIdByIndex(uint _index) public view returns(uint) {
        return allNonceTokens[_index].tokenId;
    }

    function getTokenPriceByIndex(uint _index) public view returns(uint) {
        return allNonceTokens[_index].price;
    }

    function getAvailableSupply(uint _tokenId) public view returns(uint) {
        return tokenIdToAvailableSupply[_tokenId];
    }


}