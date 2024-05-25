pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../contracts/HCaptchaProveChecker.sol";
import "../contracts/ReportFaucet.sol";
import "../contracts/Report.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("SEPOLIA_PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        console.log("Copy the following values to your .env file!");

        HCaptchaProveChecker proveChecker = new HCaptchaProveChecker(vm.addr(deployerPrivateKey));
        console.log("NEXT_PUBLIC_PROVE_CHECKER_SMART_CONTRACT_ADDRESS=", address(proveChecker));

        Report report = new Report(address(proveChecker));
        console.log("NEXT_PUBLIC_REPORT_SMART_CONTRACT_ADDRESS=", address(report));

        ReportFaucet reportFaucet = new ReportFaucet(vm.addr(deployerPrivateKey));
        console.log("NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS=", address(reportFaucet));

        vm.stopBroadcast();
    }
}
