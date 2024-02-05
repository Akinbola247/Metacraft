// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract Mytoken is ERC20 {
    address ownerAddress;
    constructor(string memory name, string memory symbol, address owner, uint256 amount) ERC20(name, symbol){
        ownerAddress = owner;
        _mint(address(this), amount * (10**decimals()));
    }

   function mintToken(uint _amount, address receiver)public {
    require(msg.sender == ownerAddress, "Not_authorized");
            _mint(receiver, _amount * (10**decimals()));
   }
    function burnToken(uint amount)public{
        _burn(msg.sender, amount);
    }
    function transfer(uint amount, address recipient) public {
        _transfer(msg.sender, recipient, amount);
    }
}