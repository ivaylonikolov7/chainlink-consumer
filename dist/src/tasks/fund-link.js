"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
(0, config_1.task)("fund-link", "Funds a contract with LINK")
    .addParam("contract", "The address of the contract that requires LINK")
    .addOptionalParam("linkaddress", "Set the LINK token address")
    .addOptionalParam("fundamount", "Set the amount of LINK token to transfer")
    .setAction(async (taskArgs, hre) => {
    const contractAddress = taskArgs.contract;
    console.log("Funding contract " + contractAddress + " on network " + hre.network.name);
    try {
        const receipt = await hre.fundLink(hre, taskArgs.contract, taskArgs.fundamount, taskArgs.linkaddress);
        console.log("Contract " +
            contractAddress +
            " funded with " +
            +receipt.amount / Math.pow(10, 18) +
            " LINK. Transaction Hash: " +
            receipt.transactionHash);
    }
    catch (err) {
        console.log(`Failed funding link: ${err}`);
    }
});
//# sourceMappingURL=fund-link.js.map