"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LinkToken_json_1 = __importDefault(require("@appliedblockchain/chainlink-contracts/bytecode/LinkToken.json"));
const LinkToken_json_2 = __importDefault(require("@appliedblockchain/chainlink-contracts/abi/LinkToken.json"));
const chai_1 = require("chai");
const helpers_1 = require("./helpers");
async function deployLinkToken(provider, signer) {
    const linkTokenDeployer = new provider.ContractFactory(LinkToken_json_2.default, LinkToken_json_1.default, signer);
    const linkToken = await linkTokenDeployer.deploy();
    await linkToken.deployTransaction.wait();
    return linkToken;
}
describe("Integration", function () {
    (0, helpers_1.useEnvironment)();
    describe("fundLink", function () {
        it("should throw an error if a network is unsupported", async function () {
            const replacedNetwork = this.hre.network.name;
            this.hre.network.name = "dummy network";
            await chai_1.assert.isRejected(this.hre.fundLink(this.hre, "dummy address"), `The network with the name "dummy network" is not supported.`);
            this.hre.network.name = replacedNetwork;
        });
        it("should return error that requests a Link token address if none was provided and it does not exist on default configuration", function () {
            return chai_1.assert.isRejected(this.hre.fundLink(this.hre, "dummy address"), `Please provide the Link contract address.`);
        });
        it("should return an error if the Link token address is invalid", function () {
            return chai_1.assert.isRejected(this.hre.fundLink(this.hre, "dummy address", "100", "invalid token address"), "Transfer failed. Check whether the Link address is valid or whether your account has enough funds.");
        });
        it("should transfer a Link amount to an account", async function () {
            const { ethers } = this.hre;
            const accounts = await ethers.getSigners();
            const linkToken = await deployLinkToken(ethers, accounts[0]);
            const fundAmount = "2000000000000000000";
            const receipt = await this.hre.fundLink(this.hre, accounts[1].address, fundAmount, linkToken.address);
            const balance = await linkToken.balanceOf(accounts[1].address);
            chai_1.assert.equal(receipt.amount, fundAmount);
            chai_1.assert.equal(fundAmount, balance.toString());
            chai_1.assert.equal(66, receipt.transactionHash.length);
        });
        it("should transfer the default hardhat Link amount to an account", async function () {
            const { ethers } = this.hre;
            const accounts = await ethers.getSigners();
            const linkToken = await deployLinkToken(ethers, accounts[0]);
            const receipt = await this.hre.fundLink(this.hre, accounts[1].address, "", linkToken.address);
            const balance = await linkToken.balanceOf(accounts[1].address);
            const defaultAmount = "1000000000000000000";
            chai_1.assert.equal(receipt.amount, defaultAmount);
            chai_1.assert.equal(defaultAmount, balance.toString());
            chai_1.assert.equal(66, receipt.transactionHash.length);
        });
    });
});
//# sourceMappingURL=integrations.test.js.map