import styled from 'styled-components';
import { BorderRadius, Flex, H5, SubTitle, Text, Theme } from '../../utils';

import AlienBodyGraphic from '../../assets/Alien_bodyAsset_5.svg';
import AlienHeadGraphic from '../../assets/Alien_headAsset_4.svg';
import AlienLeftLegGraphic from '../../assets/Alien_leftlegAsset_7.svg';
import AlienRightLegGraphic from '../../assets/Alien_right_legAsset_6.svg';
import HumanFullGraphic from '../../assets/Asset_2.svg';
import HumanHeadGraphic from '../../assets/humanheadAsset_8.svg';
import HumanBodyGraphic from '../../assets/humanbodyAsset_9.svg';
import HumanLeftLegGraphic from '../../assets/left_legAsset_13.svg';
import HumanRightLegGraphic from '../../assets/right_legAsset_12.svg';

// import AlienBodyTemplate from '../../assets/MF_Alien_Body.ait';
// import AlienHeadTemplate from '../../assets/MF_Alien_Head.ait';
// import AlienLegsTemplate from '../../assets/MF_Alien_Legs.ait';
// import HumanBodyTemplate from '../../assets/MF_Human_Body.ait';
// import HumanHeadTemplate from '../../assets/MF_Human_Head.ait';
// import HumanLegsTemplate from '../../assets/MF_Human_Legs.ait';

const TemplatesContainer = styled.div`
    ${Flex('column', 'flex-start', 'flex-start')};
`;

const SectionTitle = styled(SubTitle)`
    margin: 8px 0 8px 0;
    
`;
const SectionContent = styled(Text)`
    width: 80%;
    line-height: 1.5;
`;

const BuildingBlocksContainer = styled.div`
    ${Flex('row', 'center', 'space-evenly', 'wrap')};
    width: 100%;
    height: auto;
`;

const BuildingBlock = styled.div`
    width: 45%;
    height: 300px;
    border: 1px solid ${Theme.colors.background};
    margin: 16px 0;
    ${BorderRadius()};
    position: relative;
    h5 {
        text-align: center;
        margin: 8px auto;
        padding: 4px 4px;
        width: 75%;
        border-bottom: 1px solid grey;
    }
`;

const Buttons = styled.div`
    position: absolute;
    bottom: 5%;
    width: 100%;
    ${Flex('row', 'center', 'space-evenly')};

`;

const DownloadButton = styled.a`
    width: 40%;
    padding: 8px 2px;
    border-radius: 16px;
    text-align: center;
    text-decoration: none;
    border: none;
    background: ${Theme.colors.background};
    color: white;
`;

const Images = styled.div`
    width: 100%;
    height: 65%;
    ${Flex('row', 'center', 'space-evenly')};
`;

interface IImageProps {
    size?: string;
}

const Image = styled.img<IImageProps>`
    height: ${props => props.size ?? '64px'};
`;

const Templates = () => {

    return (
        <TemplatesContainer>
            <SectionTitle>Templates</SectionTitle>
            <SectionContent>
                Click any of the templates below to download the corresponding Adobe file.<br />
                Please note that the outline of the Avatar must remain as close to the original as possible in order to make a compatible building block.
            </SectionContent>
            <BuildingBlocksContainer>
                <BuildingBlock>
                    <H5>Full Body</H5>
                    <Images>
                        <Image src={HumanFullGraphic} size="164px" />
                    </Images>
                    <Buttons>
                        <DownloadButton href="../../assets/MF_Human_Full.ait" download={true}>Human Template</DownloadButton>
                        <DownloadButton href="../../assets/MF_Alien_Full.ait" download={true}>Alien Template</DownloadButton>
                    </Buttons>
                </BuildingBlock>
                <BuildingBlock>
                    <H5>Head Block</H5>
                    <Images>
                        <Image src={HumanHeadGraphic} size="164px" />
                        <Image src={AlienHeadGraphic} size="164px" />
                    </Images>
                    <Buttons>
                        <DownloadButton href="../../assets/MF_Human_Head.ait" download={true}>Human Template</DownloadButton>
                        <DownloadButton href="../../assets/MF_Alien_Head.ait" download={true}>Alien Template</DownloadButton>
                    </Buttons>
                </BuildingBlock>
                <BuildingBlock>
                    <H5>Body Block</H5>
                    <Images>
                        <Image src={HumanBodyGraphic} size="164px" />
                        <Image src={AlienBodyGraphic} size="164px" />
                    </Images>
                    <Buttons>
                        <DownloadButton href="../../assets/MF_Human_Body.ait" download={true}>Human Template</DownloadButton>
                        <DownloadButton href="../../assets/MF_Alien_Body.ait" download={true}>Alien Template</DownloadButton>
                    </Buttons>
                </BuildingBlock>
                <BuildingBlock>
                    <H5>Legs Block</H5>
                    <Images>
                        <Image src={HumanLeftLegGraphic} size="164px" />
                        <Image src={HumanRightLegGraphic} size="164px" />
                        <Image src={AlienLeftLegGraphic} size="164px" />
                        <Image src={AlienRightLegGraphic} size="164px" />
                    </Images>
                    <Buttons>
                        <DownloadButton href="../../assets/MF_Human_Legs.ait" download={true}>Human Template</DownloadButton>
                        <DownloadButton href="../../assets/MF_Alien_Legs.ait" download={true}>Alien Template</DownloadButton>
                    </Buttons>
                </BuildingBlock>
            </BuildingBlocksContainer>
        </TemplatesContainer>
    );
}

export {
    Templates
}