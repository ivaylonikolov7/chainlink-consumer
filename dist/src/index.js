"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomiclabs/hardhat-ethers");
const config_1 = require("hardhat/config");
const fund_link_1 = __importDefault(require("./fund-link"));
require("./tasks/fund-link");
require("./type-extensions");
(0, config_1.extendEnvironment)((hre) => {
    hre.fundLink = fund_link_1.default;
});
//# sourceMappingURL=index.js.map