pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AdvancedToken is IERC20 {
...

    function lockTokens(address _user, uint256 _time) public onlyOwner {
        lockedUntil[_user] = block.timestamp + _time;
    }

    function burn(uint256 _amount) public {
        if (lockedUntil[msg.sender] >= block.timestamp) {
            revert("Tokens are locked");
}
        require(balances[msg.sender] >= _amount, "Not enough tokens");        
        balances[msg.sender] -= _amount;
        totalSupply -= _amount;

        emit Transfer(msg.sender, address(0), _amount);
    }
...
}
