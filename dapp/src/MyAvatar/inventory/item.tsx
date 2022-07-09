import styled from 'styled-components';
import { RareBlockAddresses } from '../../config/contracts/rare';
import { BorderRadius, Flex, Text, Theme } from '../../utils';
import { IAddBlockParams } from '../avatar';
import { IMetadata } from './inventory';

const InventoryItemContainer = styled.div`
    width: 18%;
    height: 23%;
    background: ${Theme.colors.background};
    margin: 4px 2px;
    padding: 4px 2px;
    ${BorderRadius()};
    position: relative;
`;

const BlockName = styled(Text)`
    position: absolute;
    top: 5%;
    left: 5%;
    height: 25px;
    margin: 0 auto;
    font-size: 0.85rem;
    max-width: 75%;
    overflow-x: none;
    font-size: auto;
    ${Flex('row', 'center', 'flex-start')};
`;

const ChainIcon = styled.img`
    position: absolute;
    top: 5%;
    right: 5%;
    height: 25px;
    width: 25px;
`;

const RenderItemImageContainer = styled.div`
    ${Flex('row', 'center', 'center')};
    width: 100%;
    height: 100%;
`;

const RenderItemImage = styled.img`
    ${Flex('row', 'flex-end', 'flex-end')};
    width: 100%;
    height: 50%;
`;

const EquipButton = styled.button`
    position: absolute;
    bottom: 5%;
    left: 5%;
    right: 5%;
    border: 1px solid ${Theme.colors.primary};
    background: none;
    color: white;
    padding: 4px 0;
    ${BorderRadius()};
`;

interface IProps {
    data: IMetadata;
    addBlock: Function;
}

const InventoryItem = ({ data, addBlock }: IProps) => {
    
    const name = data.properties['name']['description'];
    const media = `https://ipfs.io/ipfs/${data.properties['image']['description'].substring(7)}`;

    const _getLocation = (attributes: {
        trait_type: string;
        value: string;
    }[]): number => {
        let blockType: string | undefined;
        attributes.forEach((attribute, index) => {
            if (attribute['trait_type'] === 'block_type') {
                blockType = attribute.value;
            }
        });

        if (!blockType) {
            throw new Error('Error Identifying Block Type');
        }

        switch (blockType) {
            case 'Head':
                return 1;
            case 'Body': 
                return 2;
            case 'Right Leg':
                return 3;
            case 'Left Leg':
                return 4;
            case 'Hat':
                return 5;
            case 'Right Shoe':
                return 6;
            case 'Left Shoe':
                return 7;
            case 'Glasses':
                return 8;
            case 'Background':
                return 9;
            case 'Full Body':
                return 10;
            case 'Full Body 3D':
                return 11;
            default:
                return 0;
        }
    }

    if (!data) {
        return <div></div>;
    }

    return (
        <InventoryItemContainer>
            <BlockName>{name}</BlockName>
            <ChainIcon src={data.chainId === 81 ? "https://astar.network/images/brand-logo-mark.png" : "https://staging-v2.skalenodes.com/fs/actual-secret-cebalrai/e15b4fecf9c90e0cfc20fa91b95ec5451cf852c4/networks3/polygon.svg"} />
            <RenderItemImageContainer>
               <RenderItemImage src={media} />
            </RenderItemImageContainer>
            <EquipButton onClick={async(e) => {
                e.preventDefault();
                console.log(data);
                const params: IAddBlockParams = {
                    chainId: data.chainId,
                    tokenType: _getLocation(data.attributes),
                    contractAddress: data.chainId === 81 ? RareBlockAddresses[81] : RareBlockAddresses[80001],
                    tokenId: data.tokenId,
                    tokenURI: data.properties['image']['description']
                };
                console.log("Params", params);
                await addBlock(params);
            }}>Add to Avatar</EquipButton>
        </InventoryItemContainer>
    );
}

export {
    InventoryItem
}