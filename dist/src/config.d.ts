type NetworkConfiguration = {
    name: string;
    linkToken?: string;
    fundAmount: string;
};
declare const networkConfig: {
    [key: string]: NetworkConfiguration;
};
export declare const getNetworkIdFromName: (networkIdName: string) => Promise<string | null>;
export default networkConfig;
//# sourceMappingURL=config.d.ts.map