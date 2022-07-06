import styled from 'styled-components';
import { Flex } from '../../../utils';
import { IMetadata } from './inventory';
import { InventoryItem } from './item';

const InventoryListContainer = styled.div`
    width: 90%;
    height: 80%;
    position: absolute;
    top: 12.5%;
    left: 5%;
    right: 5%;
    ${Flex('row', 'flex-start', 'space-evenly', 'wrap')};
`;

interface IProps {
    nfts: IMetadata[];
    filter: string;
    addBlock: Function;
}


const InventoryList = ({ nfts, filter, addBlock } : IProps) => {
    return (
        <InventoryListContainer>
            {nfts.map((nft: IMetadata, index: number) => {
                return <InventoryItem key={index} addBlock={addBlock} data={nft} />;
            })}
        </InventoryListContainer>
    );
}


export {
    InventoryList
}