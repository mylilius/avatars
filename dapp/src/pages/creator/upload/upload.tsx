import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BorderRadius, Flex, SubTitle, Theme } from '../../../utils';
import axios from 'axios';
import { UploadForm } from './form';

/*** File Pond Plugin Dependencies to View Upload  ****/
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { UploadedData } from './upload_data';
import { useWeb3React } from '@web3-react/core';
import { Provider } from '../../../utils/provider';
import { ChainInformation, CHAINS } from '../../../config';
import { Contract } from 'ethers';
import { getAvatarManager } from '../../../config/contracts/contracts';

const FileUploadContainer = styled.div`
    width: 50%;
    max-width: 50%;
    margin: 0 auto;
    padding: 16px 0;

`;

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const UploadContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const SectionTitle = styled(SubTitle)`
    margin: 8px 0 0 0;
`;

const Row = styled.div`
    ${Flex('row', 'center', 'flex-start')};
    height: 90%;
    margin: 8px 0 8px 0;
    background: ${Theme.colors.background};
    width: 100%;
    border-radius: 16px;
`;

const SelectionContainer = styled.div`
    width: 45%;
    height: 100%;
    border-radius: 16px 0 0 16px;
    ${Flex('column', 'flex-start', 'flex-start')};
    position: relative;
`;
const AvatarViewContainer = styled.div`
    width: 55%;
    height: 100%;
    border-radius: 0 16px 16px 0;
    background: linear-gradient(135deg, ${Theme.colors.primary}, #FFF);
    ${Flex('column', 'flex-start', 'flex-start')};
`;


export interface IMetadata {
    avatarType: string | undefined;
    blockType: string | undefined;
    imageURI: string | undefined;
    fileName: string | undefined;
    fileDescription: string | undefined;
    artistSignature: string | undefined;
    metadataURI: string | undefined;
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

const UploadButton = styled.button`
    width: 85%;
    margin 0 auto;
    padding 8px 4px;
    ${BorderRadius()};
    background: none;
    color: white;
    border: 1px solid ${Theme.colors.primary};
`;

const ResetButton = styled.div`
    position: absolute;
    bottom: 2.5%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 85%;
    background: none;
    border: 1px solid grey;
    color: yellow;
    padding: 8px 4px;
    ${BorderRadius()};
    text-align: center;
`;

const Upload = () => {

    const { chainId, provider } = useWeb3React<Provider>();
    const selectedChain = Object.entries(CHAINS).find((chain: [string, ChainInformation]) => {
        return parseInt(chain[0]) === chainId;
    })?.[1].name;

    const [files, setFiles] = useState<any>([]);
    const [state, setState] = useState<{[key: string]: boolean}>({
        canUploadImage: false,
        imageUploaded: false,
        canUploadMetadata: false,
        metadataUploaded: false,
        canMintNFT: false,
        nftMinted: false
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [data, setData] = useState<IMetadata>({
        avatarType: undefined,
        blockType: undefined,
        imageURI: undefined,
        fileName: undefined,
        fileDescription: undefined,
        artistSignature: undefined,
        metadataURI: undefined
    })
    
    const uploadImage = async() => {
        setState({
            ...state,
            canUploadImage: false
        });
        setIsLoading(true);
        if (files.length > 0 && data.fileName) {
            try {
                const _file: File = files[0].file;
                const _data = new FormData();
                _data.append('file', _file);
                const res = await axios.post('http://localhost:8081/avatars/media/upload', _data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                
                
                setState({
                    ...state,
                    imageUploaded: true,
                    canUploadMetadata: true
                });
                setData({
                    ...data,
                    imageURI: res.data.mediaCID
                });

                setIsLoading(false);
            } catch (err) {
                throw err;
            }
        }
    }

    const uploadMetadata = async() => {
        setState({
            ...state,
            canUploadMetadata: false
        });
        setIsLoading(true);
        try {
            
            const metadataJson: IMetadataJSON = {
                title: 'Avatar NFT Metadata',
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: data.fileName!
                    },
                    description: {
                        type: 'string',
                        description: 'Rare Avatar Building Block'
                    },
                    image: {
                        type: 'string',
                        description: 'ipfs://' + data.imageURI
                    }
                },
                attributes: [
                    {
                        trait_type: "block_type",
                        value: data.blockType!
                    },
                    {
                        trait_type: "avatar_type",
                        value: data.avatarType!
                    },
                    {
                        trait_type: "creator",
                        value: data.artistSignature!
                    }
                ]
            };

            const json = JSON.stringify(metadataJson);
            const blob = new Blob([json], { type: 'application/json' });
            const file = new File([blob], `metadata.json`);

            const _data = new FormData();
            _data.append('file', file);

            const res = await axios.post('http://localhost:8081/avatars/metadata/upload', _data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                
                setState({
                    ...state,
                    metadataUploaded: true,
                    canMintNFT: true
                });
                setData({
                    ...data,
                    metadataURI: res.data.metadataCID
                });

                setIsLoading(false);

        } catch (err) {
            throw err;
        }
    }
    const mintNFT = async() => {

        setState({
            ...state,
            canMintNFT: false
        });
        setIsLoading(true);

        try {            
            const tokenURI: string = `ipfs://${data.metadataURI}`;
            const contractParams = getAvatarManager(chainId!);
            const contract: Contract = new Contract(contractParams.address, contractParams.abi, provider?.getSigner());

            await contract.createRareBlock(tokenURI);
            

            setIsLoading(false);
            setState({
                nftMinted: true
            });
        } catch (err) {
            throw err;
        }

    }
    const resetState = () => {
        setState({
            canUploadImage: false,
            imageUploaded: false,
            canUploadMetadata: false,
            metadataUploaded: false,
            canMintNFT: false,
            nftMinted: false
        });
        setFiles([]);
        setIsLoading(false);
        setData({
            avatarType: undefined,
            blockType: undefined,
            imageURI: undefined,
            fileName: undefined,
            fileDescription: undefined,
            artistSignature: undefined,
            metadataURI: undefined
        });
    }

    useEffect(() => {
        if (!state.imageUploaded) {
            setState({
                ...state,
                canUploadImage: files && files.length > 0 && files[0].file.type === 'image/svg+xml' && data.fileName
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files, data])


    return (
        <UploadContainer>
            <SectionTitle>Review &amp; Upload</SectionTitle>
            <Row>
                <SelectionContainer>
                    <ResetButton onClick={(e) => {
                        e.preventDefault();
                        resetState();
                    }}>
                        Reset
                    </ResetButton>
                    <UploadForm data={data} setData={setData} />
                    {isLoading && <Row style={{ height: 'auto', justifyContent: 'flex-start', marginTop: '36px' }}>
                        <UploadButton onClick={async(e) => {
                            e.preventDefault();
                            await uploadImage();
                        }}>
                            Loading
                        </UploadButton>
                    </Row>}
                    {!isLoading && state.canUploadImage && !state.imageUploaded && <Row style={{ height: 'auto', justifyContent: 'flex-start', marginTop: '36px' }}>
                        <UploadButton onClick={async(e) => {
                            e.preventDefault();
                            await uploadImage();
                        }}>
                            Upload Image
                        </UploadButton>
                    </Row>}
                    {!isLoading && state.canUploadMetadata && !state.metadataUploaded && <Row style={{ height: 'auto', justifyContent: 'flex-start', marginTop: '36px' }}>
                        <UploadButton onClick={async(e) => {
                            e.preventDefault();
                            await uploadMetadata();
                        }}>
                            Upload NFT Metadata
                        </UploadButton>
                    </Row>}
                    {!isLoading && state.canMintNFT && !state.nftMinted && <Row style={{ height: 'auto', justifyContent: 'flex-start', marginTop: '36px' }}>
                        <UploadButton onClick={async(e) => {
                            e.preventDefault();
                            await mintNFT();
                        }}>
                            Mint NFT on {selectedChain}
                        </UploadButton>
                    </Row>}
                    {!isLoading && state.nftMinted && <Row style={{ height: 'auto', justifyContent: 'flex-start', marginTop: '36px' }}>
                        <UploadButton onClick={async(e) => {
                            e.preventDefault();
                            resetState();
                        }}>
                            Rest &amp; Mint Again
                        </UploadButton>
                    </Row>}
                </SelectionContainer>
                <AvatarViewContainer>
                    {data.imageURI ? <UploadedData mediaURI={data.imageURI} tokenURI={data.metadataURI} /> : <FileUploadContainer style={{ width: '100%'}}>
                        <FilePond
                            files={files}
                            onupdatefiles={setFiles}
                            allowMultiple={false}
                            maxFiles={1}
                            name="files"
                            instantUpload={false}
                        />
                    </FileUploadContainer>}
                </AvatarViewContainer>
            </Row>
        </UploadContainer>
    );
}

export {
    Upload
}