// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ErrorHandling {
    uint256 public balance;
    function deposit(uint256 amount) external {
        require(amount > 1, "Amount must be greater than zero");
        balance += amount;
    }

    function withdraw(uint256 amount) external {
        assert(amount <= balance);
        balance -= amount;
    }

    function triggerRevert(uint amount) external pure {
        if(amount == 0){
        revert("This function intentionally triggers a revert");
        }
    }
}