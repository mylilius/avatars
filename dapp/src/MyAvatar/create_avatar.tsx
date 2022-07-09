import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import styled from 'styled-components';
import { BorderRadius, Flex, SubTitle, Text, Theme } from '../utils';
import { Provider } from '../utils/provider';
import * as MyLiliusContracts from '../config/contracts/mylilius';
import { Contract } from 'ethers';
import { CreateDigitallyOptimizedTwinForm } from './create_dot';

const CreateAvatarContainer = styled.div`
    width: 85%;
    height: 80vh;
    margin: 16px auto;
    ${Flex('column', 'flex-start', 'flex-start')};
`;

const SectionTitle = styled(SubTitle)`
    margin: 8px 0 8px 0;
    
`;
const SectionContent = styled(Text)`
    width: 80%;
    line-height: 1.5;
`;

interface IProps {
    hasAvatar: boolean;
    setHasAvatar: Function;
    hasDOT: boolean;
    setHasDOT: Function;
}


const CreateAvatar = ({ hasAvatar, setHasAvatar, hasDOT, setHasDOT }: IProps) => {

    return (
        <CreateAvatarContainer>
            <SectionTitle>Create DOT Avatar</SectionTitle>
            <SectionContent>DOT, or Digitally Optimized Twin is the core identity protocol running inside the MyLilius Wallet. DOTs provide a decentralized layer of identity infrastructure that provides super powers within Web3. You must have a DOT in order to create your avatar. Don't have a DOT? You can create one when you create your avatar!</SectionContent>
            <br />
            <SectionContent>Note, if you do not yet use the MyLilius Wallet and plan to; you will need to import the seed phrase of the wallet you use now into the wallet in order to have access to your Digitally Optimized Twin</SectionContent>
            {!hasDOT && <CreateDigitallyOptimizedTwinForm setHasDOT={setHasDOT} />}
            {hasDOT && !hasAvatar && <CreateAvatarButton setHasAvatar={setHasAvatar} />}

        </CreateAvatarContainer>
    );
}

interface ICreateAvatarButtonProps {
    setHasAvatar: Function;
}
const CreateAvatarButtonContainer = styled.div`
    height: 100%;
    width: 100%;
    ${Flex('column', 'flex-start', 'flex-start')};
    background none;
    p {
        border: 1px solid ${Theme.colors.background};
        width: 100%;
        margin: 16px 0;
        padding: 16px;
        text-align: center;
        ${BorderRadius()};
        &:hover {
            background: white;
            color: black;
        }
    }
`;

const CreateAvatarButton = ({ setHasAvatar }: ICreateAvatarButtonProps) => {

    const [creatingAvatar, setCreatingAvatar] = useState<boolean>(false);
    const { account, provider } = useWeb3React<Provider>();
    const avatarFactory: Contract = new Contract(MyLiliusContracts.MyLiliusFactoryAddress, MyLiliusContracts.MyLiliusFactoryABI, provider?.getSigner());

    const createAvatar = async() => {
        try {
            setCreatingAvatar(true);
            console.log(avatarFactory);
            await avatarFactory.createAvatar();

            checkForAvatar();
        } catch (err) {
            console.log(err);
        }
    }

    const checkForAvatar = () => {
        setTimeout(async() => {
            const hasAvatar: boolean = await avatarFactory.callStatic.hasAvatar(account!);
            if (!hasAvatar) {
                checkForAvatar();
            } else {
                setHasAvatar(true);
            }
        }, 2500);
    }

    if (creatingAvatar) {
        return (
            <CreateAvatarButtonContainer>
                <Text customStyle="background: yellow; color: black; border: none;">
                    Creating Avatar
                </Text>
            </CreateAvatarButtonContainer>
        );    
    }

    return (
        <CreateAvatarButtonContainer>
            <Text onClick={async(e: { preventDefault: () => void; }) => {
                e.preventDefault();
                await createAvatar();
            }}>
                Click to Create Avatar
            </Text>
        </CreateAvatarButtonContainer>
    );
}

export {
    CreateAvatar
}