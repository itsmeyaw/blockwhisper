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

        HCaptchaProveChecker proveChecker = new HCaptchaProveChecker(vm.addr(deployerPrivateKey));
        console.log("proveChecker deployed to:", address(proveChecker));

        Report report = new Report(address(proveChecker));
        console.log("report deployed to:", address(report));

        ReportFaucet reportFaucet = new ReportFaucet(vm.addr(deployerPrivateKey));
        console.log("reportFaucet deployed to:", address(reportFaucet));

        vm.stopBroadcast();
    }
}
