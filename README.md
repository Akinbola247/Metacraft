# contract 
The contract is basically shows different error handling implementation i.e require, assert, & revert 
## Deposit Function
The `deposit` function allows users to deposit a value into the contract. It incorporates `require` to ensure that the deposited amount is greater than 1 and updates balance saved in state
## Withdraw Function
The withdraw function allows users to withdraw a value from the contract. It uses `assert` to check that the withdrawal amount is less than or equal to the balance in the contract after which the balance state is updated
## TriggerRevert function
The function utilizes a `revert` condition if the parameter passed in is zero. if the condition `amount == 0` is met, the transaction reverts and the remaining gas is refunded, else the function call goes through