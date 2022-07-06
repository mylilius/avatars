// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

interface IAvatar {

    struct BuildingBlock {
        uint256 chainId;
        uint256 tokenId;
        uint16 tokenType;
        address contractAddress;
        bool exists;
        string tokenURI;
    }

    struct ColorPalette {
        uint256 background;
        uint256 text;
        bool exists;
    }

    function addBuildingBlock(uint256 _chainId, uint256 _tokenId, uint16 _tokenType, address _contractAddress, string memory _tokenURI) external;
    function addColorPalette(uint256 _background, uint256 _text) external;
    function deleteBlock(uint16 _tokenType) external;
    function deleteAvatar() external;
    function getAvatar() external returns (BuildingBlock[] memory, ColorPalette memory, uint8);
    function toggleAssetLock(bool _toggle) external;
    function toggleBackground(bool _toggle) external;
    function toggleBlockBased(bool _toggle) external;
    function toggleColorPalette(bool _toggle) external;
    function toggleLock(bool _toggle) external;
    function toggleShowBalance(bool _toggle) external;
    function toggle3DAvatar(bool _toggle) external;   
}