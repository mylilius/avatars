import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import getAbi from "../../abi";
import { IData, IReturn } from "../types";

const log = console.log;
const error = console.error;

const contract: string = 'AvatarFactory';

async function main() : Promise<IReturn> {
    log(`Starting ${contract} Deployment`);

    try {
        const factory: ContractFactory = await ethers.getContractFactory('AvatarFactory');
        const contract: Contract = await factory.deploy();
        const deployed: Contract = await contract.deployed();

        let data: IData = {
            name: 'AvatarFactory',
            address: deployed.address,
            timestamp: new Date().toISOString(),
            abi: getAbi(deployed.interface)
        };

        return {
            contract: deployed,
            data: data
        };

    } catch (err) {
        error(`Error Deploying ${contract}`);
        throw err;
    }
}

export default main;