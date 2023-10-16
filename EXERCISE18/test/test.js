const { assert } = require('chai');
const { ethers } = require('hardhat');

let AdvancedToken;

describe('AdvancedToken', function () {
  let advancedToken;

  beforeEach(async function () {
    AdvancedToken = await ethers.getContractFactory('Token');
    advancedToken = await AdvancedToken.deploy('Test Token', 'TT', 10000);
    await advancedToken.deployed();
  });

  it('should mint tokens correctly and reflect in the balance', async function () {
    const initialBalance = await advancedToken.balanceOf(await advancedToken.owner());
    const amount = 1000;
    await advancedToken.mint(await advancedToken.accounts[1], amount);
    const finalBalance = await advancedToken.balanceOf(await advancedToken.accounts[1]);
    assert.equal(
      finalBalance.toNumber(),
      amount,
      'Tokens were not minted correctly or reflected in the balance'
    );
  });

  it('should not mint tokens beyond the maximum supply', async function () {
    try {
      const maxSupply = 10000;
      const initialSupply = await advancedToken.totalSupply();
      const amount = maxSupply - initialSupply + 1;
      await advancedToken.mint(await advancedToken.accounts[1], amount);
      assert.fail('should have thrown an error');
    } catch (error) {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
    }
  });

  it('should allow users to burn their tokens and reflect the reduced total supply', async function () {
    const initialBalance = await advancedToken.balanceOf(await advancedToken.owner());
    const amount = 500;
    await advancedToken.burn(amount);
    const finalBalance = await advancedToken.balanceOf(await advancedToken.owner());
    assert.equal(
      finalBalance.toNumber(),
      initialBalance.toNumber() - amount,
      'Tokens were not burned correctly or did not reflect the reduced total supply'
    );
  });

  it('should lock and unlock tokens correctly', async function () {
    const amount = 200;
    await advancedToken.lockTokens(await advancedToken.accounts[1], amount);
    const lockedBalance = await advancedToken.balanceOf(await advancedToken.accounts[1]);
    assert.equal(lockedBalance.toNumber(), 0, 'Tokens were not locked correctly');

    await advancedToken.unlockTokens(await advancedToken.accounts[1]);
    const unlockedBalance = await advancedToken.balanceOf(await advancedToken.accounts[1]);
    assert.equal(unlockedBalance.toNumber(), amount, 'Tokens were not unlocked correctly');
  });

  it('should not allow the transfer of locked tokens', async function () {
    const amount = 200;
    await advancedToken.lockTokens(await advancedToken.accounts[1], amount);

    try {
      await advancedToken.transfer(await advancedToken.accounts[2], amount);
      assert.fail('should have thrown an error');
    } catch (error) {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
    }
  });
});


