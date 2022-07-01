import { ethers, hardhatArguments } from "hardhat";
import { HardhatArguments } from "hardhat/types";
import FileStorage from "../filestorage";

import _1_Deploy_Payment_Manager from './network/_1_Deploy_Payment_Manager';
import _2_Deploy_Creator_Badge from './network/_2_Deploy_Creator_Badge';
import _3_Deploy_Rare_Lock_Box from './network/_3_Deploy_Rare_LockBox';
import _4_Deploy_Avatar_Manager from './network/_4_Deploy_Avatar_Manager';
import _5_Deploy_Rare_Block from './network/_5_Deploy_Rare_Block';
import { IReturn } from "./types";

const log = console.log;
const error = console.error;

async function main() {
    const _network: string | undefined = hardhatArguments.network;
    const _fileStorage = new FileStorage();
    const _currentVersion: string = _fileStorage.getDir(__dirname, _network!);

    try {
        /// 1 Payment Splitter
        const payment: IReturn = await _1_Deploy_Payment_Manager();
        /// 2 Deploy Creator Badge 
        const creator: IReturn = await _2_Deploy_Creator_Badge(payment.contract.address);
        /// 3 Deploy Rare Lock Box
        const lockbox: IReturn = await _3_Deploy_Rare_Lock_Box((await ethers.getSigners())[0].address);
        /// 4 Deploy Avatar Manager
        const manager: IReturn = await _4_Deploy_Avatar_Manager(creator.contract.address);
        /// 5 Deploy Rare Block
        const rare: IReturn = await _5_Deploy_Rare_Block(manager.contract.address, lockbox.contract.address);
        /// 6 Assign Rare Address to Manager
        const txHash: string = await manager.contract.updateRareBlockAddress(rare.contract.address);
        console.log("Tx Hash: ", txHash);

        const _data: {[key: string]: IReturn} = {
            payment,
            creator,
            lockbox,
            manager,
            rare
        };
        _fileStorage.writeFile(__dirname, `${_network!}/${_currentVersion}`, 'mylilius', JSON.stringify(_data));
    } catch (err: any) {
        error(err.toString());
        throw err;
    }
}

main()
    .catch((error: any) => {
        error("Error: ", error);
        process.exitCode = 1;
    })
