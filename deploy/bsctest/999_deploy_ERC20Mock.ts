import { run } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { parseUnits } from "ethers/lib/utils";

const func: DeployFunction = async({getNamedAccounts, deployments, network}) => {
  console.log("> (999) Deploy ERC20Mock:");
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // Multicall
  const mockArgs = ['UST Mock', 'UST', parseUnits("50000000", 18)]
  const resultMulti = await deploy("ERC20Mock", {
    log: true,
    from: deployer,
    args: mockArgs
  });

  // Verify contract
  if(resultMulti.newlyDeployed) {
    if (network.live) {
      await run("verify:verify", {
        address: resultMulti.address,
        constructorArguments: mockArgs,
      });
    }
  }
}

export default func;

func.skip = async (hre) => {
  return hre.network.name != 'bsctestS';
};

func.tags = ["ERC20Mock"];