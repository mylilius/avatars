// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

/// @title CommonBlockLockBox
/// @author TheGreatAxios
/// @notice When an NFT is activley used on a DOT, it must be locked in the lock box. The Rare and Common Blocks will read from the lock box and upon transfer check if asset is in the lockbox.
/// @notice In order to remove an item from the lockbox, the item on the avatar will be checked using an on-chain Oracle
/// @dev This is going to be awesome because there isn't a security risk from the standpoint of the contract holding NFTs
/// @dev Just adds an extra check on transaction via the
contract CommonBlockLockBox {

    /// @notice contractAddress => userAddress => tokenId => number Locked
    mapping(address => mapping(uint256 => mapping(address => uint256))) private lockBox;

    /*********************************/
    /******* Internal Functions ******/
    /*********************************/
    function _isOwner1155(address _contract_address, uint256 _token_id) internal view returns (bool) {
        return _commonBlock(_contract_address).balanceOf(msg.sender, _token_id) >= 0;
    }

    function _commonBlock(address _contract_address) internal pure returns (IERC1155) {
        return IERC1155(_contract_address);
    }
}