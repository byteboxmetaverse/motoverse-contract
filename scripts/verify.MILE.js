const {ethers} = require("hardhat");

async function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('');
		}, ms)
	});
}

async function main() {
	let paramsCommand = [];
	if (typeof (process.env.VerifyArguments) == "undefined") {
		console.error('the Verify Arguments  env in not set');
		process.exit(1);
	} else {
		// Remove Spaces, quotes, etc
		paramsCommand = process.env.VerifyArguments.replace(new RegExp(" ", 'g'), "").replace(new RegExp("'", 'g'), "").replace(new RegExp("\"", 'g'), "").split(",");
		if (paramsCommand.length !== 1) {
			console.error('the Verify Arguments must 1 param');
			process.exit(1);
		}
	}

	const contractAddress = paramsCommand[0];

	// Construction parameters
	const constructorArguments = [
	];

	console.log("VerifyArguments info is as follows:");
	console.log("\tContract Address:", contractAddress);

	const [deployer] = await ethers.getSigners();
	console.log('deployer is ', deployer.address);

	// deployed check
	const Factory = await ethers.getContractFactory("contracts/MILE.sol:MILE");
	const contract = new ethers.Contract(contractAddress, Factory.interface, ethers.provider);
	await contract.deployed();
	console.log('1. V1 MILE has deployed at:', contract.address);

	// verify
	await run("verify:verify", {
		address: contract.address,
		//constructorArguments: constructorArguments
	});

	console.log('2. V1 MILE has verified');
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
