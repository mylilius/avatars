// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "./Avatar.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Avatar Factory
/// @author TheGreatAxios
/// @notice Holds the Core Mappings for Avatars
/// @dev Generates a new avatar upon request - V1 (Now)
/// @dev Allows for Multiple Avatars Per Address - V2
/// @dev Allows for Multiple Avatars per Address - V3
contract AvatarFactory is Ownable {

    address private constant NULL_ADDRESS = 0x0000000000000000000000000000000000000000;
    address private dot_name_service;

    mapping(address => address) private avatars;
    mapping(address => bool) private tracker;

    /*** ******************/
    /****** Events ********/
    /**********************/
    event CreateAvatar(address indexed owner);

    constructor (address _dns) {
        dot_name_service = _dns;
    }

    /********************************/
    /****** Public Functions ********/
    /********************************/
    function createAvatar() external {
        require(!_hasAvatar(msg.sender), "DOT already has avatar");
        Avatar _avatar = new Avatar(msg.sender);
        tracker[msg.sender] = true;
        avatars[msg.sender] = address(_avatar);

        emit CreateAvatar(msg.sender);
    }

    function hasAvatar(address _address) external view returns(bool) {
        return _hasAvatar(_address);
    }

    function getAvatarAddress(address _userAddress) external view returns (address) {
        return avatars[_userAddress];
    }

    /********************************/
    /****** Owner Functions ********/
    /********************************/
    function setDNSAddress(address _newAddress) external onlyOwner {
        dot_name_service = _newAddress;
    }

    /**********************************/
    /****** Internal Functions ********/
    /**********************************/
    function _hasAvatar(address _address) internal view returns (bool) {
        return tracker[_address];
    }

    function _buildAvatar(address _avatarAddress) internal view returns (IAvatar) {
        require(tracker[msg.sender]);
        return IAvatar(_avatarAddress);
    }

    
    
}