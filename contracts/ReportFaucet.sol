// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract ReportFaucet is Ownable {
    uint256 private _dripAmount = 0.001 ether;
    address private _allowedFundTriggerAddress;

    event Withdrawal(address indexed triggere, address indexed to, uint256 amount);

    constructor(address allowedFundTriggerAddress) {
        _allowedFundTriggerAddress = allowedFundTriggerAddress;
    }

    receive() external payable {}

    function fund(address tempWalletAddress) public {
        require(msg.sender == _allowedFundTriggerAddress, "Only authorized account can trigger funding");
        require(address(this).balance >= _dripAmount, "Insufficient balance in faucet.");

        address(tempWalletAddress).transfer(_dripAmount);
        emit Withdrawal(msg.sender, tempWalletAddress, _dripAmount);
    }

    function setDripAmount(uint256 newAmount) external onlyOwner {
        _dripAmount = newAmount;
    }

    function withdrawFunds() external onlyOwner {
        address(owner()).transfer(address(this).balance);
    }
}
