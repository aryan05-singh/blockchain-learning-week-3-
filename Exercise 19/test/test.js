const { expect } = require("chai");

describe("AdvancedToken", function () {
  let AdvancedToken;
  let advancedToken;
  let user;

  beforeEach(async () => {
    AdvancedToken = await ethers.getContractFactory("AdvancedToken");
    [user] = await ethers.getSigners();
    advancedToken = await AdvancedToken.deploy();
    await advancedToken.deployed();
  });

  it("should not allow burning locked tokens", async function () {
    await advancedToken.lockTokens(user.address, 1000);

    await expect(() => advancedToken.connect(user).burn(500))
      .to.changeRevert(advancedToken, "Tokens are locked");
  });
});


