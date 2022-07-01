import { Contract } from "ethers";

export type IData = {
    name: string;
    address: string;
    timestamp: string;
    abi: any;
}

export type IReturn = {
    contract: Contract;
    data: IData
};