// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import {MockWETH} from "../src/MockWETH.sol";
import {MockWBTC} from "../src/MockWBTC.sol";
import {MockUSDC} from "../src/MockUSDC.sol";
import {MockPEPE} from "../src/MockPEPE.sol";
import {MockUSDT} from "../src/MockUSDT.sol";

import {PriceFeed} from "../src/PriceFeed.sol";

import {LendingPoolFactory} from "../src/LendingPoolFactory.sol";
import {LendingPool} from "../src/LendingPool.sol";
import {Position} from "../src/Position.sol";
import {LendingPoolSequencer} from "../src/LendingPoolSequencer.sol";

contract CaerScript is Script {
    MockWETH public mockWETH;
    MockWBTC public mockWBTC;
    MockUSDC public mockUSDC;
    MockUSDT public mockUSDT;
    MockPEPE public mockPEPE;

    PriceFeed public priceFeed;

    LendingPoolFactory public lendingPoolFactory;
    LendingPool public lendingPool;
    LendingPoolSequencer public lendingPoolSequencer;
    Position public position;

    function setUp() public {
        // vm.createSelectFork(vm.rpcUrl("rise_sepolia"));
        // vm.createSelectFork(vm.rpcUrl("op_sepolia"));
        // vm.createSelectFork(vm.rpcUrl("arb_sepolia"));
        // vm.createSelectFork(vm.rpcUrl("cachain_sepolia"));
        // vm.createSelectFork(vm.rpcUrl("educhain"));
        vm.createSelectFork(vm.rpcUrl("pharos_devnet"));
    }

    function run() public {
        uint256 privateKey = vm.envUint("DEPLOYER_WALLET_PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        mockWETH = new MockWETH();
        mockWBTC = new MockWBTC();
        mockUSDC = new MockUSDC();
        mockUSDT = new MockUSDT();
        mockPEPE = new MockPEPE();

        priceFeed = new PriceFeed();
        lendingPoolFactory = new LendingPoolFactory(address(priceFeed));
        lendingPool = new LendingPool(address(mockWETH), address(mockUSDC), address(priceFeed), 7e17);
        lendingPoolSequencer = new LendingPoolSequencer(address(mockWETH), address(mockUSDC));
        position = new Position(address(mockWETH), address(mockUSDC));
        vm.stopBroadcast();

        console.log("MockWETH deployed to:", address(mockWETH));
        console.log("MockWBTC deployed to:", address(mockWBTC));
        console.log("MockUSDC deployed to:", address(mockUSDC));
        console.log("MockUSDT deployed to:", address(mockUSDT));
        console.log("MockPEPE deployed to:", address(mockPEPE));
        console.log("--------------------------------");
        console.log("PriceFeed deployed to:", address(priceFeed));
        console.log("LendingPoolFactory deployed to:", address(lendingPoolFactory));
        console.log("LendingPool deployed to:", address(lendingPool));
        console.log("LendingPoolSequencer deployed to:", address(lendingPoolSequencer));
        console.log("Position deployed to:", address(position));
    }
}
