// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IProveChecker} from "../contracts/IProveChecker.sol";
import "../lib/forge-std/src/console2.sol";


contract MockProveChecker is IProveChecker {
    bool private _returnValue = true;

    constructor() {
        console2.log("Create mock");
    }

    function checkProof(
        address attestedPerson,
        string memory code
    ) external view returns (bool) {
        console2.log("Called checkproof", _returnValue);
        return _returnValue;
    }

    function setValue(bool value) public {
        console2.log("Setting value to", value);
        _returnValue = value;
    }
}
