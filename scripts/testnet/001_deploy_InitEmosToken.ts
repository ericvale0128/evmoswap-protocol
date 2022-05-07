import {ethers} from "hardhat";
import { parseUnits } from "ethers/lib/utils";

async function main() {

    const emosToken = await ethers.getContract("EMOToken");
    const masterChef = await ethers.getContract("MasterChef");
    const multiFeeDistribution = await ethers.getContract("MultiFeeDistribution");

    // 0 Set dev minter 
    // await emosToken.addMinter(process.env.TESTNET_DEPLOYER);
    // console.log('Set minter done!')

    // 1 set minter
    // await emosToken.addMinter(multiFeeDistribution.address);
    // console.log('Set multiFeeDistribution minter done!')

    // 2 add Masterchef as minter of EmosToken
    await emosToken.addMinter(masterChef.address);
    console.log("Add Masterchef as minter of EmosToken, masterChef=", masterChef.address);

    // 3 init mint tokens
    // await emosToken.mint(process.env.TESTNET_DEPLOYER, parseUnits("10000000", 18));
    // console.log('Mint token done!')
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

