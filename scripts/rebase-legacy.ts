// We require the Buidler Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `buidler run <script>` you'll find the Buidler
// Runtime Environment's members available in the global scope.
import { ethers } from "@nomiclabs/buidler";
import { Contract, ContractFactory } from "ethers";
import { StakedToken } from "../typechain/StakedToken";

async function main(): Promise<void> {
  // Buidler always runs the compile task when running scripts through it.
  // If this runs in a standalone fashion you may want to call compile manually
  // to make sure everything is compiled
  // await run("compile");

  // stakedXZC
  const stakedTokenAddress = '0x30183D8025Aa735ea96341b1A17bB1a175AF3608';
  const amount = ethers.BigNumber.from(121125346738000);

  // A Human-Readable ABI; any supported ABI format could be used
  const abi = [
    "function distributeTokens(uint256 amount)",
  ];
  const signer = (await ethers.getSigners())[0];

  const stakedToken = new ethers.Contract(stakedTokenAddress, abi, signer);

  console.log(`Issuing ${amount.toString()} as rewards`);
  await stakedToken.distributeTokens(amount);
  console.log(`Issued ${amount.toString()} as rewards`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
