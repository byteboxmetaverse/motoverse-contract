const {ethers} = require("hardhat");

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, ms)
    });
}

async function main() {
    // Construction parameters
    const constructorArguments = [
    ];

    const {deploy} = deployments;
    const [deployer] = await ethers.getSigners();
    console.log('deployer is ', deployer.address);

    // deploy
    const contract = await deploy('MILE', {
        from: deployer.address,
        args: constructorArguments,
        log: true,
        gasLimit: 8000000,
    }).then(s => ethers.getContractAt(s.abi, s.address, deployer));
    console.log('1. V1 MILE has deployed at:', contract.address);
    console.log('    wait MILE deployed, it will token one minute or more，Please be patient');
    await contract.deployed();
    console.log('2. V1 MILE has deployed');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
