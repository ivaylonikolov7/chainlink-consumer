import { HardhatRuntimeEnvironment } from "hardhat/types";
declare module "mocha" {
    interface Context {
        hre: HardhatRuntimeEnvironment;
    }
}
export declare function useEnvironment(): void;
//# sourceMappingURL=helpers.d.ts.map