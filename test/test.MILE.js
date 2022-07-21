// We import Chai to use its asserting functions here.
const {expect} = require("chai");
const {ethers} = require("hardhat");
const {BigNumber} = require("ethers")
const {float} = require("hardhat/internal/core/params/argumentTypes");

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
    let player1;
    let player2;
    let player3;
    let retentionCollector;
    let hardhatMILE;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        [owner, retentionCollector, player1, player2, player3, ...addrs] = await ethers.getSigners();

        // ---------------------------------------------------------------
        //  deploy the MILE;
        // (string memory name, string memory symbol, address issuer, uint256 supply)
        let MILE = await ethers.getContractFactory("contracts/MILE.sol:MILE");
        hardhatMILE = await MILE.deploy();
        hardhatMILE.connect(owner).setRetentionCollector(retentionCollector.address);
        expect(retentionCollector.address).equal(await hardhatMILE.retentionCollector())
    });

    describe("Configuration", function () {
        it("Should set the right owner", async function () {
            expect(await hardhatMILE.owner()).to.equal(owner.address);
        });
    });

    describe("Transfer", function () {
        it("Should transfer and get fee ok", async function () {
            let player1Balance;
            let player2Balance;
            let player3Balance;
            let retentionCollectorBalance;
            let fixPlayer2Balance;
            let fixRetentionCollectorBalance;
            player1Balance = await hardhatMILE.balanceOf(player1.address);
            player2Balance = await hardhatMILE.balanceOf(player2.address);
            player3Balance = await hardhatMILE.balanceOf(player3.address);
            retentionCollectorBalance = await hardhatMILE.balanceOf(retentionCollector.address);
            expect(player1Balance).equal(0);
            expect(player2Balance).equal(0);
            expect(player3Balance).equal(0);
            expect(retentionCollectorBalance).equal(0);

            await hardhatMILE.connect(owner).transfer(player1.address, ethers.utils.parseEther("1"));
            await hardhatMILE.connect(owner).transfer(player2.address, ethers.utils.parseEther("1"));
            player1Balance = await hardhatMILE.balanceOf(player1.address);
            player2Balance = await hardhatMILE.balanceOf(player2.address);
            retentionCollectorBalance = await hardhatMILE.balanceOf(retentionCollector.address);
            expect(player1Balance).equal(ethers.utils.parseEther("1"));
            expect(player2Balance).equal(ethers.utils.parseEther("1"));
            expect(retentionCollectorBalance).equal(0);

            await hardhatMILE.connect(player1).transfer(player2.address, ethers.utils.parseEther("1"));

            player1Balance = await hardhatMILE.balanceOf(player1.address);
            player2Balance = await hardhatMILE.balanceOf(player2.address);
            player3Balance = await hardhatMILE.balanceOf(player3.address);
            retentionCollectorBalance = await hardhatMILE.balanceOf(retentionCollector.address);
            // player 3 does not hold any tokens and should still have a balance of 0
            expect(player3Balance).equal(0);
            // player 1 balance should be 0
            expect(player1Balance).equal(0);
            // player 2 balance should be 1.95
            fixPlayer2Balance = parseFloat(ethers.utils.formatEther(player2Balance)).toFixed(2)
            // retentionCollectorBalance should be 0.03 (3%)
            fixRetentionCollectorBalance = parseFloat(ethers.utils.formatEther(retentionCollectorBalance)).toFixed(2)
            expect(fixPlayer2Balance).equal("1.95");
            expect(fixRetentionCollectorBalance).equal("0.03");

            console.log("player1 balance ", ethers.utils.formatEther(player1Balance));
            console.log("player2 balance ", ethers.utils.formatEther(player2Balance));
            console.log("player3 balance ", ethers.utils.formatEther(player3Balance));
            console.log("retentionCollectorBalance balance ", ethers.utils.formatEther(retentionCollectorBalance));

        });
    });

});