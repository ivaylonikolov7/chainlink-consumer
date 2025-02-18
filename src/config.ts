type NetworkConfiguration = {
  name: string;
  linkToken?: string;
  fundAmount: string;
};

const networkConfig: {
  [key: string]: NetworkConfiguration;
} = {
  default: {
    name: "hardhat",
    fundAmount: "1000000000000000000",
  },
  "31337": {
    name: "localhost",
    fundAmount: "1000000000000000000",
  },
  "42": {
    name: "kovan",
    linkToken: "0xa36085F69e2889c224210F603D836748e7dC0088",
    fundAmount: "1000000000000000000",
  },
  "4": {
    name: "rinkeby",
    linkToken: "0x01be23585060835e02b77ef475b0cc51aa1e0709",
    fundAmount: "1000000000000000000",
  },
  "1": {
    name: "mainnet",
    linkToken: "0x514910771af9ca656af840dff83e8264ecf986ca",
    fundAmount: "0",
  },
  "5": {
    name: "goerli",
    linkToken: "0x326c977e6efc84e512bb9c30f76e30c160ed06fb",
    fundAmount: "0",
  },
  "11155111": {
    name: "sepolia",
    linkToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    fundAmount: "0",
  },
  "137": {
    name: "polygon",
    linkToken: "0xb0897686c545045aFc77CF20eC7A532E3120E0F1",
    fundAmount: "0",
  },
  "80001": {
    name: "mumbai",
    linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    fundAmount: "0",
  },
};

export const getNetworkIdFromName = async (networkIdName: string) => {
  for (const id in networkConfig) {
    if (networkConfig[id]["name"] == networkIdName) {
      return id;
    }
  }
  return null;
};

export default networkConfig;
