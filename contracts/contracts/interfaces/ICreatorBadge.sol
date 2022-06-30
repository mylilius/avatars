// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface ICreatorBadge is IERC721 {
    function purchaseBadgeNative() external payable;
    function purchaseBadgeTokenStable6(address _tokenAddress, uint256 _amount) external payable;
    function purchaseBadgeTokenStable18(address _tokenAddress, uint256 _amount) external payable;
    function addToken(address _token, uint16 _stableDecimals) external;
    function removeToken(address _token, uint16 _stableDecimals) external;
    function pauseToken(address _token, uint16 _stableDecimals) external;
    function unPauseToken(address _token, uint16 _stableDecimals) external;
    function setPaymentAddress(address _newPaymentAddress) external;
    function setBaseURI(string memory _newURI) external;
}

