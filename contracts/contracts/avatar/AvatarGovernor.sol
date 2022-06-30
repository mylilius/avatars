// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/// @title AvatarGovernor
/// @author TheGreatAxios
/// @notice Handles the Files that Are Available to Create Building Blocks
/// @dev Built for SKALE

contract AvatarGovernor is Ownable {

    uint256 private _numberBlocks = 1;

    mapping(uint256 => Contracts) private _supportedChains;
    mapping(uint256 => string) private _blocksByName;
    mapping(string => AvatarBlocks) private _availableBlocks;

    struct Contracts {
        string name;
        address manager;
        address common;
        address rare;
    }

    struct AvatarBlocks {
        string open_file_ai;
        string head_file_ai;
        string body_file_ai;
        string legs_file_ai;
        string avatar_type;
        uint256 required_head_size;
        uint256 required_leg_size;
        uint256 required_body_size;
        uint256 version;
    }

    
    /********************************/
    /****** Public Functions ********/
    /********************************/
    function getBlock(uint256 _number) external view returns (AvatarBlocks memory) {
        return _availableBlocks[_blocksByName[_number]];
    }

    function getChain(uint256 _number) external view returns (Contracts memory) {
        return _supportedChains[_number];
    }
 

    function getNumberBlocks() external view returns (uint256) {
        return _numberBlocks;
    }

    /********************************/
    /****** Admin Functions *********/
    /********************************/
    function addChain(string memory _name, uint256 _chain_id, address[3] memory _addresses) external onlyOwner {
        Contracts memory _contracts = Contracts(_name, _addresses[0], _addresses[1], _addresses[2]);
        _supportedChains[_chain_id] = _contracts;
    }

    function removeChain(uint256 _chain_id) external onlyOwner {
        delete _supportedChains[_chain_id];
    }

    function addAvatar(string[4] memory _files, string memory _type, uint256[3] memory _sizes) external onlyOwner {
        AvatarBlocks memory _blocks = AvatarBlocks(
            _files[0],
            _files[1],
            _files[2],
            _files[3],
            _type,
            _sizes[0],
            _sizes[1],
            _sizes[2],
            1
        );
        _availableBlocks[_type] = _blocks;
        _blocksByName[_numberBlocks] = _type;
        _numberBlocks++;
    }

    function removeAvatar(string memory _type) external onlyOwner {
        delete _availableBlocks[_type];
    }

    /**********************************/
    /******* Internal Functions *******/
    /**********************************/
    function _hasChain(uint256 _chain_id) internal view returns (bool) {
        return _supportedChains[_chain_id].manager == address(0);
    }
}