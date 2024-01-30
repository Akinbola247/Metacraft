const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Unit Test For the token contract", function() {
    async function deploytokenFixture() {
        const [ owner, user, user2 ] = await ethers.getSigners();
        const token = await ethers.getContractFactory("DegenToken");
        const tokencontract = await token.deploy();
        console.log('deployed at', tokencontract.address)
        return {tokencontract, owner, user, user2};
    }

    describe("Minting token", function () {
        it("Should successfully mint token to address", async function () {
            const {tokencontract, owner, user} = await loadFixture(deploytokenFixture);
            await tokencontract.connect(owner).mint(owner.address, ethers.utils.parseEther("50"));
            expect(await tokencontract.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("50"));
        });
    });
    describe("Transfer token", function () {
        it("Should transfer token", async function () {
            const {tokencontract, owner, user, user2} = await loadFixture(deploytokenFixture);
            await tokencontract.connect(owner).mint(user.address, ethers.utils.parseEther("50"));

            await tokencontract.connect(user).transfer(user2.address, ethers.utils.parseEther("20"));
            expect(await tokencontract.balanceOf(user.address)).to.equal(ethers.utils.parseEther("30"));
        });
    })

    describe("Burn token", function () {
        it("Should transfer token", async function () {
            const {tokencontract, owner, user, user2} = await loadFixture(deploytokenFixture);
            await tokencontract.connect(owner).mint(user.address, ethers.utils.parseEther("50"));
            await tokencontract.connect(user).burntoken(ethers.utils.parseEther("10"));
            expect(await tokencontract.balanceOf(user.address)).to.equal(ethers.utils.parseEther("40"));
        });
    })

    describe("Redeem token", function () {
        it("Should redeem token", async function () {
            const {tokencontract, owner, user, user2} = await loadFixture(deploytokenFixture);
            await tokencontract.connect(owner).mint(user.address, ethers.utils.parseEther("50"));
            await tokencontract.connect(user).redeemTokenforBagpack(0, ethers.utils.parseEther("1"));
            expect(await tokencontract.balanceOf(user.address)).to.equal(ethers.utils.parseEther("49"));
        });
    })

})