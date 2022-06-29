// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IRareBlock is IERC721 {
    function createBlock(address _creator, string memory _tokenURI) external returns (uint256);
}
