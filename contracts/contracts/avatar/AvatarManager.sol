// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/ICreatorBadge.sol";
import "../interfaces/ICommonBlock.sol";
import "../interfaces/IRareBlock.sol";

/// @title Avatar Manager Contract
/// @author TheGreatAxios
/// @notice Proxy/Interhitance Calls the NFT Contracts for Creation
contract AvatarManager is Ownable {

    /// @notice Creator PRO Badge NFT Contract Address
    address private _creatorNFTAddress;
    /// @notice Common Block NFT Contract Address
    address private _commonBlockAddress;
    /// @notice Rare Block NFT Contract Address
    address private _rareBlockAddress;
    
    /// @notice Whitelist
    /// @dev Addresses Whitelisted do not need to pay or buy a badge to mint
    mapping(address => bool) private blacklist;

    /// @notice Blacklist
    /// @dev Addresses Blacklisted Cannot Mint even with a badge
    mapping(address => bool) private whitelist;

    /// @notice Created Blocks
    /// @dev Tracks Created Blocks
    mapping(address => Block[]) private createdBlocks;

    /// @notice Pausable Contract State
    /// @dev OnlyOwner
    bool private creationIsPaused = false;
    
    /// @notice Block Struct to Track Creation
    struct Block {
        address contractAddress;
        uint256 tokenId;
        uint256 timestamp;
    }

    /********************************/
    /****** Public Functions *******/
    /******************************/

    /// @notice Creates Common Block via Inherited Contract Call
    /// @dev Calls Common Block NFT Contracts
    /// @param _tokenURI Token URI of Common Block
    /// @param _amount Number of NFTs to to mint of common type
    function createCommonBlock(string memory _tokenURI, uint256 _amount) external {
        require(_canMint());
        /// 3 Create Block
        ICommonBlock _commonBlock = _commonBlockContract();
        uint256 _tokenId = _commonBlock.createBlock(msg.sender, _tokenURI, _amount);
        _addBlock(_commonBlockAddress, _tokenId);
    }

    /// @notice Creates Rare Block via Inherited Contract Call
    /// @dev Calls Rare Block NFT Contract
    /// @param _tokenURI Token URI of Common Block
    function createRareBlock(string memory _tokenURI) external {
        require(_canMint());
        /// 3 Create Block
        IRareBlock _rareBlock = _rareBlockContract();
        uint256 _tokenId = _rareBlock.createBlock(msg.sender, _tokenURI);
        _addBlock(_rareBlockAddress, _tokenId);
    }

    /***********************************/
    /******* Internal Functions *******/
    /*********************************/

    /// @notice Internal Function to Check if msg.sender can mint
    /// @dev Checks Internal State and Functions
    /// @return bool if can mint
    function _canMint() internal view returns (bool) {
        /// 1 -> Confirms is Not Blacklist
        require(!blacklist[msg.sender], "Address Blacklisted");
        /// 2 -> Checks for Whitelist
        if (!whitelist[msg.sender]) {
            /// 3 -> Checks if Free Tier Exceeded
            if (_numberBlocksCreated() >= 3) {
                /// 4 -> Returns if Has PRO Creator NFT
                return _hasCreatorNFT();
            }
        }

        /// If Whitelisted -> Auto Return True
        return true;
    }

    /// @notice Checks if User Has Creator PRO Badge
    /// @dev Calls Create Badge NFT Contract
    /// @return bool if has badge
    function _hasCreatorNFT() internal view returns (bool) {
        ICreatorBadge _badge = _proBadgeContract();
        return _badge.balanceOf(msg.sender) >= 1;
    }

    /// @notice Checks # of Blocks Created
    /// @return uint256 of # of blocks created
    function _numberBlocksCreated() internal view returns (uint256) {
        return createdBlocks[msg.sender].length;
    }

    /// @notice Creates Pro Badge Inherited Contract
    /// @return ICreatorBadge
    function _proBadgeContract() internal view returns (ICreatorBadge) {
        return ICreatorBadge(_creatorNFTAddress);
    }

    /// @notice Creates Common Block Inherited Contract
    /// @return ICommonBlock
    function _commonBlockContract() internal view returns (ICommonBlock) {
        return ICommonBlock(_commonBlockAddress);
    }

    /// @notice Creates Rare Block Inherited Contract
    /// @return IRareBlock
    function _rareBlockContract() internal view returns (IRareBlock) {
        return IRareBlock(_rareBlockAddress);
    }

    /// @notice Adds Block after NFT is Minted
    /// @param _contract_address address of creator
    /// @param _token_id token id of block
    function _addBlock(address _contract_address, uint256 _token_id) internal {
        uint256 _blockPosition = _numberBlocksCreated() == 0 ? 0 : _numberBlocksCreated() - 1;
        createdBlocks[msg.sender][_blockPosition] = Block(_contract_address, _token_id, block.timestamp);
    }

    /********************************/
    /******* Admin Functions *******/
    /******************************/

    /// @notice Updates Creator PRO Nft Badge Contract Address
    /// @param _new_contract_address address of contract
    function updateCreatorNFTAddress(address _new_contract_address) external onlyOwner {
        _creatorNFTAddress = _new_contract_address;
    }

    /// @notice Updates Common Block Contract Address
    /// @param _new_contract_address address of contract
    function updateCommonBlockAddress(address _new_contract_address) external onlyOwner {
        _commonBlockAddress = _new_contract_address;
    }

    /// @notice Updates Rare Block Contract Address
    /// @param _new_contract_address address of contract
    function updateRareBlockAddress(address _new_contract_address) external onlyOwner {
        _rareBlockAddress = _new_contract_address;
    }

    /// @notice Blacklists a User
    /// @param _address address of user
    function blacklistAddress(address _address) external onlyOwner {
        blacklist[_address] = true;
        if (whitelist[_address]) {
            delete whitelist[_address];
        }
    }

    /// @notice Whitelists a User
    /// @param _address address of user
    function whitelistAddress(address _address) external onlyOwner {
        whitelist[_address] = true;
    }

    /// @notice Toggles State of Creation
    function toggleCreationStatus() external onlyOwner {
        creationIsPaused = !creationIsPaused;
    }
}