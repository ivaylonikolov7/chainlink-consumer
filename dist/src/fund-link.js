"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LinkTokenInterface_json_1 = __importDefault(require("@appliedblockchain/chainlink-contracts/abi/LinkTokenInterface.json"));
const config_1 = __importStar(require("./config"));
exports.default = async (hre, contractAddr, fundAmt, linkAddr) => {
    const networkName = hre.network.name;
    let networkId = await (0, config_1.getNetworkIdFromName)(networkName);
    if (!networkId || !(networkId in config_1.default)) {
        throw new Error(`The network with the name "${networkName}" is not supported.`);
    }
    const fundAmount = fundAmt || config_1.default[networkId].fundAmount;
    let linkTokenAddress = linkAddr || config_1.default[networkId].linkToken;
    if (!linkTokenAddress) {
        throw new Error("Please provide the Link contract address.");
    }
    //Get signer information
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];
    //Create connection to LINK token contract and initiate the transfer
    const linkTokenContract = new hre.ethers.Contract(linkTokenAddress, LinkTokenInterface_json_1.default, signer);
    try {
        var transferTransaction = await linkTokenContract.transfer(contractAddr, fundAmount);
    }
    catch (_) {
        throw new Error('Transfer failed. Check whether the Link address is valid or whether your account has enough funds.');
    }
    await transferTransaction.wait(1);
    return {
        amount: fundAmount,
        transactionHash: transferTransaction.hash,
    };
};
//# sourceMappingURL=fund-link.js.map