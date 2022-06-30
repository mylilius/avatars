// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

interface IAvatar {

    struct Block {
        uint256 location;
        uint256 chainId;
        address contractAddress;
        uint256 tokenId;
        uint8 tokenType;
        bool isActive;
        bool isAdded;
    }

    function setAvatarType(uint256 _type) external;
    function addAvatarBlock(uint256 _location, uint256 _chainId, address _contractAddress, uint256 _tokenId, uint8 _contractType, bool _setActive) external;
    function getAvatar() external returns (Block[] memory);
    function deleteAvatar() external;
    function getDefault() external returns (string memory);
}