import { run } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { parseUnits } from "ethers/lib/utils";

const func: DeployFunction = async({getNamedAccounts, deployments, network, ethers}) => {
  console.log("> (103) Deploy MasterChef:");

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const emoToken = await ethers.getContract("EMOToken");
  const votingEscrow = await ethers.getContract("VotingEscrow");
  const multiFeeDistribution = await ethers.getContract("MultiFeeDistribution");

  // MasterChef
  const masterArgs = [
    emoToken.address,
    '877000', // _stakingPercent
    '70000', // _daoPercent
    '10000', // _safuPercent
    '43000', // _refPercent
    process.env.TESTNET_DEPLOYER, // _daoAddr
    process.env.TESTNET_TREASURY, // _safuAddr
    process.env.TESTNET_TREASURY, // _refAddr
    process.env.TESTNET_TREASURY, // _feeAddr
    multiFeeDistribution.address,
    parseUnits("3.25", 18),
    votingEscrow.address
  ]; 

  const resultMaster = await deploy("MasterChef", {
    log: true,
    from: deployer,
    args: masterArgs,
  });

  if(resultMaster.newlyDeployed) {
    if (network.live) {
      await run("verify:verify", {
        address: resultMaster.address,
        constructorArguments: masterArgs,
      });
    }
  }
}

export default func;

func.skip = async (hre) => {
  return hre.network.name != 'testnets';
};

func.tags = ["MasterChef"];
func.dependencies = ["EMOToken", "MultiFeeDistribution"]