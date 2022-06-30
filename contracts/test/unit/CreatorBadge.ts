import { doesNotReject } from "assert";
import { expect } from "chai";
import { BigNumber, Contract, Signer, Wallet } from "ethers";
import { getContractAddress } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("Create Badge Unit Testing", () => {
    let contract: Contract | undefined = undefined;
    let paymentManager: Contract | undefined = undefined;
    let signer: Signer;
    let wallet: Wallet;

    before(async() => {
        console.log(ethers.getDefaultProvider());
        wallet = Wallet.createRandom();
        // for (let i = 0; i < 10; i++) wallets[i] = Wallet.createRandom();
        const _designer = Wallet.createRandom();
        const [_signer] = await ethers.getSigners();
        signer = _signer;
        const factoryPs = await ethers.getContractFactory('PaymentManager');
        paymentManager = await factoryPs.deploy([_signer.address, _designer.address], [88, 12]);
        await paymentManager.deployed();

        const factory = await ethers.getContractFactory("CreatorBadge");
        contract = await factory.deploy([], [], paymentManager.address, 6700000000000000, '');
        await contract.deployed();
    })
    it('Should Send 1 ETH to Wallet', async() => {
        let txHash = await signer!.sendTransaction({
            to: wallet.address,
            value: ethers.utils.parseEther("1")
        })
        expect(await ethers.getDefaultProvider().getBalance(wallet.address)).to.be.equal(ethers.utils.parseEther('1'));
    })
    it('Should Mint an NFT', async() => {
        const _contract: Contract = contract!.connect(wallet.connect(ethers.getDefaultProvider()));
        const _purchaseTxHash = await _contract.purchaseBadgeNative({
            value: 6700000000000000
        });
    })
    it('Should have an NFT', async () => {
        expect(await contract?.callStatic.balanceOf(wallet.address)).to.be.equal(BigNumber.from(1));
    })
})