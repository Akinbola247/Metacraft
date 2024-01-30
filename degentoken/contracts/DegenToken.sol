// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {
    enum itemtype{live, bagpack, gun, ammunition}

    constructor() ERC20("Degen", "DGN") {}

    function mint(address to, uint256 amount) public onlyOwner {
            _mint(to, amount);
    }
    
    function redeemTokenforBagpack(itemtype _selection, uint amount) public returns (bool) {
        if(_selection == itemtype.live){
            _transfer(msg.sender, address(this), amount);
        }else if (_selection == itemtype.bagpack){
            _transfer(msg.sender, address(this), amount);

        }
        else if (_selection == itemtype.gun){
           _transfer(msg.sender, address(this), amount); 
        }
         else if (_selection == itemtype.ammunition){
            _transfer(msg.sender, address(this), amount); 
        }
        return true;
    }

    function burntoken(uint amount) public {
        _burn(msg.sender, amount);
    }
}
