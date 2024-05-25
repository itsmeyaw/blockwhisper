// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";
import "./MockProveChecker.sol";
import "../lib/forge-std/src/console2.sol";
import "../contracts/Report.sol";

contract ReportTest is Test {
    MockProveChecker private mockProveChecker = new MockProveChecker();
    Report private sut;

    function setUp() public {
        console2.log("Setup");
        sut = new Report(address(mockProveChecker));
    }

    function test_SimpleAddProof() public {
        mockProveChecker.setValue(true);
        string memory title = "Title";
        string memory desc = "This is a very long description that at least 20 characters long";
        string memory proof = "Proof";

        address user = vm.addr(1);
        vm.prank(user); // Impersonate the user

        uint256 tokenId = sut.createReport(title, desc, proof);

        assertEq(tokenId, 0);
        assertEq(sut.ownerOf(tokenId), user);
    }
}
