# motoverse Contract

## modify the .env file

Generate the user private key and EtherScan key into this file, Note: that the key in the example is incomplete

```
AccountKeys="key1,key2"
BscScanKey=""
```

## install depends

npm install

## modify the `hardhat.config.js`

1. Modify `accounts` in the `networks` paragraph
2. Apply for the EtherScan APIkey and modify the `etherscan` paragraph

## compile the contract

compile the contract use this command

```bash
npx hardhat --network <network> compile
```

such as use the eth network compile the contracts

```bash
npx hardhat compile
```

## test contract

```
npx hardhat --network hardhat compile
npx hardhat --network hardhat test 
``` 

## deploy the contract

use the deploy script and constructor arguments env deploy the contract such as use this command deploy the
MILE contract

	console.log("\tContract :", constructorArguments[0]);
	console.log("\tContract :", constructorArguments[1]);
	console.log("\tContract :", constructorArguments[2]);
	console.log("\tContract :", constructorArguments[3]);
	console.log("\tContract :", constructorArguments[4]);
	console.log("\tContract :", constructorArguments[5]);

```bash
npx hardhat --network <network> run scripts/deploy.MILE.js
```

such as use the testnet network deploy the MILE contract

```bash
npx hardhat --network bsc_mainnet run scripts/deploy.MILE.js
```

## verify the contract
### use the verify script
use the verify script and verify arguments env verify the contract such as use this command verify the MILE
contract

```bash
env VerifyArguments="<contract address>" npx hardhat --network <network> run scripts/verify.MILE.js
```

such as use the testnet network verify the MILE contract

```bash
env VerifyArguments="0x66a28BF5aeCFA6270d029E28895F68b1700E4bb2" npx hardhat --network bsc_mainnet run scripts/verify.MILE.js
```

### use the scan graphic interface
Merge contract code flatten command

```bash
npx hardhat flatten <main contract code path> > <xxxxxxxx>.flatten
```

such merge MILE.sol

```bash 
npx hardhat flatten contracts/MILE.sol > MILE.sol.flatten
```

copy the flatten contract file content to scan graphic interface and verify the code


## TODO:




