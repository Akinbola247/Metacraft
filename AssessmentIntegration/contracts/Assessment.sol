// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    bool contractState;
   uint public myCount;

    event Countupdated(uint256 amount);

    constructor() payable {
        owner = payable(msg.sender);
        contractState = true;
    }

    function getMycount() public view returns(uint256){
        return myCount;
    }
    function getContractState()public view returns(bool) {
        return contractState;
    }
    function getOwner() public view returns(address){
        return owner;
    }

    function updatecount() public {
        require(msg.sender == owner, 'not_authorized');
        require(contractState == true, 'contract paused');
        myCount += 1;
        emit Countupdated(1);
    }

    function downgradeCount() public {
        require(msg.sender == owner, 'not_authorized');
        require(contractState == true, 'contract paused');
        require(myCount > 0, 'error');
        myCount -= 1;
         emit Countupdated(1);
    }

    function activateContract()public{
        require(msg.sender == owner, 'not_authorized');
        contractState = true;
    }
    function deactivateContract()public{
        require(msg.sender == owner, 'not_authorized');
        contractState = false;
    }
}
