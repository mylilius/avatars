// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface ICommonBlock is IERC1155 {
    function createBlock(address _creator, string memory _tokenURI, uint256 _amount) external returns (uint256);
}
