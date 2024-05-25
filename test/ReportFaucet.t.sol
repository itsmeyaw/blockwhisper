// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";
import "./MockProveChecker.sol";
import "../lib/forge-std/src/console2.sol";
import "../contracts/ReportFaucet.sol";
import "../lib/forge-std/src/Vm.sol";

contract ReportTest is Test {
    MockProveChecker private mockProveChecker = new MockProveChecker();
    VmSafe.Wallet private TRIGGERER_WALLET = vm.createWallet("TRIGGERER");
    VmSafe.Wallet private OWNER_WALLET = vm.createWallet("OWNER");
    ReportFaucet private sut;

    function setUp() public {
        console2.log("Setup");
        vm.deal(TRIGGERER_WALLET.addr, 100 ether);
        vm.deal(OWNER_WALLET.addr, 100 ether);

        vm.prank(OWNER_WALLET.addr);
        sut = new ReportFaucet(TRIGGERER_WALLET.addr);
        vm.deal(address(sut), 100 ether);
        vm.stopPrank();
    }

    function test_SendBalanceToUser() public {
        mockProveChecker.setValue(true);
        address fundedAddress = vm.addr(1);

        vm.startPrank(OWNER_WALLET.addr);
        sut.setDripAmount(1 ether);
        vm.stopPrank();

        vm.expectEmit(true, true, true, true, address(sut));
        emit ReportFaucet.Withdrawal(TRIGGERER_WALLET.addr, fundedAddress, 1 ether);

        vm.startPrank(TRIGGERER_WALLET.addr);
        sut.fund(fundedAddress);
        vm.stopPrank();

        assertEq(fundedAddress.balance, 1 ether);
    }
}
