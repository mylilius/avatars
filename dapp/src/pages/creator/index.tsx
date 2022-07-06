import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BorderRadius, Flex, H4, H5, Text, Theme } from '../../utils';
import { Pro } from './pro/pro';
import { Templates } from './templates';
import { Upload } from './upload/upload';
import { Welcome } from './welcome';

const CreatorPageContainer = styled.div`
    height: 95vh;
`;

const PageBar = styled.div`
    width: 85%;
    height: 5vh;
    margin: 16px auto;
    background: ${Theme.colors.background};
    ${Flex('row', 'center', 'space-evenly')};
    ${BorderRadius()};
`;

interface ICustomTextProps {
    isSelected: boolean;
}

const CustomText = styled(Text)<ICustomTextProps>`
    color: ${props => props.isSelected ? Theme.colors.primary : 'white'};
    &:hover {
        color: ${props => !props.isSelected && 'silver'};
    }
`;

const ActiveSectionContainer = styled.div`
    width: 85%;
    height: 80vh;
    margin: 16px auto;
`;

const CreatorPage = () => {

    const { isActive, account } = useWeb3React();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isActive || !account) {
            alert('You must connect a wallet to visit the Creator Portal');
            navigate('/');
        }
    }, []);




    const [page, setPage] = useState<string>('welcome');

    if (window.screen.availWidth <= 1000) {
        return (
            <CreatorPageContainer>
                <Text customStyle="text-align: center; position: absolute; top: 15%; left: 0; right: 0; font-size: 1rem;">Creator functionality is only available on Desktop</Text>
            </CreatorPageContainer>
        );
    }

    return (
        <CreatorPageContainer>
            <PageBar>
                <H4 onClick={(e: { preventDefault: () => void; }) => {
                        e.preventDefault();
                        setPage('welcome');
                }}>Creators</H4>
                {['Templates', 'Creator PRO', 'Upload'].map((_page: string, index: number) => {
                    return <CustomText isSelected={page === _page} onClick={(e: { preventDefault: () => void; }) => {
                        e.preventDefault();
                        setPage(_page);
                    }}>{_page}</CustomText>;
                })}
            </PageBar>
            <ActiveSectionContainer>
                {page === 'welcome' && <Welcome />}
                {page === 'Templates' && <Templates />}
                {page === 'Creator PRO' && <Pro />}
                {page === 'Upload' && <Upload />}
            </ActiveSectionContainer>
        </CreatorPageContainer>
    );
}

export {
    CreatorPage
}