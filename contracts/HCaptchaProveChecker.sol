// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract HCaptchaProveChecker is Ownable {
    address private _allowedAddAddress;
    mapping(address => string) private _confirmedCodes;

    constructor(address allowedAddAddress) {
        _allowedAddAddress = allowedAddAddress;
    }

    function addConfirmedCode(address confirmedPerson, string memory code) external {
        require(msg.sender == _allowedAddAddress, "Only authorized address can add confirmed code");
        require(bytes(code).length > 0, "Code cannot be empty");
        _confirmedCodes[code] = true;
    }

    function checkConfirmedCode(address attestedPerson, string memory code) external returns (bool) {
        return _confirmedCodes[attestedPerson] == code;
    }
}
