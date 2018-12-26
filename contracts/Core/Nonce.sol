pragma solidity ^0.4.24;

import "./ERC721XToken.sol";

contract Nonce is ERC721XToken {
    function name() external view returns (string) {
        return "Nonce";
    }

    mapping(uint => uint) internal tokenIdToIndividualSupply;

}