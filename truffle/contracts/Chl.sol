// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import  "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title  ChlChain ERC20 token chl
/// @author Saad Igueninni
/// @notice ERC20 
/// @dev Inherits the OpenZepplin ERC20 contract
contract Chl is ERC20 {

    constructor() ERC20("ChlChain", "CHL") {
        _mint(msg.sender, 10000 * (10 ** uint256(decimals())));
    }



}