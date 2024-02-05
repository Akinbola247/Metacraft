# Assessment contract

This is a simple smart contract written in Solidity. The contract allows the owner to manage a count, control the contract state (pause/unpause), and retrieve contract-related information.

## Functions
- getMycount():
Returns the current count.

- getContractState():
Returns the current state of the contract (paused or active).

- getOwner():
Returns the address of the contract owner.

- updatecount():
Increases the count by 1. Only the owner can call this function when the contract is active.

- downgradeCount():
Decreases the count by 1. Only the owner can call this function when the contract is active.

- activateContract():
Unpauses the contract, allowing count-related operations. Only the owner can call this function.

- deactivateContract():
Pauses the contract, preventing count-related operations. Only the owner can call this function.