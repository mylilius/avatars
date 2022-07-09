import { useWeb3React } from '@web3-react/core';
import { BigNumber, Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CHAINS } from '../config';
import { Flex } from '../utils';
import { Provider } from '../utils/provider';
import { DotInformation } from './dot_information';
import { IMetadata, Inventory } from './inventory/inventory';
import { RenderAvatar } from './render_avatar';
import * as Rare from '../config/contracts/rare';
import axios from 'axios';
import { ManageAvatar } from './manage_avatar';

const AvatarContainer = styled.div`
    width: 100%;
    height: 100%;
    ${Flex('row', 'center', 'center')};
`;

const DotRenderContainer = styled.div`
    width: 20%;
    height: 100%;
    position: relative;
    ${Flex('column', 'center', 'flex-start')};
`;

interface IProps {
    avatarContract: Contract | undefined;
}

export interface IColorPalette {
    background: number;
    text: number;
    active: boolean;
}

export interface IAvatar {
    blocks: {[key: number]: IBlock};
    avatarSize: number;
    colorPalette: IColorPalette;
    isBlocks: boolean;
}

export interface IBlock {
    chainId: number;
    contractAddress: string;
    isActive: boolean;
    tokenId: number;
    tokenType: number;
    tokenURI: string;

}

export interface IAddBlockParams {
    chainId: number;
    tokenType: number;
    contractAddress: string;
    tokenId: number;
    tokenURI: string;
}

const Avatar = ({ avatarContract }: IProps) => {

    console.log(avatarContract);

    const { account, chainId, connector, provider } = useWeb3React<Provider>();

    const astarProvider = new ethers.providers.JsonRpcBatchProvider(CHAINS[81].urls[0]);
    const polygonProvider = new ethers.providers.JsonRpcBatchProvider(CHAINS[80001].urls[0]);

    const rareBlockAstar: Contract = new Contract(Rare.RareBlockAddresses[81], Rare.RareBlockABI, astarProvider);
    const rareBlockPolygon: Contract = new Contract(Rare.RareBlockAddresses[80001], Rare.RareBlockABI, polygonProvider);

    const [filter, setFilter] = useState<string>('all');
    const [nfts, setNfts] = useState<IMetadata[]>([]);

    const [isBlocks, setIsBlocks] = useState<boolean | undefined>(undefined);
    // const [blocks, setBlocks] = useState<{[key: number]: IBlock}>([]);
    const [avatar, setAvatar] = useState<IAvatar | undefined>(undefined);

    useEffect(() => {
        if (!(chainId === 1258188407)) {
            provider!.provider.request!({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: ethers.utils.hexValue(BigNumber.from(1258188407)) }]
            })
            .then(async(res) => {
                if (connector) {
                    await connector.connectEagerly!();
                }
                
            })
            .catch((err) => {
                console.log(err);
            })   
        }
        getBlocks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chainId])

    const getBlocks = async() => {
        try {
            const _avatar = await avatarContract?.callStatic.getAvatar();
            console.log("Avatar: ", _avatar);
            const _blocks: any = _avatar[0];
            const _palette: any = _avatar[1];
            const _size: number = _avatar[3];

            let _finalBlocks: {[key: number]: IBlock} = {};
            let _colorPalette: IColorPalette = {
                background: Number(_palette['background']),
                text: Number(_palette['text']),
                active: _palette['exists']
            }

            for (const _block of _blocks) {
                _finalBlocks[_block['tokenType']] = {
                    chainId: Number(_block['chainId']),
                    contractAddress: _block['contractAddress'],
                    isActive: _block['exists'],
                    tokenId: Number(_block['tokenId']),
                    tokenType: _block['tokenType'],
                    tokenURI: _block['tokenURI']
                }
            }

            setAvatar({
                avatarSize: _size,
                colorPalette: _colorPalette,
                blocks: _finalBlocks,
                isBlocks: _blocks.length > 2
            });
        } catch (err) {
            throw err;
        }
    }

    // useEffect(() => {
    //     const interval = async() => {
    //         await getBlocks();
    //     }

    //     return () => clearInterval(interval);
    // }, [10000]);

    useEffect(() => {
        const initNFts = async() => {
            const data = await Promise.all([
                loadNFTs(rareBlockAstar, 81),
                loadNFTs(rareBlockPolygon, 80001)
            ]);
            
            setNfts([...data[0], ...data[1]]);
        }
        initNFts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadNFTs = async(contract: Contract, chainId: number): Promise<IMetadata[]> => {

        try {

            const userBalanceBN: BigNumber = await contract.callStatic.balanceOf(account!);
            const userBalance: number = Number(userBalanceBN);

            if (userBalance === 0) {
                return [];
            }

            const totalBlocksBN = await contract.callStatic.numberBlocks();
            const totalBlocks: number = Number(totalBlocksBN);
            
            let blocks: IMetadata[] = [];
            for (let i = 0; i < totalBlocks; i++) {
                const isOwner: boolean = (await contract.callStatic.ownerOf(BigNumber.from(i))) === account;
                if (isOwner) {
                    const tokenURI: string = await contract.callStatic.tokenURI(BigNumber.from(i));
                    const metadata = await axios.get(`https://ipfs.io/ipfs/${tokenURI.substring(7)}`);
                    
                    blocks.push({
                        ...metadata.data,
                        chainId,
                        tokenId: i
                    }); 
                }
            }

            return addBlocks(blocks);
        } catch (err) {
            throw err;
        }
    }

    const addBlocks = (blocks: IMetadata[]) : IMetadata[]=> {
        
        let _initial = nfts;
        let _final = [];

        if (_initial.length === 0) {
            return blocks;
        }

        for (let i = 0; i < blocks.length; i++) {
            let match = false;
            for (let j = 0; j < _initial.length; j++) {
                if (_initial[j].chainId == blocks[i].chainId) {
                    if (_initial[j].tokenId == blocks[i].tokenId) {
                        match = true;
                    }
                }
            }
            if (!match) _final.push(blocks[i]);
        }

        // for (let j = 0; j < blocks.length; j++) {
        //     for (let i = 0; i < _initial.length; i++) {
        //         console.log("Initial: ", _initial[i]);
        //         if (_initial[i]) {
        //             if (_initial[i].chainId !== blocks[j].chainId && _initial[i].tokenId !== blocks[j].tokenId) {
        //                 _final.push(blocks[i]);
        //             }
        //         } else {
        //             _final.push(blocks[i]);
        //         }
                
        //     }
            
        // }
        return _final;
        
    }

    const setAvatarType = async(setFullBody: boolean) => {
        // return;
        // if (isBlocks === false && setFullBody) {
        //     return;
        // }

        // try {
        //     // await avatarContract.
        // } catch (err) {
        //     throw err;
        // }

    }



    const addBlock = async(params: IAddBlockParams) => {
        try {
            
            if (!avatarContract || !provider) {
                throw new Error('Contract Error');
            }

            avatarContract = avatarContract.connect(provider.getSigner());
            
            await (await avatarContract.addBuildingBlock(
                BigNumber.from(params.chainId),
                BigNumber.from(params.tokenId),
                params.tokenType,
                params.contractAddress,
                params.tokenURI
            )).wait();

            
            setTimeout(async() => {
                await getBlocks();
            }, 2500);
        } catch (err) {
            throw err;
        }
    }

    return (
        <AvatarContainer>
            <DotRenderContainer>
                <DotInformation />
                <RenderAvatar isBlocks={isBlocks} avatar={avatar} nfts={nfts} />
                <ManageAvatar isBlocks={isBlocks} avatar={avatar} setAvatarType={setAvatarType} />
            </DotRenderContainer>
            <Inventory filter={filter} setFilter={setFilter} nfts={nfts} addBlock={addBlock} />
        </AvatarContainer>
    );
}

export {
    Avatar
}