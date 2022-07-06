// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IAvatar.sol";

/**
*
* Token Types
* 1 => Head
* 2 => Body
* 3 => Right Leg
* 4 => Left Leg
* 5 = Hat
* 6 = Right Shoe
* 7 = Left Shoe
* 8 = Glasses
* 9 = Background
* 10 = Full Body
* 11 = Full 3D Avatar
*/


/// @title Avatar
/// @author TheGreatAxios
/// @notice This contract represents the actual DOT Avatar
contract Avatar is IAvatar, Ownable {

    /// @notice Locks All Changes
    bool private isLockEnabled;
    /// @notice Locks Movement of Assets
    bool private isAssetLockEnabled;
    /// @notice Current Render is Full Body
    bool private isBlockedBasedEnabled;
    /// @notice Backaground Enabled
    bool private isBackgroundEnabled;
    /// @notice 3D Avatars
    bool private is3DAvatarEnabled;
    /// @notice Show Balance
    bool private isShowBalanceEnabled;
    /// @notice Custom Color Palette
    bool private isCustomColorPaletteEnabled;
    /// @notice Avatar Sized - [0-7, smallest, to largest - Default = 4]
    uint8 private avatarSize;

    /// @notice Head Block
    BuildingBlock private head;
    /// @notice Body Block
    BuildingBlock private body;
    /// @notice Right Leg Block
    BuildingBlock private rightLeg;
    /// @notice LeftLeg Block
    BuildingBlock private leftLeg;
    /// @notice Full Body Block
    BuildingBlock private hat;
    /// @notice Full Body Block
    BuildingBlock private rightShoe;
    /// @notice Full Body Block
    BuildingBlock private leftShoe;
    /// @notice Full Body Block
    BuildingBlock private glasses;

    /// @notice Background
    BuildingBlock private background;
    /// @notice Full Body
    BuildingBlock private fullBody;
    /// @notice 3D Avatar Block
    BuildingBlock private fullBody3D;
    /// @notice Personal Color Palette
    ColorPalette private colorPalette;


    /// @dev Constructor sets ownership
    /// @param _creator address of owner
    constructor(address _creator) {
        transferOwnership(_creator);
        isLockEnabled = false;
        isAssetLockEnabled = false;
        isBlockedBasedEnabled = true;
        isBackgroundEnabled = false;
        is3DAvatarEnabled = false;
        isShowBalanceEnabled = false;
        isCustomColorPaletteEnabled = false;
        avatarSize = 4;
    }

    /********************************/
    /****** Owner Functions ********/
    /********************************/

    /// @dev Adds Building Block to Avatar
    /// @param _chainId Chain ID of Block
    /// @param _contractAddress Contract Address on Chain ID
    /// @param _tokenId Token ID in Contract
    /// @param _tokenType Contract Type 721/1155
    /// @param _tokenURI string
    function addBuildingBlock(
        uint256 _chainId,
        uint256 _tokenId,
        uint16 _tokenType,
        address _contractAddress,
        string memory _tokenURI
    ) external override {
        BuildingBlock memory _newBlock = BuildingBlock(
            _chainId,
            _tokenId,
            _tokenType,
            _contractAddress,
            true,
            _tokenURI
        );
        _setBuildingBlock(_newBlock);
    }

    /// @notice Auto Sets to Enabled
    /// @dev Adds Custom Color Palette to Avatar
    /// @param _background number
    /// @param _text number
    function addColorPalette(uint256 _background, uint256 _text) external onlyOwner override {
        ColorPalette memory _palette = ColorPalette(_background, _text, true);
        _setColorPalette(_palette);
    }

    /// @dev Deletes Avatar Completley
    function deleteAvatar() external override onlyOwner {
        selfdestruct(payable(owner()));
    }

    /// @dev Deletes Block
    /// @param _tokenType This is the block type
    function deleteBlock(uint16 _tokenType) external onlyOwner override {
        if (_tokenType == 1) delete head;
        if (_tokenType == 2) delete body;
        if (_tokenType == 3) delete rightLeg;
        if (_tokenType == 4) delete leftLeg;
        if (_tokenType == 5) delete hat;
        if (_tokenType == 6) delete rightShoe;
        if (_tokenType == 7) delete leftShoe;
        if (_tokenType == 8) delete glasses;
        if (_tokenType == 9) delete background;
        if (_tokenType == 10) delete fullBody;
        if (_tokenType == 11) delete fullBody3D;
    }

    /// @dev Returns Blocks of Avatar - Temp til Full Build is Done
    /// @return Block[] memory all of the blocks making up the body
    function getAvatar() external view override returns (BuildingBlock[] memory, ColorPalette memory, uint8) {
        if (!isBlockedBasedEnabled) {
            BuildingBlock[] memory _blocks = new BuildingBlock[](2);
            if (is3DAvatarEnabled) {
                _blocks[0] = fullBody;
                _blocks[1] = background;
            } else {
                _blocks[0] = fullBody3D;
                _blocks[1] = background;
            }
            return (_blocks, colorPalette, avatarSize);
        } else {
            BuildingBlock[] memory _blocks = new BuildingBlock[](9);
            _blocks[0] = head;
            _blocks[1] = body;
            _blocks[2] = rightLeg;
            _blocks[3] = leftLeg;
            _blocks[4] = hat;
            _blocks[5] = rightShoe;
            _blocks[6] = leftShoe;
            _blocks[7] = glasses;
            _blocks[8] = background;
            return (_blocks, colorPalette, avatarSize);
        }
    }

    function toggleAssetLock(bool _toggle) external onlyOwner override {
        _toggleAssetLock(_toggle);
    }
    function toggleBackground(bool _toggle) external onlyOwner override {
        _toggleBackground(_toggle);
    }
    function toggleBlockBased(bool _toggle) external onlyOwner override {
        _toggleBlockBased(_toggle);
    }
    function toggleColorPalette(bool _toggle) external onlyOwner override {
        _toggleColorPalette(_toggle);
    }
    function toggleLock(bool _toggle) external onlyOwner override {
        _toggleLock(_toggle);
    }
    function toggleShowBalance(bool _toggle) external onlyOwner override {
        _toggleShowBalance(_toggle);
    }
    function toggle3DAvatar(bool _toggle) external onlyOwner override {
        _toggle3DAvatar(_toggle);
    }

    /**********************************/
    /******* Internal Functions *******/
    /**********************************/
    function _setBuildingBlock(BuildingBlock memory _newBlock) internal {
        if (_newBlock.tokenType == 1) head = _newBlock;
        if (_newBlock.tokenType == 2) body = _newBlock;
        if (_newBlock.tokenType == 3) rightLeg = _newBlock;
        if (_newBlock.tokenType == 4) leftLeg = _newBlock;
        if (_newBlock.tokenType == 5) hat = _newBlock;
        if (_newBlock.tokenType == 6) rightShoe = _newBlock;
        if (_newBlock.tokenType == 7) leftShoe = _newBlock;
        if (_newBlock.tokenType == 8) glasses = _newBlock;
        if (_newBlock.tokenType == 9) {
            background = _newBlock;
            _toggleBackground(true);
        }
        if (_newBlock.tokenType == 10) {
            fullBody = _newBlock;
            _toggleBlockBased(false);
            _toggle3DAvatar(false);
        }
        if (_newBlock.tokenType == 11) {
            fullBody3D = _newBlock;
            _toggleBlockBased(false);
            _toggle3DAvatar(true);
        }
        if (_newBlock.tokenType <= 8) {
            _toggleBlockBased(true);
            _toggle3DAvatar(false);
        }
    }

    // function _setGeneralBlock(GeneralBlock memory _newBlock) internal {
        
    // }

    function _setColorPalette(ColorPalette memory _colorPalette) internal {
        colorPalette = _colorPalette;
        _toggleColorPalette(true);
    }

    function _toggleAssetLock(bool _toggle) internal {
        isAssetLockEnabled = _toggle;
    }
    function _toggleBackground(bool _toggle) internal {
        isBackgroundEnabled = _toggle;
    }
    function _toggleBlockBased(bool _toggle) internal {
        isBlockedBasedEnabled = _toggle;
    }
    function _toggleColorPalette(bool _toggle) internal {
        isCustomColorPaletteEnabled = _toggle;
    }
    function _toggleLock(bool _toggle) internal {
        isLockEnabled = _toggle;
    }
    function _toggleShowBalance(bool _toggle) internal {
        isShowBalanceEnabled = _toggle;
    }
    function _toggle3DAvatar(bool _toggle) internal {
        is3DAvatarEnabled = _toggle;
    }
}