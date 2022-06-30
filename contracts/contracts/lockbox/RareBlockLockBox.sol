// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "../interfaces/IRareBlock.sol";

/// @title BlockLockBox
/// @author TheGreatAxios
/// @notice When an NFT is activley used on a DOT, it must be locked in the lock box. The Rare and Common Blocks will read from the lock box and upon transfer check if asset is in the lockbox.
/// @notice In order to remove an item from the lockbox, the item on the avatar will be checked using an on-chain Oracle
/// @dev This is going to be awesome because there isn't a security risk from the standpoint of the contract holding NFTs
/// @dev Just adds an extra check on transaction via the 
contract RareBlockLockBox is AccessControl {

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    /// @notice contractAddress => tokenId => userAddress => bool
    mapping(address => mapping(uint256 => mapping(address => bool))) private lockBox;
    
    constructor(
        address _manager        
    ) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MANAGER_ROLE, _manager);
    }
    /************************/
    /******* Modifiers ******/
    /************************/
    modifier onlyManager {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender) || hasRole(MANAGER_ROLE, msg.sender), "Access Denied");
        _;
    }

    /*********************************/
    /******* External Functions ******/
    /*********************************/
    function lockBlock(address _contractAddress, uint256 _tokenId) external {
        _lockBlock(_contractAddress, _tokenId);
    }

    function unlockBlock(address _contractAddress, uint256 _tokenId, address _owner) external onlyManager {
        _unlockBlock(_contractAddress, _tokenId, _owner);
    }

    /*********************************/
    /******* Internal Functions ******/
    /*********************************/
    /// @notice Adds Rare Block To Mapping
    /// @dev Calls Rare Block NFT Contracts
    /// @param _contractAddress Contract Address  of Rare Block
    /// @param _tokenId Token ID of Block
    function _lockBlock(address _contractAddress, uint256 _tokenId) internal {
        /// 1 -> Confirm Ownership
        require(_isOwner(_contractAddress, _tokenId, msg.sender), "You cannot lock this NFT");
        /// 2 -> Confirm Token is Not Already Locked
        require(lockBox[_contractAddress][_tokenId][msg.sender], "Token is not locked");
        /// 3 -> Toggle Lock on Contract
        _rareBlock(_contractAddress).lockBlock(_tokenId);
        /// 4 -> Add To Mapping
        lockBox[_contractAddress][_tokenId][msg.sender] = true;
    }

    /// @notice Removes Rare Block From Mapping
    /// @dev Calls Rare Block NFT Contracts
    /// @param _contractAddress Contract Address  of Rare Block
    /// @param _tokenId Token ID of Block
    /// @dev Should Utilize Oracle to Check Usage on SKALE Chain
    function _unlockBlock(address _contractAddress, uint256 _tokenId, address _owner) internal {
        /// 1 -> Confirm Ownership
        require(_isOwner(_contractAddress, _tokenId, _owner), "Address is not the Owner");
        /// 2 -> Confirm Block Is Locked 
        require(lockBox[_contractAddress][_tokenId][_owner], "Token is not locked");
        /// 3 -> Check SKALE Chain for Usage of Token
        /// 4 -> If No Usage, Unlock Block
        _rareBlock(_contractAddress).unlockBlock(_tokenId);
        /// 5 -> Set to False
        lockBox[_contractAddress][_tokenId][_owner] = false;
    }

    /// @notice Confirms Sender is Owner of Block
    /// @dev Calls Common Block NFT Contract
    /// @param _contractAddress Contract Address 
    /// @param _tokenId Token ID of Block
    function _isOwner(address _contractAddress, uint256 _tokenId, address _owner) internal view returns (bool) {
        return _rareBlock(_contractAddress).ownerOf(_tokenId) == _owner;
    }

    /// @notice Builds 721 Interface
    /// @dev Calls Common Block NFT Contracts
    /// @param _contractAddress Contract Address of Rare Block
    function _rareBlock(address _contractAddress) internal pure returns (IRareBlock) {
        return IRareBlock(_contractAddress);
    }
    
    /// @notice Checks if Token is Locked
    /// @param _sender address of user
    /// @param _contractAddress Contract Address of Rare Block
    /// @param _tokenId Token Id of Rare Block
    /// @return bool of locked status
    function _isLocked(address _sender, address _contractAddress, uint256 _tokenId) internal view returns (bool) {
        return lockBox[_contractAddress][_tokenId][_sender];
    }
}