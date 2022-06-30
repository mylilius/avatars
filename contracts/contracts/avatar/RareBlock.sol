// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title DOT Avatar Rare Block
/// @author TheGreatAxios
/// @notice ERC721 Contract Representing Rare Building Blocks of DOT Avatars
contract RareBlock is AccessControlEnumerable, ERC721URIStorage {

    bytes32 public constant AVATAR_MANAGER_ROLE = keccak256("AVATAR_MANAGER_ROLE");
    bytes32 public constant CONTENT_ROLE = keccak256("CONTENT_ROLE");
    bytes32 public constant LOCKED_ROLE = keccak256("LOCKED_ROLE");

    mapping(uint256 => bool) private internalLockBox;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(address _avatarManager, address _rareLockBox) ERC721("DOTAvatarRareBlock", "RARE") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CONTENT_ROLE, msg.sender);
        _setupRole(AVATAR_MANAGER_ROLE, _avatarManager);
        _setupRole(LOCKED_ROLE, _rareLockBox);
    }


    /**
    *
    * Modifiers
    *
    */
    
    modifier onlyAvatarManager {
        require(hasRole(AVATAR_MANAGER_ROLE, msg.sender), "Access Denied");
        _;
    }

    modifier onlyLocked {
        require(hasRole(LOCKED_ROLE, msg.sender), "Access Denied");
        _;
    }

    /*********************************/
    /******* External Functions ******/
    /*********************************/
    /// @dev Custom Function that can only be called via Proxy
    /// @param _creator address of the creator and initial owner of the NFT
    /// @param _tokenURI string that belongs to the uploaded NFT
    function createBlock(address _creator, string memory _tokenURI) external onlyAvatarManager returns (uint256) {

        uint256 _newTokenId = _tokenIds.current();
        _safeMint(_creator, _newTokenId);
        _setTokenURI(_newTokenId, _tokenURI);

        _tokenIds.increment();

        return _newTokenId;
    }

    function numberBlocks() external view returns (uint256) {
        return _numberBlocks();
    }

    /********************************/
    /******* LockBox Functions ******/
    /********************************/
    function lockBlock(uint256 _tokenId) external onlyLocked {
        _lockBlock(_tokenId);
    }

    function unlockBlock(uint256 _tokenId) external onlyLocked {
        _unlockBlock(_tokenId);
    }

    /*********************************/
    /******* Internal Functions ******/
    /*********************************/

    function _numberBlocks() internal view returns (uint256) {
        return _tokenIds.current();
    }

    function _isLocked(uint256 _tokenId) internal view returns (bool) {
        return internalLockBox[_tokenId];
    }

    function _lockBlock(uint256 _tokenId) internal {
        require(ownerOf(_tokenId) != address(0), "Token ID Does Not Exist");
        internalLockBox[_tokenId] = true;
    }

    function _unlockBlock(uint256 _tokenId) internal {
        require(ownerOf(_tokenId) != address(0), "Token ID Does Not Exist");
        internalLockBox[_tokenId] = false;
    }

    /*********************************/
    /******* Override Functions ******/
    /*********************************/
    /// @dev Necessary Override For The Core Inherited Contracts
    /// @param interfaceId bytes4 of the interfaceId
    /// @return bool returns whether the interface matches an inherited contract
    function supportsInterface(bytes4 interfaceId) public view virtual override (ERC721, AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal view override {
        require(!_isLocked(tokenId), "Token is Locked");
    }
}