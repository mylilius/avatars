import styled from "styled-components";
import { BorderRadius, Flex, H5, Theme } from "../../utils";
import { IMetadata } from "./upload";

interface IProps {
    data: IMetadata;
    setData: Function;
}



const FormLabel = styled(H5)`
    width: 85%;
    text-align: left;
    margin: 8px 0 0 10%;
`;

interface ISelectionButton {
    isSelected?: boolean;
}

const SelectionButton = styled.button<ISelectionButton>`
    background: ${props => props.isSelected ? Theme.colors.primary : 'none'};
    color: white;
    border: 1px solid ${Theme.colors.primary};
    text-align: center;
    min-width: 35%;
    max-width: 50%;
    padding: 8px 4px;
    margin: 4px 2px;
    ${BorderRadius()};
    ${props => !props.isSelected && `&:hover {
        background: white;
        color: black;
    }`};
    
`;



const Input = styled.input`
    margin-left: 10%;
    height: 25px;
    width: 80%;
    background: none;
    border: none;
    border-bottom: 1px solid grey;
    color: white;
`;

const Row = styled.div`
    ${Flex('row', 'center', 'flex-start')};
    height: 90%;
    margin: 8px 0 8px 0;
    background: ${Theme.colors.background};
    width: 100%;
    border-radius: 16px;
`;


const UploadForm = ({ data, setData }: IProps) => {
    return (
        <>
            <FormLabel>
                Select Avatar Type
            </FormLabel>
            <Row style={{ height: 'auto', justifyContent: 'space-evenly' }}>
                <SelectionButton isSelected={data.avatarType === 'Human'} onClick={(e) => {
                    e.preventDefault();
                    setData({
                        ...data,
                        avatarType: 'Human'
                    });
                }}>Human</SelectionButton>
                <SelectionButton isSelected={data.avatarType === 'Alien'}onClick={(e) => {
                    e.preventDefault();
                    setData({
                        ...data,
                        avatarType: 'Alien'
                    });
                }}>Alien</SelectionButton>
            </Row>
            <FormLabel>
                Select Building Block Type
            </FormLabel>
            <Row style={{ height: 'auto', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                <SelectionButton isSelected={data.blockType === 'Full Body'} value="Full Body"  onClick={(e) => {
                    e.preventDefault();
                    setData({
                        ...data,
                        blockType: 'Full Body'
                    });
                }}>Full Body</SelectionButton>
                <SelectionButton isSelected={data.blockType === 'Head'} value="Head"  onClick={(e) => {
                    e.preventDefault();
                    setData({
                        ...data,
                        blockType: 'Head'
                    });
                }}>Head</SelectionButton>
                <SelectionButton isSelected={data.blockType === 'Body'} value="Body"  onClick={(e) => {
                    e.preventDefault();
                    setData({
                        ...data,
                        blockType: 'Body'
                    });
                }}>Body</SelectionButton>
                <SelectionButton isSelected={data.blockType === 'Left Leg'} value="Left Leg"  onClick={(e) => {
                    e.preventDefault();
                    setData({
                        ...data,
                        blockType: 'Left Leg'
                    });
                }}>Left Leg</SelectionButton>
                <SelectionButton isSelected={data.blockType === 'Right Leg'} value="Right Leg"  onClick={(e) => {
                    e.preventDefault();
                    setData({
                        ...data,
                        blockType: 'Right Leg'
                    });
                }}>Right Leg</SelectionButton>
            </Row>
            <FormLabel>
                Name Building Block (NFT)
            </FormLabel>
            <Row style={{ height: 'auto', justifyContent: 'flex-start' }}>
                <Input value={data.fileName ?? ""} type='text' onChange={(e) => {
                    e.preventDefault();
                    setData({
                        ...data,
                        fileName: e.target.value
                    });
                }} placeholder="Ex. Dragon Head 1" />
            </Row>
            <FormLabel>
                Describe Building Block (NFT)
            </FormLabel>
            <Row style={{ height: 'auto', justifyContent: 'flex-start' }}>
                <Input value={data.fileDescription ?? ""} type='text' onChange={(e) => {
                    e.preventDefault();
                    setData({
                        ...data,
                        fileDescription: e.target.value
                    });
                }} placeholder="Ex. This NFT is the head of a dragon" />
            </Row>
            <FormLabel>
                Artist Name (NFT)
            </FormLabel>
            <Row style={{ height: 'auto', justifyContent: 'flex-start' }}>
                <Input value={data.artistSignature ?? ""} type='text' onChange={(e) => {
                    e.preventDefault();
                    setData({
                        ...data,
                        artistSignature: e.target.value
                    });
                }} placeholder="Ex. TheGreatAxios" />
            </Row>
        </>
    )
}

export {
    UploadForm
}