const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));

const { ethers } = require("hardhat");
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Console } from "console";
import { Address } from "ethereumjs-util";
import { BigNumber, Contract } from "ethers";
// @ts-ignore


async function deploy(name: string, ...params: any) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then((c: Contract) => c.deployed());
}

describe("init", function () {
  let dao: Contract;
  let account: Contract;
  let collect: Contract;

  let acc1 : SignerWithAddress;
  let acc2 : SignerWithAddress;
  let acc3 : SignerWithAddress;

  beforeEach(async () => {
    [
      acc1,
      acc2,
      acc3
        
    ] = await ethers.getSigners();

    
    account = await deploy("Account")
    collect = await deploy("PunkCity")
    dao = await deploy("DAO",account.address,collect.address);
    await collect.setDao(dao.address);
  })

  describe("Account",function(){
    it("okok",async function(){
      console.log("=>",acc1.address,acc2.address);
      await account.connect(acc1).whitelist(acc2.address);
      await account.connect(acc2).createAccount("ex");
      await collect.connect(acc2).registerPlace(1,1,"");
      await collect.connect(acc2).registerPlace(1,1,"");
      await collect.connect(acc2).registerPlace(1,1,"");
      await collect.connect(acc2).registerPlace(1,1,"");
    })
  })
})


