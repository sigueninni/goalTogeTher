// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import  "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title  OpiChain ERC20 token opi
/// @author Saad Igueninni
/// @notice ERC20 
/// @dev Inherits the OpenZepplin ERC20 contract
contract Opi is ERC20 {

    constructor() ERC20("OpiChain", "OPI") {
        _mint(msg.sender, 10000 * (10 ** uint256(decimals())));
    }



}