// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../../node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol";


contract DOTAvatarRareBlock is AccessControlEnumerable, ERC721URIStorage {

    bytes32 public constant AVATAR_MANAGER_ROLE = keccak256("AVATAR_MANAGER_ROLE");
    bytes32 public constant CONTENT_ROLE = keccak256("CONTENT_ROLE");


    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(address _avatarManager) ERC721("DOTAvatarRareBlock", "RARE") {
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
    function createNFT(address _creator, string memory _tokenURI) external onlyAvatarManager {

        uint256 _newTokenId = _tokenIds.current();
        _safeMint(_creator, _newTokenId);
        _setTokenURI(_newTokenId, _tokenURI);

        _tokenIds.increment();

    }

    /**
    *
    * Overrides
    *
    */


    /// @dev Necessary Override For The Core Inherited Contracts
    /// @param interfaceId bytes4 of the interfaceId
    /// @return bool returns whether the interface matches an inherited contract
    function supportsInterface(bytes4 interfaceId) public view virtual override (ERC721, AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}