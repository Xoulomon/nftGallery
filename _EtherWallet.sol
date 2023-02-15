//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Etherwallet{
    address payable public owner;

    constructor(){
        owner = payable(msg.sender);
    }
    
    function deposit() external payable {

    }

    function withdraw(uint256 _amount) external{
        require(msg.sender == owner, "Caller is not owner");
        owner.transfer(_amount);
    }

    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
}