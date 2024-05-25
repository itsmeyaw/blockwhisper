// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {IProveChecker} from "./IProveChecker.sol";

contract HCaptchaProveChecker is Ownable, IProveChecker {
    address private _allowedAddAddress;
    mapping(address => string) private _confirmedCodes;

    constructor(address allowedAddAddress) Ownable(msg.sender) {
        _allowedAddAddress = allowedAddAddress;
    }

    function addProof(address confirmedPerson, string memory code) external {
        require(
            msg.sender == _allowedAddAddress,
            "Only authorized address can add confirmed code"
        );
        require(confirmedPerson != address(0), "Address cannot be empty");
        require(bytes(code).length > 0, "Code cannot be empty");
        _confirmedCodes[confirmedPerson] = code;
    }

    function checkProof(
        address attestedPerson,
        string memory code
    ) external view returns (bool) {
        require(attestedPerson != address(0), "Address cannot be empty");
        require(bytes(code).length > 0, "Code cannot be empty");
        return
            keccak256(abi.encodePacked(_confirmedCodes[attestedPerson])) ==
            keccak256(abi.encodePacked(code));
    }
}
