import { hardhatArguments } from "hardhat";
import FileStorage from "../filestorage";

import _1_Deploy_Avatar_Governor from './mylilius/_1_Deploy_Governor';
import _2_Deploy_Avatar_Factory from './mylilius/_2_Deploy_Avatar_Factory';
import { IData, IReturn } from "./types";

const log = console.log;
const error = console.error;

async function main() {
    const _network: string | undefined = hardhatArguments.network;
    const _fileStorage = new FileStorage();
    const _currentVersion: string = _fileStorage.getDir(__dirname, _network!);

    try {
        /// 1 Deploy Governor - MyLilius
        const governor: IReturn = await _1_Deploy_Avatar_Governor();
        /// 2 Deploy Avatar Factory - MyLilius
        const factory: IReturn = await _2_Deploy_Avatar_Factory();
        const _data: {[key: string]: IData} = {
            governor: governor.data,
            factory: factory.data
        };

        const _addresses: {[key: string]: string} = {
            governor: governor.data.address,
            factory: factory.data.address
        };

        _fileStorage.writeFile(__dirname, `${_network!}/${_currentVersion}`, 'data.json', JSON.stringify(_data));
        _fileStorage.writeFile(__dirname, `${_network!}/${_currentVersion}`, 'addresses.json', JSON.stringify(_addresses));

    } catch (err: any) {
        error(err.toString());
        throw err;
    }
}

main()
    .catch((err: any) => {
        error("Error: ", err);
        process.exitCode = 1;
    })
