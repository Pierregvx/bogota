const { ethers, upgrades } = require("hardhat");
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Console } from "console";
import { Address } from "ethereumjs-util";
import { BigNumber, Contract, EventFilter, Event } from "ethers";

async function deploy(name: string, ...params: any) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then((c: Contract) => c.deployed());
}
async function main() {
  let provider = ethers.getDefaultProvider();
  const accounts = await ethers.getSigners();
  console.log(accounts[0].address, accounts[1].address);
  const account = await deploy("Account");
  const dao = await deploy("DAO", account.address);
  await account.connect(accounts[0]).whitelist(accounts[1].address);
  await account.connect(accounts[1]).createAccount("ex");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
