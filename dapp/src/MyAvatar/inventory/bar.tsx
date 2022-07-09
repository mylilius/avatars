import styled from 'styled-components';
import { BorderRadius, Flex, H5, Theme } from '../../utils';

const InventoryBarContainer = styled.div`
    position: absolute;
    top: 5%;
    left: 5%;
    right: 5%;
    width: 90%;
    height: 50px;
    text-align: center;
    background: ${Theme.colors.background};
    ${Flex('row', 'center', 'space-evenly')};
    ${BorderRadius()};
`;

interface IFilterButtonProps {
    isSelected?: boolean;
}

const FilterButton = styled.button<IFilterButtonProps>`
    width: 15%;
    height: 65%;
    ${BorderRadius()};
    background: ${props => props.isSelected ? Theme.colors.primary : 'none'};
    border: 1px solid ${Theme.colors.primary};
    color: white;
    ${props => !props.isSelected && `
        &:hover {
            background: white;
            color: black;
        }
    `}
`;


interface IInventoryBarProps {
    filter: string;
    setFilter: Function;
}


const InventoryBar = ({ filter, setFilter }: IInventoryBarProps) => {

    return (
        <InventoryBarContainer>
            <H5>Inventory</H5>
            <FilterButton onClick={(e) => {
                e.preventDefault();
                setFilter('all');
            }} isSelected={filter === 'all'}>All</FilterButton>
            <FilterButton onClick={(e) => {
                e.preventDefault();
                setFilter('astar');
            }} isSelected={filter === 'astar'}>Astar</FilterButton>
            <FilterButton onClick={(e) => {
                e.preventDefault();
                setFilter('polygon');
            }} isSelected={filter === 'polygon'}>Polygon</FilterButton>
            <FilterButton onClick={(e) => {
                e.preventDefault();
                setFilter('calypso');
            }} isSelected={filter === 'calypso'}>Calypso - Coming Soon</FilterButton>
        </InventoryBarContainer>
    );
}

export {
    InventoryBar
}