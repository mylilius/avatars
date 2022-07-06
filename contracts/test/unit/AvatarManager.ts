import { expect } from 'chai';
import { BigNumber, Contract, Signer, Wallet } from 'ethers';
import { ethers } from 'hardhat';

describe("AvatarManager Unit Testing", () => {
    let contract: Contract | undefined = undefined;
    let rareContract: Contract | undefined = undefined;
    let signer: Signer | undefined = undefined;
    before(async() => {

        const [_signer] = await ethers.getSigners();
        signer = _signer;
        const _designer = Wallet.createRandom();
        const factoryPs = await ethers.getContractFactory('PaymentManager');
        const paymentManager = await factoryPs.deploy([_signer.address, _designer.address], [88, 12]);
        await paymentManager.deployed();

        const factory = await ethers.getContractFactory("CreatorBadge");
        const creator = await factory.deploy([], [], paymentManager.address, 6700000000000000, '');
        await creator.deployed();

        const txHash = await creator.purchaseBadgeNative({
            value: ethers.utils.parseEther('0.05')
        });

        const managerFactory = await ethers.getContractFactory('AvatarManager');
        contract = await managerFactory.deploy(creator.address);
        await contract.deployed();

        const lockboxFactory = await ethers.getContractFactory('RareBlockLockBox');
        const lockBoxContract = await lockboxFactory.deploy(_signer.address);
        await lockBoxContract.deployed();

        const rareFactory = await ethers.getContractFactory("RareBlock");
        rareContract = await rareFactory.deploy(contract.address, lockBoxContract.address);
        await rareContract.deployed();

        await contract.updateRareBlockAddress(rareContract.address);
    })
    it("Should Mint NFT", async() => {
        const mintNFT = await contract?.createRareBlock("ipfs://something");
        const tokenURI: string = await rareContract?.callStatic.tokenURI(BigNumber.from(0));
        expect(Number(await rareContract?.callStatic.balanceOf(await signer?.getAddress()))).to.be.equal(1);
    })
    it("Should Mint NFT", async() => {
        const mintNFT = await contract?.createRareBlock("ipfs://something");
        const tokenURI: string = await rareContract?.callStatic.tokenURI(BigNumber.from(0));
        expect(Number(await rareContract?.callStatic.balanceOf(await signer?.getAddress()))).to.be.equal(2);
    })
    it("Should Mint NFT", async() => {
        const mintNFT = await contract?.createRareBlock("ipfs://something");
        const tokenURI: string = await rareContract?.callStatic.tokenURI(BigNumber.from(0));
        expect(Number(await rareContract?.callStatic.balanceOf(await signer?.getAddress()))).to.be.equal(3);
    })
    it("Should Mint NFT", async() => {
        const mintNFT = await contract?.createRareBlock("ipfs://something");
        const tokenURI: string = await rareContract?.callStatic.tokenURI(BigNumber.from(0));
        expect(Number(await rareContract?.callStatic.balanceOf(await signer?.getAddress()))).to.be.equal(4);
    })

})