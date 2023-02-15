//SPDX-License-Indentifier: MIT;
pragma solidity ^0.8.17;

import"https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.1/contracts/token/ERC20/extensions/ERC20Capped.sol";
import"https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.1/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract XoulmonToken is ERC20, ERC20Capped, ERC20Burnable{
    address payable public owner;
    event tokenMinted(uint256 _amount);


    constructor(uint256 cap) ERC20("Xoulomon","XOL") ERC20Capped(cap*(10**decimals())){
        owner = payable(msg.sender);
        _mint(owner,1000*(10**decimals()));
    }

    function _mint(address account, uint256 amount) internal virtual override(ERC20, ERC20Capped) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    function issueToken(uint256 _amount) external {
        require(owner == msg.sender, " Caller is not owner");
        _mint(owner,_amount*(10**decimals()));
        emit tokenMinted(_amount);
    }

    function burn5percentofTransfer(address to, uint256 _amount)external {
        transfer(to,((_amount*(10**decimals())*95)/100));
        burn((_amount*(10**decimals())*5)/100);
    }
}
 

 
