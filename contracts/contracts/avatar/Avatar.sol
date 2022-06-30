// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IAvatar.sol";

/// @title Avatar
/// @author TheGreatAxios
/// @notice This contract represents the actual DOT Avatar
contract Avatar is IAvatar, Ownable {

    /// @notice The Current Avatar Type
    uint256 private avatarType;
    
    /// @notice Current Render is Full Body
    bool private isFullBody = false;

    /// @notice On initial creation show default
    bool private isDefault = true;

    /// @notice Stores Extra Blocks
    mapping(uint256 => Block[]) private inventory;

    /// @notice Head Block
    Block private head;
    /// @notice Body Block
    Block private body;
    /// @notice Legs Block
    Block private legs;
    /// @notice Full Body Block
    Block private full;

    /// @dev Constructor sets ownership
    /// @param _creator address of owner
    constructor(address _creator) {
        transferOwnership(_creator);
    }


    /// @dev Sets Avatar Type --- Currnelty Not used
    /// @param _type Avatar Type is UINT256
    function setAvatarType(uint256 _type) external onlyOwner override {
        avatarType = _type;
    }

    /********************************/
    /****** Owner Functions ********/
    /********************************/

    /// @dev Adds Avatar to Block
    /// @dev V2 will use Oracle to Check Ownership on BlockBox
    /// @param _location Location on Avatar Render
    /// @param _chainId Chain ID of Block
    /// @param _contractAddress Contract Address on Chain ID
    /// @param _tokenId Token ID in Contract
    /// @param _contractType Contract Type 721/1155
    /// @param _setActive Set Active - If True -> Sets to Body Else Adds to Inventory
    function addAvatarBlock(
        uint256 _location,
        uint256 _chainId,
        address _contractAddress,
        uint256 _tokenId,
        uint8 _contractType,
        bool _setActive
    ) external override {
        Block memory _newBlock = Block(
            _location,
            _chainId,
            _contractAddress,
            _tokenId,
            _contractType,
            _setActive,
            true
        );
        if (!_setActive) {
            _addToInventory(_newBlock, _location);
        } else {
            _setAvatarBlock(_newBlock);
        }
    }

    function deleteAvatarBlock(uint256 _blockId, uint256 _slotId) external onlyOwner {
        _removeFromInventory(_blockId, _slotId);
    }

    /// @dev Deletes Avatar Completley
    function deleteAvatar() external override onlyOwner {
        selfdestruct(payable(owner()));
    }

    /// @dev Returns Blocks of Avatar - Temp til Full Build is Done
    /// @return Block[] memory all of the blocks making up the body
    function getAvatar() external view override returns (Block[] memory){
        if (isFullBody) {
            Block[] memory _blocks = new Block[](1);
            _blocks[0] = full;
            return _blocks;
        } else {
            Block[] memory _blocks = new Block[](3);
            _blocks[0] = head;
            _blocks[1] = body;
            _blocks[2] = legs;
            return _blocks;
        }
    }

    function getBlocks() external view returns (Block[] memory) {
        uint256 _length = 4 + _getInventoryLength(1) + _getInventoryLength(2) + _getInventoryLength(3) + _getInventoryLength(4);
        Block[] memory _blocks = new Block[](_length);
        uint256 index = 4;
        _blocks[0] = head;
        _blocks[1] = body;
        _blocks[2] = legs;
        _blocks[3] = full;
        for (uint256 i = 0; i < _getInventoryLength(1); i++) {
            _blocks[index] = inventory[1][i];
            index++;
        }
        for (uint256 i = 0; i < _getInventoryLength(2); i++) {
            _blocks[index] = inventory[2][i];
            index++;
        }
        for (uint256 i = 0; i < _getInventoryLength(3); i++) {
            _blocks[index] = inventory[3][i];
            index++;
        }
        for (uint256 i = 0; i < _getInventoryLength(4); i++) {
            _blocks[index] = inventory[4][i];
            index++;
        }

        return _blocks;
    }
    
    /**********************************/
    /******* Internal Functions *******/
    /**********************************/
    function _setAvatarBlock(Block memory _newBlock) internal {
        if (_newBlock.location == 1) {
            if (head.isActive) {
                _addToInventory(head, 1);
            }
            head = _newBlock;
        } else if (_newBlock.location == 2) {
            if (body.isActive) {
                _addToInventory(body, 2);
            }
            body = _newBlock;
        } else if (_newBlock.location == 3) {
            if (legs.isActive) {
                _addToInventory(legs, 3);
            }
            legs = _newBlock;
        } else if (_newBlock.location == 4) {
            if (full.isActive) {
                _addToInventory(full, 4);
            }
            full = _newBlock;
        }
    }

    /// @dev Adds Block to Inventory
    /// @param _existingBlock The New or Existing Block
    /// @param _blockId Of Part Being Added
    function _addToInventory(Block memory _existingBlock, uint256 _blockId) internal {
        uint256 _slot = _getInventoryLength(_blockId) == 0 ? 0 : _getInventoryLength(_blockId) - 1;
        inventory[_blockId][_slot] = _existingBlock;
    }

    function _removeFromInventory(uint256 _blockId, uint256 _slot) internal {
        require(inventory[_blockId][_slot].isAdded, "This Block Does Not Exist");
        delete inventory[_blockId][_slot];
    }

    /// @dev Gets Inventory Length of Type
    /// @param _blockId As stated above
    /// @return uint256 of the length
    function _getInventoryLength(uint256 _blockId) internal view returns (uint256) {
        return inventory[_blockId].length;
    }

    /********************************/
    /******* Public Functions *******/
    /********************************/
    /// @dev Returns Default Image
    /// @return string memory Default DOT Avatar
    function getDefault() external pure override returns (string memory) {
        return "";
    }


}