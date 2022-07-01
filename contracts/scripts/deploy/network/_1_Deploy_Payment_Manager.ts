import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import getAbi from "../../abi";
import { IData, IReturn } from "../types";

const log = console.log;
const error = console.error;

const contractName: string = 'PaymentManager';

async function main() : Promise<IReturn> {
    log(`Starting ${contractName} Deployment`);

    try {
        const factory: ContractFactory = await ethers.getContractFactory('PaymentManager');
        const contract: Contract = await factory.deploy([(await ethers.getSigners())[0].address], [100]);
        const deployed: Contract = await contract.deployed();

        let data: IData = {
            name: contractName,
            address: deployed.address,
            timestamp: new Date().toISOString(),
            abi: getAbi(deployed.interface)
        };

        return {
            contract: deployed,
            data
        };

    } catch (err) {
        error(`Error Deploying ${contractName}`);
        throw err;
    }
}

export default main;