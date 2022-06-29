// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface ICreatorBadge is IERC721 {
    function purchaseBadgeNative() external payable;
    function purchaseBadgeTokenStable6(address _token_address, uint256 _amount) external payable;
    function purchaseBadgeTokenStable18(address _token_address, uint256 _amount) external payable;
    function addToken(address _token, uint16 _stable_decimals) external;
    function removeToken(address _token, uint16 _stable_decimals) external;
    function pauseToken(address _token, uint16 _stable_decimals) external;
    function unPauseToken(address _token, uint16 _stable_decimals) external;
    function setPaymentAddress(address _new_payment_address) external;
    function setBaseURI(string memory _new_base_uri) external;
}

