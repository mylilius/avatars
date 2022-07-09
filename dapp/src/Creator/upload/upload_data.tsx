import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, H5, Text } from '../../utils';

const UploadedDataContainer = styled.div`
    height: 100%;
    width: 100%;
    ${Flex('column', 'flex-start', 'flex-start')};
`;
const RenderSection = styled.div`
    height: 30%;
    min-height: 30%;
    width: 100%;
    position: relative;
    padding: 8px 0;
    border-bottom: 1px solid grey;
`;

const RenderSectionTitle = styled(H5)`
    position: absolute;
    top: 5%;
    left: 5%;
    width: 100%;
`;

const RenderSectionContent = styled.div`
    position: absolute;
    width: 90%;
    top: 20%;
    left: 5%;
    right: 5%;
    height: 75%;
    ${Flex('row', 'center', 'center')};
`;

const RenderImage = styled.img`
    height: 100%;
    width: auto;
`;

interface IProps {
    mediaURI?: string;
    tokenURI?: string;
    tokenId?: number;
    chainId?: number;

}

interface IProperty {
    type: string;
    description: string;
}

interface IAttribute {
    trait_type: string;
    display_type?: string;
    value: string;
}

interface IMetadataJSON {
    title: string;
    type: string;
    properties: {[key: string]: IProperty};
    attributes: IAttribute[];
}

const UploadedData = ({ mediaURI, tokenURI }: IProps) => {

    const [tokenMetadata, setTokenMetadata] = useState<IMetadataJSON | undefined>(undefined)

    console.log("Media URI: ", mediaURI);

    useEffect(() => {
        const tokenURILoad = async() => {
            try {
                const data = await axios.get('https://ipfs.io/ipfs/' + tokenURI);
                setTokenMetadata(data.data);
            } catch (err: any) {
                console.log("Error: ", err);
            }
        }

        if (tokenURI) {
            tokenURILoad();
        }
    }, [tokenURI]);

    return (
        <UploadedDataContainer>
            <RenderSection>
                <RenderSectionTitle>Uploaded Image</RenderSectionTitle>
                <RenderSectionContent>
                    <RenderImage src={`https://ipfs.io/ipfs/${mediaURI}`} />
                </RenderSectionContent>
            </RenderSection>
            <RenderSection>
                <RenderSectionTitle>Uploaded Metadata</RenderSectionTitle>
                <RenderSectionContent>
                    {tokenMetadata && <Text customStyle="color: black;">Token Metadata Created Successfully</Text>}
                </RenderSectionContent>
            </RenderSection>
        </UploadedDataContainer>
    );
}

export {
    UploadedData
}