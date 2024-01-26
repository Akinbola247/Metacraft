// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ErrorHandling {
    uint256 public balance;
    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        assert(balance + amount > balance);
        balance += amount;
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(amount <= balance, "Insufficient funds");
        balance -= amount;
    }

    function triggerRevert(uint amount) external pure {
        if(amount == 0){
        revert("This function intentionally triggers a revert");
        }
    }
}
