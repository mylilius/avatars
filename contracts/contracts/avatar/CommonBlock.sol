// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title DOT Avatar Common Block
/// @author TheGreatAxios
/// @notice ERC721 Contract Representing Common Building Blocks of DOT Avatars
contract DOTAvatarCommonBlock is AccessControlEnumerable, ERC1155URIStorage {

    bytes32 public constant AVATAR_MANAGER_ROLE = keccak256("AVATAR_MANAGER_ROLE");
    bytes32 public constant CONTENT_ROLE = keccak256("CONTENT_ROLE");
    bytes32 public constant LOCKED_ROLE = keccak256("LOCKED_ROLE");

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(address _avatarManager) ERC1155("DOTAvatarCommonBlock") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CONTENT_ROLE, msg.sender);
        _setupRole(AVATAR_MANAGER_ROLE, _avatarManager);
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


    /**
    *
    * Public Functions
    *
    */

    /// @dev Custom Function that can only be called via Proxy
    /// @param _creator address of the creator and initial owner of the NFT
    /// @param _tokenURI string that belongs to the uploaded NFT
    function createBlock(address _creator, string memory _tokenURI, uint256 _amount) external onlyAvatarManager returns (uint256) {

        uint256 _newTokenId = _tokenIds.current();
        _mint(_creator, _newTokenId, _amount, "");
        _setURI(_newTokenId, _tokenURI);

        _tokenIds.increment();

        return _newTokenId;
    }

    /**
    *
    * Overrides
    *
    */


    /// @dev Necessary Override For The Core Inherited Contracts
    /// @param interfaceId bytes4 of the interfaceId
    /// @return bool returns whether the interface matches an inherited contract
    function supportsInterface(bytes4 interfaceId) public view virtual override (ERC1155, AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }


}