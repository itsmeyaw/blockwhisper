// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IProveChecker {
    function checkProof(
        address attestedPerson,
        string memory code
    ) external view returns (bool);
}
