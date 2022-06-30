// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract PaymentManager is PaymentSplitter {
    
    constructor(address[] memory _payees, uint256[] memory _shares) PaymentSplitter(_payees, _shares) {}
    
}