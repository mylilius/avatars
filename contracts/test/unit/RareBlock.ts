import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { getContractAddress } from "ethers/lib/utils";
import { ethers } from "hardhat";

xdescribe("RareBlock Unit Testing", () => {
    let contract: Contract | undefined = undefined;

    before(async() => {
        const factory = await ethers.getContractFactory("RareBlock");
        contract = await factory.deploy("0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000");
        await contract.deployed();
    })
    it(`Should Deploy Contract`, async() => {
        const [signer] = await ethers.getSigners();
        const count = await signer.getTransactionCount();
        const _expectedAddress = getContractAddress({
            from: signer.address,
            nonce: count - 1
        });
        expect(contract!.address).to.be.equal(_expectedAddress);
    })
    it("Should Have Roles", async() => {
        const DEFAULT_ADMIN_ROLE: string = await contract?.callStatic.DEFAULT_ADMIN_ROLE();
        const CONTENT_ROLE: string = await contract?.callStatic.CONTENT_ROLE();
        const AVATAR_MANAGER_ROLE: string = await contract?.callStatic.AVATAR_MANAGER_ROLE();
        const LOCKED_ROLE: string = await contract?.callStatic.LOCKED_ROLE();

        const [signer] = await ethers.getSigners();

        expect(await contract?.callStatic.hasRole(DEFAULT_ADMIN_ROLE, signer.address)).to.be.true;
        expect(await contract?.callStatic.hasRole(CONTENT_ROLE, signer.address)).to.be.true;
        expect(await contract?.callStatic.hasRole(AVATAR_MANAGER_ROLE, "0x0000000000000000000000000000000000000000")).to.be.true;
        expect(await contract?.callStatic.hasRole(LOCKED_ROLE, "0x0000000000000000000000000000000000000000")).to.be.true;
    })
    it("Should Have 0 Tokens", async() => {
        expect(await contract?.callStatic.numberBlocks()).to.be.equal(BigNumber.from(0));
    })
    it("Should Fail to Mint a Block", async() => {
        try {
            const randomUser = ethers.Wallet.createRandom();
            const _mint = await contract?.createBlock(randomUser.address, 'https://avatars.mylilius.com/assets');
        } catch (err: any) {
            expect(err.toString().includes('Access Denied'));
            expect(await contract?.callStatic.numberBlocks()).to.be.equal(BigNumber.from(0));
        }
    })
    
})