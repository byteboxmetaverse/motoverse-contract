// We import Chai to use its asserting functions here.
const {expect} = require("chai");
const {ethers} = require("hardhat");
const {BigNumber} = require("ethers")

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, ms)
    });
}

function mineBlock() {
    return network.provider.request({method: 'evm_mine', params: []});
}

describe("MILE", function () {

    let owner;
    let operator;
    let operator1;
    let player;
    let hardhatMILE;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        [owner, operator, player, operator1, ...addrs] = await ethers.getSigners();

        // ---------------------------------------------------------------
        //  deploy the MILE;
        // (string memory name, string memory symbol, address issuer, uint256 supply)
        let MILE = await ethers.getContractFactory("contracts/MILE.sol:MILE");
        hardhatMILE = await MILE.deploy(operator.address);

    });

    describe("Configuration", function () {
        it("Should set the right owner", async function () {
            expect(await hardhatMILE.owner()).to.equal(owner.address);
        });
    });

    describe("Mint", function () {
        it("Should Mint ok", async function () {
        });
    });

    describe("Burn", function () {
        it("Should Burn ok", async function () {
        });
    });
});