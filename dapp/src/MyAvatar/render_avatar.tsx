import styled from "styled-components"

import Head from '../assets/humanheadAsset_8.svg';
import Body from '../assets/humanbodyAsset_9.svg';
import LeftLeg from '../assets/left_legAsset_13.svg';
import RightLeg from '../assets/right_legAsset_12.svg';
import { Flex } from "../utils";
import { IAvatar, IBlock } from "./avatar";
import { IMetadata } from "./inventory/inventory";
import { useEffect, useState } from "react";

const BaseAvatarWidth = '200px';
const BaseAvatarBlockHeight = '150px';
const BaseAvatarHeadAndBodyWidth = '150px';
const BaseAvatarLegWidth = '25px';

const RenderAvatarContainer = styled.div`
    width: ${BaseAvatarWidth};
    height: 100%;
    ${Flex('column', 'center', 'center')};
`;

interface IAvatarBuildProps {
    scale: number;
}

const AvatarBuilderContainer = styled.div<IAvatarBuildProps>`
    width: 85%;
    height: 50%;
    position: relative;
    // transform: scale(2);
    
`;

const HeadContainer = styled.div`
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    height: ${BaseAvatarBlockHeight};
    width: ${BaseAvatarHeadAndBodyWidth};
    ${Flex('row', 'center', 'center')};
    margin: 0 auto;
    z-index: 20;
`;

const BodyContainer = styled.div`
    position: absolute;
    top: calc(10% + 75px + 15px);
    z-index: 10;
    left: 0;
    right: 0;
    height: calc(${BaseAvatarBlockHeight});
    width: ${BaseAvatarHeadAndBodyWidth};
    ${Flex('row', 'center', 'center')};
    margin: 0 auto;
`;

const RightLegContainer = styled.div`
    position: absolute;
    top: calc(10% + 150px + 7px);
    z-index: 5;
    left: 60px;
    height: ${BaseAvatarBlockHeight};
    width: ${BaseAvatarLegWidth};
    ${Flex('row', 'center', 'center')};
`;

const LeftLegContainer = styled.div`
    position: absolute;
    top: calc(10% + 150px + 7px);
    z-index: 5;
    right: 51px;
    height: ${BaseAvatarBlockHeight};
    width: ${BaseAvatarLegWidth};
    ${Flex('row', 'center', 'center')};
`;

const BodyPart = styled.img`
    height: 100px;
`;

interface IProps {
    isBlocks: boolean | undefined;
    avatar: IAvatar | undefined;
    nfts: IMetadata[]
}

const RenderAvatar = ({ isBlocks, avatar, nfts }: IProps) => {

    const [avatarScale, setAvatarScale] = useState<number>(1);

    useEffect(() => {
        if (avatar) {     
            setAvatarScale(6 / 4);
        }
    }, [avatar])
    const _getMedia = (block: IBlock): string | undefined => {
        let media: string | undefined = undefined;
        if (block.isActive) {
            media = 'https://ipfs.io/ipfs/' + block.tokenURI.substring(7);
        }
        return media;
    }

    if (!avatar) {
        return (
            <RenderAvatarContainer>
                Loading
            </RenderAvatarContainer>
        );
    }

    

    return (
        <RenderAvatarContainer>
            <AvatarBuilderContainer scale={3}>
                <HeadContainer>
                    <BodyPart src={avatar.blocks[1] && avatar.blocks[1].isActive ? _getMedia(avatar.blocks[1]) : Head} />
                </HeadContainer>
                <BodyContainer>
                    <BodyPart style={{ height: "105px"}}src={avatar.blocks[2] && avatar.blocks[2].isActive ? _getMedia(avatar.blocks[2]) : Body} />
                </BodyContainer>
                <LeftLegContainer>
                    <BodyPart src={avatar.blocks[3] && avatar.blocks[3].isActive ? _getMedia(avatar.blocks[3]) : RightLeg} />
                </LeftLegContainer>
                <RightLegContainer>
                    <BodyPart src={avatar.blocks[4] && avatar.blocks[4].isActive ? _getMedia(avatar.blocks[4]) : LeftLeg} />
                </RightLegContainer>
            </AvatarBuilderContainer>
        </RenderAvatarContainer>
    );
}

export {
    RenderAvatar
}