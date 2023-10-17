
const hre = require("hardhat");

async function main() {
  // deploying ERC20 token
  const [owner, addr1] = await ethers.getSigners();

  const AdvancedToken = await hre.ethers.getContractFactory("AdvancedToken");
  console.log('Deploying AdvancedToken...');
  const token = await advancedToken.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });