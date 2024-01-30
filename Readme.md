# DegenToken Smart Contract
DegenToken is an ERC-20 token contract that facilitates token minting, redemption, and burning. The contract incorporates an enum named `itemtype`, representing various item categories that can be redeemed, including `live`, `bagpack`,`gun`, and `ammunition`.

# Contract Overview
Name: DegenToken
Symbol: DGN
Standard: ERC-20
Owner: Ownable

# Key Functions
### Mint Tokens
The mint function empowers the contract owner to generate new tokens and transfer them to a specified address.

### Redeem Tokens for Bagpack
The redeemTokenforBagpack function allows users to exchange tokens for different items, determined by the provided itemtype. Users transfer tokens to the contract in exchange for their chosen item.

### Burn Tokens
The burntoken function enables users to destroy a specified amount of their own tokens.

# Usage Guidelines
- Mint Tokens: The contract owner can create new tokens using the mint function.
- Redeem Tokens for Items: Users can trade tokens for various items (live, bagpack, gun, ammunition) through the redeemTokenforBagpack function.
- Burn Tokens: Users have the ability to destroy (burn) their own tokens using the burntoken function.

# Deployment
Deployed DegenToken contract to the Avalanche Fuji Testnet.

