import type { AddEthereumChainParameter } from "@web3-react/types";

interface ChainInformation {
    blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
    name: string;
    nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
    urls: string[];
};


const SFUEL: AddEthereumChainParameter['nativeCurrency'] = {
    name: 'SKALE Fuel',
    symbol: 'sFUEL',
    decimals: 18
};

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18
};

const SHIBUYA: AddEthereumChainParameter['nativeCurrency'] = {
    name: 'Shibuya',
    symbol: 'SBY',
    decimals: 18
};

const TESTNET_CHAINS: { [chainId: number]: ChainInformation } = {
    1258188407: {
      urls: ['https://staging-v2.skalenodes.com/v1/naive-musty-merope'],
      name: 'MyLilius SKALE Chain',
      nativeCurrency: SFUEL,
      blockExplorerUrls: ['https://naive-musty-merope.explorer.staging-v2.skalenodes.com'],
    },
    104734457: {
        urls: ['https://staging-v2.skalenodes.com/v1/actual-secret-cebalrai'],
        name: 'Calypso NFT Hub',
        nativeCurrency: SFUEL,
        blockExplorerUrls: ['https://actual-secret-cebalrai.explorer.staging-v2.skalenodes.com'],
    },
    81: {
        urls: ['https://shibuya.public.blastapi.io', 'https://evm.shibuya.astar.network'],
        name: 'Shibuya Network (ASTAR Testnet)',
        nativeCurrency: SHIBUYA,
        blockExplorerUrls: ['https://blockscout.com/shibuya'],
    },
    80001: {
        urls: ['https://rpc-mumbai.maticvigil.com'],
        name: 'Polygon (Mumbai) Testnet',
        nativeCurrency: MATIC,
        blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    }
}

const CHAINS: {[chainId: number]: ChainInformation} = process.env.REACT_APP_ENV === 'testnet' ? TESTNET_CHAINS : {};

export {
    type ChainInformation,
    CHAINS
    
}