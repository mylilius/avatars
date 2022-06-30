// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../interfaces/ICreatorBadge.sol";

/// @title DOT Avatar Rare Block
/// @author TheGreatAxios
/// @notice ERC721 Contract Representing Creator PRO Badges
contract CreatorBadge is Ownable, ReentrancyGuard, ERC721 {


    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address private paymentAddress;

    uint256 private nativeCost;
    uint256 private stable6Cost = 1 * 10 ** 6;
    uint256 private stable18Cost = 1 * 10 ** 18;

    mapping(address => bool) private acceptedStable6Tokens;
    mapping(address => bool) private acceptedStable18Tokens;

    string private baseTokenURI;

    constructor(
        address[] memory _stable6Addresses,
        address[] memory _stable18Addresses,
        address _paymentAddress,
        uint256 _nativeCost,
        string memory _baseTokenURI
     ) ERC721("DOTAvatarCreatorBadge", "CREATOR") {
        nativeCost = _nativeCost;
        _initializeTokens(_stable6Addresses, _stable18Addresses);
        _setPaymentAddress(_paymentAddress);
        _updateBaseURI(_baseTokenURI);
    }

    /**
    *
    * Events
    *
    */

    event PurchaseBadge(address indexed buyer, uint256 indexed tokenId, string indexed payment, uint256 timestamp);

    /**
    *
    * Public Functions
    *
    */

    /// @notice Utilizes Native Blockchain for Payment
    /// @dev Payable Functions that Allows the Purchasing of a Creator Badge
    function purchaseBadgeNative() external payable nonReentrant {
        // Confirms Minimum Payment Value is Met
        _isMinimumPaymentValue(msg.value);

        // Retrieves New Token ID and Mints New Token ID
        uint256 _newTokenId = _tokenIds.current();
        _safeMint(msg.sender, _newTokenId);
        _tokenIds.increment();

        /// Retrieves Existing Wallet
        (bool success, ) = payable(paymentAddress).call{value: nativeCost}("");
        require(success, "Error Paying For Purchase");

        emit PurchaseBadge(msg.sender, _newTokenId, "native", block.timestamp);
    }

    /// @notice Purchases Pro Creator Badge with a 6 decimal stablecoin
    /// @dev Payable External Function
    function purchaseBadgeTokenStable6(address _tokenAddress, uint256 _amount) external payable nonReentrant {
        /// Checks for Active Stable 6 Token
        _isActiveToken6(_tokenAddress);
        /// Confirm Minimum Payment
        _isMinimumTokenPayment6(_amount);

        /// Build ERC20 Token
        IERC20 _erc20 = _buildToken(_tokenAddress);
        /// Check For Approved Balance on Token
        _checkApproval(_tokenAddress, 6);

        // Retrieves New Token ID and Mints New Token ID
        uint256 _newTokenId = _tokenIds.current();
        _safeMint(msg.sender, _newTokenId);
        _tokenIds.increment();

        if (!_erc20.transfer(payable(paymentAddress), _amount)) {
            revert();
        }

        emit PurchaseBadge(msg.sender, _newTokenId, "stable_6", block.timestamp);

    }

    /// @notice Purchases Pro Creator Badge with a 6 decimal stablecoin
    /// @dev Payable External Function
    function purchaseBadgeTokenStable18(address _tokenAddress, uint256 _amount) external payable nonReentrant {
        /// Checks for Active Stable 6 Token
        _isActiveToken18(_tokenAddress);
        /// Confirm Minimum Payment
        _isMinimumTokenPayment18(_amount);

        /// Build ERC20 Token
        IERC20 _erc20 = _buildToken(_tokenAddress);
        /// Check For Approved Balance on Token
        _checkApproval(_tokenAddress, 18);

        // Retrieves New Token ID and Mints New Token ID
        uint256 _newTokenId = _tokenIds.current();
        _safeMint(msg.sender, _newTokenId);
        _tokenIds.increment();

        if (!_erc20.transfer(payable(paymentAddress), _amount)) {
            revert();
        }

        emit PurchaseBadge(msg.sender, _newTokenId, "stable_18", block.timestamp);

    }

    /**
    *
    * Admin Functions
    *
    */

    /// @dev Admin Function to Add a Token to the Accepted List
    /// @param _token Token Address
    /// @param _stableDecimals Number of Decimals of the Token
    function addToken(address _token, uint16 _stableDecimals) external onlyOwner {
        _addTokenToMap(_token, _stableDecimals);
    }

    /// @dev Admin Function to Remove a Token from the Accepted List
    /// @param _token Token Address
    /// @param _stableDecimals Number of Decimals of the Token
    function removeToken(address _token, uint16 _stableDecimals) external onlyOwner {
        require(_stableDecimals == 6 || _stableDecimals == 18, "Not a valid token");
        if (_stableDecimals == 6) {
            delete acceptedStable6Tokens[_token];
        } else {
            delete acceptedStable18Tokens[_token];
        }
    }
    /// @dev Admin Function to Pause a Token on the Accepted List
    /// @param _token Token Address
    /// @param _stableDecimals Number of Decimals of the Token
    function pauseToken(address _token, uint16 _stableDecimals) external onlyOwner {
        require(_stableDecimals == 6 || _stableDecimals == 18, "Not a valid token");
        if (_stableDecimals == 6) {
            acceptedStable6Tokens[_token] = false;
        } else {
            acceptedStable18Tokens[_token] = false;
        }
    }

    /// @dev Admin Function to Add Unpause a Token on the Accepted List
    /// @param _token Token Address
    /// @param _stableDecimals Number of Decimals of the Token
    function unPauseToken(address _token, uint16 _stableDecimals) external onlyOwner {
        require(_stableDecimals == 6 || _stableDecimals == 18, "Not a valid token");
        if (_stableDecimals == 6) {
            acceptedStable6Tokens[_token] = true;
        } else {
            acceptedStable18Tokens[_token] = true;
        }
    }

    /// @dev Admin Function to Set a New Payment Address
    /// @param _newPaymentAddress New Payment Address
    function setPaymentAddress(address _newPaymentAddress) external onlyOwner {
        paymentAddress = _newPaymentAddress;
    }

    /// @dev Admin Function to Set New Base URI
    /// @param _newBaseURI New Base Token URI
    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        _updateBaseURI(_newBaseURI);
    }



    /**
    *
    * Internal Functions
    *
    */

    /// @dev Internal Function Called on Contract Creation to Seed Initial Accepted Tokens
    /// @param _tokens6 List of Stable Coins with 6 Decimal Places
    /// @param _tokens18 List of Stable Coins with 18 decimal
    function _initializeTokens(address[] memory _tokens6, address[] memory _tokens18) internal {
        for (uint256 i = 0; i < _tokens6.length; i++) {
            _addTokenToMap(_tokens6[i], 6);
        }

        for (uint256 i = 0; i < _tokens18.length; i++) {
            _addTokenToMap(_tokens18[i], 18);
        }
    }

    /// @dev Internal Function to Add Token To Accepted List
    /// @param _token Token Address
    /// @param _stableDecimals Number of Decimals of the Token
    function _addTokenToMap(address _token, uint16 _stableDecimals) internal {
        require(_stableDecimals == 6 || _stableDecimals == 18, "Not a valid token");
        if (_stableDecimals == 6) {
            acceptedStable6Tokens[_token] = true;
        } else {
            acceptedStable18Tokens[_token] = true;
        }
    }

    /// @dev Confirms Token with 6 decimals is listed and active
    /// @param _token Token Address
    function _isActiveToken6(address _token) internal view {
        require(acceptedStable6Tokens[_token], "Not an active or listed token");
    }

    /// @dev Confirms Token with 18 decimals is listed and active
    /// @param _token Token Address
    function _isActiveToken18(address _token) internal view {
        require(acceptedStable18Tokens[_token], "Not an active or listed token");
    }

    /// @dev Confirms Ethereum Native Purchase is of minimum value
    /// @param _value Total Value Sent in WeiC
    function _isMinimumPaymentValue(uint256 _value) internal view {
        require(_value >= nativeCost, "Payment Value Insufficent");
    }

    /// @dev Confirms Ethereum Native Purchase is of minimum value
    /// @param _value Total Value Sent in WeiC
    function _isMinimumTokenPayment6(uint256 _value) internal view {
        require(_value >= stable6Cost, "Payment Value Insufficent");
    }

    function _isMinimumTokenPayment18(uint256 _value) internal view {
        require(_value >= stable18Cost, "Payment Value Insufficent");
    }

    /// @dev Sets Payment Address
    /// @param _new_payment_address Address to Recieve Payments
    function _setPaymentAddress(address _new_payment_address) internal {
        paymentAddress = _new_payment_address;
    }

    function _checkApproval(address _token, uint16 _stableDecimals) internal view {
        IERC20 _erc20 = _buildToken(_token);
        if (_stableDecimals == 6) {
            require(_erc20.allowance(msg.sender, address(this)) >= stable6Cost, "Insufficent Allowance");
        } else {
            require(_erc20.allowance(msg.sender, address(this)) >= stable18Cost, "Insufficent Allowance");
        }
    }

    /// @dev Builds ERC20 callable token taking address as parameter
    /// @param _tokenAddress Token Address of ERC-20
    /// @return IERC20 ERC20 Callable Tokn
    function _buildToken(address _tokenAddress) internal pure returns (IERC20) {
        return IERC20(_tokenAddress);
    }

    /// @dev Returns Base URI for Project
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /// @dev Allows the Updating of the Base Token URI
    /// @param _newURI string baseURI Replacement
    function _updateBaseURI(string memory _newURI) internal {
        baseTokenURI = _newURI;
    }
}