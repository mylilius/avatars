import styled from 'styled-components';
import { Flex, H5, Theme } from '../../utils';
import { InventoryBar } from './bar';
import { InventoryList } from './list';

const InventoryContainer = styled.div`
    height: 100%;
    width: 80%;
    border-left: 1px solid ${Theme.colors.background};
    position: relative;
`;

const ComingSoonContainer = styled.div`
    width: 100%;
    height: 100%;
    ${Flex('row', 'center', 'center')};
`;

export interface IMetadata {
    title: string;
    type: object;
    attributes: {
        trait_type: string;
        value: string;
    }[];
    properties: {[key: string]: {
        type: string;
        description: string;
    }};
    tokenId: number;
    chainId: number;
}

interface IProps {
    filter: string;
    setFilter: Function;
    nfts: IMetadata[];
    addBlock: Function;
}

const Inventory = ({ filter, setFilter, nfts, addBlock }: IProps) => {
    
    nfts = nfts.filter((v: IMetadata | undefined) => v);
    return (
        <InventoryContainer>
            <InventoryBar filter={filter} setFilter={setFilter} />
            {filter === 'calypso' && <ComingSoonContainer><H5>Calypso Coming Soon</H5></ComingSoonContainer>}
            <InventoryList nfts={nfts} filter={filter} addBlock={addBlock} />
        </InventoryContainer>
    );
}

export {
    Inventory
}