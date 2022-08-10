# mainnet

```
# 1.0
## The initial release
contract:0xf126aab92B591D86e091bE9f45CA2C6414AD78CA
owner:0x94f0745174a2f6939f21ac87cab33606a954bbdc
code:https://bscscan.com/address/0xf126aab92B591D86e091bE9f45CA2C6414AD78CA#code

# 1.1
## Increase the total service fee cap
contract:0xd013d842fd4f9C7D4ceE2DA82bE34C2054A05e92
owner:0x94f0745174a2f6939f21ac87cab33606a954bbdc
code:https://bscscan.com/address/0xd013d842fd4f9C7D4ceE2DA82bE34C2054A05e92#code
```

```
env npx hardhat --network bsc_mainnet run scripts/deploy.MILE.js
env VerifyArguments="0xd013d842fd4f9C7D4ceE2DA82bE34C2054A05e92" npx hardhat --network bsc_mainnet run scripts/verify.MILE.js
```