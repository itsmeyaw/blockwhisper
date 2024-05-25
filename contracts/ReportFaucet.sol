// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract ReportFaucet is Ownable {
    uint256 public dripAmount = 0.001 ether;
    address private _allowedFundTrigger;

    event Withdrawal(address indexed triggere, address indexed to, uint256 amount);

    constructor(address _allowedFundTrigger) {
        _allowedFundTrigger = _allowedFundTrigger;
    }

    receive() external payable {}

    function fund(address tempWalletAddress) public {
        require(msg.sender == _allowedFundTrigger, "Only authorized account can trigger funding");
        require(address(this).balance >= dripAmount, "Insufficient balance in faucet.");

        address(tempWalletAddress).transfer(dripAmount);
        emit Withdrawal(msg.sender, tempWalletAddress, dripAmount);
    }

    function setDripAmount(uint256 newAmount) external onlyOwner {
        dripAmount = newAmount;
    }

    function withdrawFunds() external onlyOwner {
        address(owner()).transfer(address(this).balance);
    }
}
