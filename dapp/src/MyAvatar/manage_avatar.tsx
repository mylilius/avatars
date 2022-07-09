import styled from "styled-components"
import { BorderRadius, Flex, H5, Text, Theme } from "../utils";
import { IAvatar } from "./avatar";


const ManageAvatarContainer = styled.div`
    padding: 16px 0;
    width: 100%;
    background: ${Theme.colors.background};
    border-bottom: 0.15px solid ${Theme.colors.primary};
    height: 35%;
    ${Flex('column', 'flex-start', 'flex-start')};
`;

const AvatarBuildTypeContainer = styled.div`
    width: 100%;
    height: 20%;
`;

const SectionTitle = styled(H5)`
    margin: 16px 7%;
`;
const SelectRow = styled.div`
    ${Flex('row', 'center', 'space-evenly')};
    width: 100%;
    height: 25px;
`;

interface IButtonProps {
    isSelected: boolean | undefined;
}

const SelectType = styled.button<IButtonProps>`
    width: 40%;
    padding: 8px 4px;
    border: 1px solid white;
    ${BorderRadius()};
    background: ${props => props.isSelected ? Theme.colors.primary : 'none'};
    color: white;
    &:hover {
        background: white;
        color: black;
    }
`;

const AvatarBlocks = styled.div`
    width: 100%;
    height: auto;
    min-height: 10%;
`;

const BlockItem = styled.div`
    width: 90%;
    height: 40%;
    margin: 0 5%;
    ${Flex('row', 'center', 'space-between')};
`;

const BlockItemLabel = styled(Text)``;
const BlockActiveLabel = styled(Text)`
    font-size: 0.85rem;
`;

interface IProps {
    isBlocks: boolean | undefined;
    avatar: IAvatar | undefined;
    setAvatarType: Function;
}

const ManageAvatar = ({ isBlocks, avatar, setAvatarType }: IProps) => {

    if (!avatar) {
        return null;
    }

    return (
        <ManageAvatarContainer>
            <AvatarBuildTypeContainer>
                <SectionTitle>Avatar Type</SectionTitle>
                <SelectRow>
                    <SelectType isSelected={isBlocks}>Building Blocks</SelectType>
                    <SelectType isSelected={isBlocks === false}>Single Block</SelectType>
                </SelectRow>
            </AvatarBuildTypeContainer>
            {isBlocks === true && <AvatarBlocks>
                <SectionTitle>Active Blocks</SectionTitle>
                <BlockItem>
                    <BlockItemLabel>Head</BlockItemLabel>
                    {avatar.blocks[0].isActive ? <BlockActiveLabel>Active</BlockActiveLabel> : <BlockActiveLabel>Inactive: Default</BlockActiveLabel>}
                </BlockItem>
                <BlockItem>
                    <BlockItemLabel>Body</BlockItemLabel>
                    {avatar.blocks[1].isActive ? <BlockActiveLabel>Active</BlockActiveLabel> : <BlockActiveLabel>Inactive: Default</BlockActiveLabel>}
                </BlockItem>
                <BlockItem>
                    <BlockItemLabel>Legs</BlockItemLabel>
                    {avatar.blocks[2].isActive ? <BlockActiveLabel>Active</BlockActiveLabel> : <BlockActiveLabel>Inactive: Default</BlockActiveLabel>}
                </BlockItem>
            </AvatarBlocks>}
            {isBlocks === false && <AvatarBlocks>
                <SectionTitle>Active Body</SectionTitle>
            </AvatarBlocks>}
        </ManageAvatarContainer>
    );
}

export {
    ManageAvatar
}