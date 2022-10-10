/* eslint-disable prettier/prettier */
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-contract-sizer";
import * as dotenv from "dotenv";
import { allowedNodeEnvironmentFlags } from "process";

dotenv.config();

const { MNEMONIC, POLYGONSCAN_API_KEY, MUMBAI_API_URL, RINKEBY_API_URL,OPT } = process.env;
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.9",
        settings: {
            // evmVersion: "constantinople",
            evmVersion: "istanbul",
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        mumbai: {
            url: MUMBAI_API_URL || "",
            accounts: {
                mnemonic: MNEMONIC,
                path: "m/44'/60'/0'/0",
            },

        },
        rinkeby: {
            url: RINKEBY_API_URL || "",
            accounts: {
                mnemonic: MNEMONIC,
                path: "m/44'/60'/0'/0",
            },
        },
        optimismtest: {
          url: OPT || "",
            accounts: {
                mnemonic: MNEMONIC,
                path: "m/44'/60'/0'/0",
            },

        },
        optimism: {
          url: OPT || "",
            accounts: {
                mnemonic: MNEMONIC,
                path: "m/44'/60'/0'/0",
            },

        }
    },

    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },


    gasReporter: {
        enabled: true,
        currency: "EUR",
        token: "MATIC"
    },
  

    etherscan: {
        apiKey: POLYGONSCAN_API_KEY,
    },
};

export default config;