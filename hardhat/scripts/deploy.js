const hre = require("hardhat");

async function main() {

  const voter = await hre.ethers.deployContract("contracts/Voting.sol:Voting");

  await voter.waitForDeployment();

  console.log(
    `Voting deployed to ${voter.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});