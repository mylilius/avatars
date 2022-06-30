// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

interface IBlockLockBox {
    function addBlock(address _contractAddress, address _ownerAddress, uint256 _tokenId) external;
    function removeBlock(address _contractAddress, address _ownerAddress, uint256 _tokenId) external;
}