require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require('dotenv').config()

task("accounts", "Prints the list of accounts", async () => {
	const accounts = await ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
	namedAccounts: {
		deployer: {
			default: 0,
		},
		governor: {
			default: 1,
		},
	},
	etherscan: {
		apiKey: {
			bsc_testnet: process.env.BscScanKey,
			bsc_mainnet: process.env.BscScanKey,
		},
		customChains: [
			{
				network: "bsc_testnet",
				chainId: 97,
				urls: {
					apiURL: "https://api-testnet.bscscan.com/api",
					browserURL: "https://testnet.bscscan.com/",
				}
			},
			{
				network: "bsc_mainnet",
				chainId: 56,
				urls: {
					apiURL: "https://api.bscscan.com/api/",
					browserURL: "https://bscscan.com/",
				}
			}
		]
	},
	networks: {
		rinkeby: {
			url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
			accounts: process.env.AccountKeys.split(",")
		},
		mainnet: {
			url: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
			accounts: process.env.AccountKeys.split(",")
		},
		bsc_mainnet: {
			chainId: 56,
			url: 'https://bsc-dataseed1.defibit.io/',
			accounts: process.env.AccountKeys.split(",")
		},
		bsc_testnet: {
			chainId: 97,
			url: 'https://data-seed-prebsc-2-s1.binance.org:8545/',
			accounts: process.env.AccountKeys.split(",")
		},
	},

	solidity: {
		compilers: [
			{
				version: "0.8.0",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					},
					"outputSelection": {
						"*": {
							"*": [
								"evm.bytecode",
								"evm.deployedBytecode",
								"abi"
							]
						}
					},
					"metadata": {
						"useLiteralContent": true
					},
					"libraries": {}
				}
			},
			{
				version: "0.7.0",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					},
					"outputSelection": {
						"*": {
							"*": [
								"evm.bytecode",
								"evm.deployedBytecode",
								"abi"
							]
						}
					},
					"metadata": {
						"useLiteralContent": true
					},
					"libraries": {}
				}
			},
			{
				version: "0.6.12",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					}
				}
			},
			{
				version: "0.6.6",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					}
				}
			},
			{
				version: "0.5.16",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					}
				}
			},
			{
				version: "0.5.5",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					}
				}
			},
			{
				version: "0.4.22",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					}
				}
			}
		],
		settings: {
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	},
	mocha: {
		timeout: 1200000
	}
};
