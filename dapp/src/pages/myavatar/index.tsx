import { useWeb3React } from '@web3-react/core';
import { Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CHAINS } from '../../config';
import * as MyLiliusContracts from '../../config/contracts/mylilius';
import { Flex } from '../../utils';
import { Avatar } from './avatar';
import { CreateAvatar } from './create_avatar';
const MyAvatarContainer = styled.div`
    height: 95vh;
`;

const MyAvatarPage = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasAvatar, setHasAvatar] = useState<boolean>(false);
    const [hasDOT, setHasDOT] = useState<boolean>(false);
    const [avatarContract, setAvatarContract] = useState<Contract | undefined>(undefined);

    const myliliusProvider = new ethers.providers.JsonRpcProvider(CHAINS[1258188407].urls[0]);
    const avatarFactory: Contract = new Contract(MyLiliusContracts.MyLiliusFactoryAddress, MyLiliusContracts.MyLiliusFactoryABI, myliliusProvider);
    const dotNameService: Contract = new Contract(MyLiliusContracts.DotNameServiceAddress, MyLiliusContracts.DotNameServiceABI, myliliusProvider);

    const { isActive, account } = useWeb3React();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isActive || !account) {
            alert('You must connect a wallet to visit the Creator Portal');
            navigate('/');
        }

        const hasAvatar = async() => {
            const _hasDOT: boolean = await dotNameService.callStatic.dotIsClaimed(account!);
            if (_hasDOT) {
                const _hasAvatar: boolean = await avatarFactory.callStatic.hasAvatar(account!);
                setHasAvatar(_hasAvatar);
                const avatarAddress: string = await avatarFactory.callStatic.getAvatarAddress(account!);
                const contract: Contract = new Contract(avatarAddress, MyLiliusContracts.MyLiliusAvatarABI, myliliusProvider);
                setAvatarContract(contract);
            }
            setHasDOT(_hasDOT);
            setIsLoading(false);
        }

        hasAvatar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    if (isLoading) {
        return (
            <MyAvatarContainer>
                <CenteredLoading />
            </MyAvatarContainer>
        );
    }

    return (
        <MyAvatarContainer>
            {hasAvatar ? <Avatar avatarContract={avatarContract} /> : <CreateAvatar hasAvatar={hasAvatar} setHasAvatar={setHasAvatar} hasDOT={hasDOT} setHasDOT={setHasDOT} />}
        </MyAvatarContainer>
    );
}

const LoadingContainer = styled.div`
    ${Flex('row', 'center', 'center')};
    width: 100%;
    height: 100%;
`;

const CenteredLoading = () => {
    return (
        <LoadingContainer>
            Loading Avatar Information
        </LoadingContainer>
    );
}

export {
    MyAvatarPage
}