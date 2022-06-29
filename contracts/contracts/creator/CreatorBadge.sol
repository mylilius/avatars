// SPDX-License-Identifier: APGL-3.0
pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DOTAvatarCreatorBadge is Ownable, ReentrancyGuard, ERC721 {


    using Counters for Counters.Counter;
    Counters.Counter private _token_ids;

    address payment_address;

    uint256 native_cost ;
    uint256 stable_6_cost = 1 * 10 ** 6;
    uint256 stable_18_cost = 1 * 10 ** 18;

    mapping(address => bool) private accepted_stable_6_tokens;
    mapping(address => bool) private accepted_stable_18_tokens;

    string private _baseTokenURI;

    constructor(
        address[] memory _stable_6_addresses,
        address[] memory _stable_18_addresses,
        address _payment_address,
        uint256 _native_cost,
        string memory _base_token_URI
     ) ERC721("DOTAvatarCreatorBadge", "CREATOR") {
        native_cost = _native_cost;
        _initializeTokens(_stable_6_addresses, _stable_18_addresses);
        _setPaymentAddress(_payment_address);
        _updateBaseURI(_base_token_URI);
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
        uint256 _newTokenId = _token_ids.current();
        _safeMint(msg.sender, _newTokenId);
        _token_ids.increment();

        /// Retrieves Existing Wallet
        (bool success, ) = payable(payment_address).call{value: native_cost}("");
        require(success);

        emit PurchaseBadge(msg.sender, _newTokenId, 'native', block.timestamp);
    }

    /// @notice Purchases Pro Creator Badge with a 6 decimal stablecoin
    /// @dev Payable External Function
    function purchaseBadgeTokenStable6(address _token_address, uint256 _amount) external payable nonReentrant {
        /// Checks for Active Stable 6 Token
        _isActiveToken6(_token_address);
        /// Confirm Minimum Payment
        _isMinimumTokenPayment6(_amount);

        /// Build ERC20 Token
        IERC20 _erc20 = _buildToken(_token_address);
        /// Check For Approved Balance on Token
        _checkApproval(_token_address, 6);

        // Retrieves New Token ID and Mints New Token ID
        uint256 _newTokenId = _token_ids.current();
        _safeMint(msg.sender, _newTokenId);
        _token_ids.increment();

        if (!_erc20.transfer(payable(payment_address), _amount)) {
            revert();
        }

        emit PurchaseBadge(msg.sender, _newTokenId, 'stable_6', block.timestamp);

    }

    /// @notice Purchases Pro Creator Badge with a 6 decimal stablecoin
    /// @dev Payable External Function
    function purchaseBadgeTokenStable18(address _token_address, uint256 _amount) external payable nonReentrant {
        /// Checks for Active Stable 6 Token
        _isActiveToken18(_token_address);
        /// Confirm Minimum Payment
        _isMinimumTokenPayment18(_amount);

        /// Build ERC20 Token
        IERC20 _erc20 = _buildToken(_token_address);
        /// Check For Approved Balance on Token
        _checkApproval(_token_address, 18);

        // Retrieves New Token ID and Mints New Token ID
        uint256 _newTokenId = _token_ids.current();
        _safeMint(msg.sender, _newTokenId);
        _token_ids.increment();

        if (!_erc20.transfer(payable(payment_address), _amount)) {
            revert();
        }

        emit PurchaseBadge(msg.sender, _newTokenId, 'stable_18', block.timestamp);

    }

    /**
    *
    * Admin Functions
    *
    */

    /// @dev Admin Function to Add a Token to the Accepted List
    /// @param _token Token Address
    /// @param _stable_decimals Number of Decimals of the Token
    function addToken(address _token, uint16 _stable_decimals) external onlyOwner {
        _addTokenToMap(_token, _stable_decimals);
    }

    /// @dev Admin Function to Remove a Token from the Accepted List
    /// @param _token Token Address
    /// @param _stable_decimals Number of Decimals of the Token
    function removeToken(address _token, uint16 _stable_decimals) external onlyOwner {
        require(_stable_decimals == 6 || _stable_decimals == 18, "Not a valid token");
        if (_stable_decimals == 6) {
            delete accepted_stable_6_tokens[_token];
        } else {
            delete accepted_stable_18_tokens[_token];
        }
    }
    /// @dev Admin Function to Pause a Token on the Accepted List
    /// @param _token Token Address
    /// @param _stable_decimals Number of Decimals of the Token
    function pauseToken(address _token, uint16 _stable_decimals) external onlyOwner {
        require(_stable_decimals == 6 || _stable_decimals == 18, "Not a valid token");
        if (_stable_decimals == 6) {
            accepted_stable_6_tokens[_token] = false;
        } else {
            accepted_stable_18_tokens[_token] = false;
        }
    }

    /// @dev Admin Function to Add Unpause a Token on the Accepted List
    /// @param _token Token Address
    /// @param _stable_decimals Number of Decimals of the Token
    function unPauseToken(address _token, uint16 _stable_decimals) external onlyOwner {
        require(_stable_decimals == 6 || _stable_decimals == 18, "Not a valid token");
        if (_stable_decimals == 6) {
            accepted_stable_6_tokens[_token] = true;
        } else {
            accepted_stable_18_tokens[_token] = true;
        }
    }

    /// @dev Admin Function to Set a New Payment Address
    /// @param _new_payment_address New Payment Address
    function setPaymentAddress(address _new_payment_address) external onlyOwner {
        payment_address = _new_payment_address;
    }

    /// @dev Admin Function to Set New Base URI
    /// @param _new_base_uri New Base Token URI
    function setBaseURI(string memory _new_base_uri) external onlyOwner {
        _updateBaseURI(_new_base_uri);
    }



    /**
    *
    * Internal Functions
    *
    */

    /// @dev Internal Function Called on Contract Creation to Seed Initial Accepted Tokens
    /// @param _tokens_6 List of Stable Coins with 6 Decimal Places
    /// @param _tokens_18 List of Stable Coins with 18 decimal
    function _initializeTokens(address[] memory _tokens_6, address[] memory _tokens_18) internal {
        for (uint256 i = 0; i < _tokens_6.length; i++) {
            _addTokenToMap(_tokens_6[i], 6);
        }

        for (uint256 i = 0; i < _tokens_18.length; i++) {
            _addTokenToMap(_tokens_18[i], 18);
        }
    }

    /// @dev Internal Function to Add Token To Accepted List
    /// @param _token Token Address
    /// @param _stable_decimals Number of Decimals of the Token
    function _addTokenToMap(address _token, uint16 _stable_decimals) internal {
        require(_stable_decimals == 6 || _stable_decimals == 18, "Not a valid token");
        if (_stable_decimals == 6) {
            accepted_stable_6_tokens[_token] = true;
        } else {
            accepted_stable_18_tokens[_token] = true;
        }
    }

    /// @dev Confirms Token with 6 decimals is listed and active
    /// @param _token Token Address
    function _isActiveToken6(address _token) internal view {
        require(accepted_stable_6_tokens[_token], "Not an active or listed token");
    }

    /// @dev Confirms Token with 18 decimals is listed and active
    /// @param _token Token Address
    function _isActiveToken18(address _token) internal view {
        require(accepted_stable_18_tokens[_token], "Not an active or listed token");
    }

    /// @dev Confirms Ethereum Native Purchase is of minimum value
    /// @param _value Total Value Sent in WeiC
    function _isMinimumPaymentValue(uint256 _value) internal view {
        require(_value >= native_cost, "Payment Value Insufficent");
    }

    /// @dev Confirms Ethereum Native Purchase is of minimum value
    /// @param _value Total Value Sent in WeiC
    function _isMinimumTokenPayment6(uint256 _value) internal view {
        require(_value >= stable_6_cost, "Payment Value Insufficent");
    }

    function _isMinimumTokenPayment18(uint256 _value) internal view {
        require(_value >= stable_18_cost, "Payment Value Insufficent");
    }

    /// @dev Sets Payment Address
    /// @param _new_payment_address Address to Recieve Payments
    function _setPaymentAddress(address _new_payment_address) internal {
        payment_address = _new_payment_address;
    }

    function _checkApproval(address _token, uint16 _stable_decimals) internal view {
        IERC20 _erc20 = _buildToken(_token);
        if (_stable_decimals == 6) {
            require(_erc20.allowance(msg.sender, address(this)) >= stable_6_cost, "Insufficent Allowance");
        } else {
            require(_erc20.allowance(msg.sender, address(this)) >= stable_18_cost, "Insufficent Allowance");
        }
    }

    /// @dev Builds ERC20 callable token taking address as parameter
    /// @param _token_address Token Address of ERC-20
    /// @return IERC20 ERC20 Callable Tokn
    function _buildToken(address _token_address) internal pure returns (IERC20) {
        return IERC20(_token_address);
    }

    /// @dev Returns Base URI for Project
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    /// @dev Allows the Updating of the Base Token URI
    /// @param _new_base_uri string baseURI Replacement
    function _updateBaseURI(string memory _new_base_uri) internal {
        _baseTokenURI = _new_base_uri;
    }
}