// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;
contract Token {

    string public constant name = "ERCTOKEN";
    string public constant symbol = "T";
uint256 public constant decimals = 0;

address public owner;
address private _previousOwner;
address private _owner = msg.sender;
uint256 private _lockTime;

event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

modifier onlyOwner() {
    require(msg.sender == owner, "Only the contract owner can call this function");
_;
}

 function mint (uint256 amount )public{
        totalSupply_ += amount;
        balances[msg.sender] += amount;

       }

function burn ( uint256  amount) public {
        require(amount <= balances[msg.sender]);
        totalSupply_ -= amount;
        balances[msg.sender] -= amount;

       }

function geUnlockTime() public view returns (uint256){
return _lockTime;
}

function lock(uint256 time) public virtual onlyOwner{
_previousOwner = _owner;
_owner = address(0); 
_lockTime = block.timestamp + time;
emit OwnershipTransferred (_owner, address(0));
}

function unlock() public virtual {

require(_previousOwner == msg.sender);
 require(block.timestamp < _lockTime);
  emit OwnershipTransferred (_owner, _previousOwner); 
  _owner = _previousOwner;
}

    event Approval(address indexed tokenOwner, address indexed spender,uint tokens);
    event Transfer(address indexed from, address indexed to,uint tokens);

    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;
uint256   totalSupply_ = 100000 wei;


    constructor()   {
        balances[msg.sender] = totalSupply_;  
    }

    function totalSupply() public  view returns (uint256){
        return totalSupply_;
    }

    function balanceOf(address tokenOwner) public  view returns (uint256){
      return balances[tokenOwner];  
    }
     
    function transfer(address receiver, uint256 numTokens) public  returns (bool){

    require(numTokens <= balances[msg.sender] );
        balances[msg.sender] -= numTokens;
        balances[receiver] += numTokens;
emit Transfer(msg.sender,receiver,numTokens);

          return true;
          

       }
}
