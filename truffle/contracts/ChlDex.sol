// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title  ChlDex
/// @author Saad Igueninni
/// @notice Responsible of selling CHLs, withdraw...
/// @dev Inherits the OpenZepplin Ownable contract
contract ChlDex is Ownable {
    IERC20 Chl;
    address public ChlContractAddress;

    //CHL price in ETH
    uint256 public tokensPerEth = 50;

    event ChlBuyed(
        address _sounderAddress,
        uint256 _amountOfETH,
        uint256 _amountOfCHLs
    );

    constructor(address _ChlAddress) {
        Chl = IERC20(_ChlAddress);
       
    }

    /**
     * @notice Sounders users to buy token for ETH
     */
    function buyTokens() public payable returns (uint256 tokenAmount) {
        require(msg.value > 0, "ETH needed to buy CHLs");

        uint256 amountToBuy = ( msg.value/(1 ether) ) * tokensPerEth;

        // check if the Vendor Contract has enough amount of tokens for the transaction
        uint256 ChlDexBalance = Chl.balanceOf(address(this));
        require(ChlDexBalance >= amountToBuy, "Not enough CHLs in balance of ChlDex");

        // Transfer token to the msg.sender
       bool sent = Chl.transfer(msg.sender, amountToBuy );
        require(sent, "Failed to transfer CHLs to user");

        // emit the event
        emit ChlBuyed(msg.sender, msg.value, amountToBuy);

        return amountToBuy;
    }

    /**
     * @notice Allow the owner of the contract to withdraw ETH
     */
    function withdraw() public onlyOwner {
        uint256 ChlDexBalance = address(this).balance;
        require(ChlDexBalance > 0, "ChlDexBalance has nothing to withdraw");

        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to withdraw!");
    }
}
