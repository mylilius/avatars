import { NavigateFunction, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChainInformation, CHAINS } from '../config';
import { BorderRadius, Flex, H5, SubText, Text, Theme } from '../utils';

const Dropdown = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    min-width: 100%;
    z-index: 2000;
    background: ${Theme.colors.background};
    min-height: 38vh;
    height: auto;
    height: auto;
    ${BorderRadius()};
    border: 1px solid ${Theme.colors.primary};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;  
    @media(max-width: 1000px) {
        width: 50vw;
        min-height: 350px;
    }
`;

const Row = styled.div`
    ${Flex('row', 'center', 'space-between', 'wrap')};
`;

const SVGContainer = styled.div`
    position: absolute;
    left: 2.5%;
    height: auto;
`;
const Column = styled.div`
    position: absolute;
    right: 2.5%;
    top: 2.5%;
    ${Flex('column', 'flex-end', 'center', 'nowrap')}
`;

const SelectNetworkSection = styled.div`
    position: absolute;
    top: 15%;
    border-top: 1px solid grey;
    padding: 6px 0;
    height: auto;
    width: 100%;
    ${Flex('column', 'flex-start', 'center')};
    h5 {
        margin: 0 0 0 8px;
    }
    .navigation_buttons {
        width: 100%;
        justify-content: space-evenly;
    }
`;

const NavigationButton = styled.button`
    width: 45%;
    border: 1px solid ${Theme.colors.primary};
    background: none;
    color: white;
    ${BorderRadius()};
    &:hover {
        background: ${Theme.colors.primary};
    }
    padding: 4px 0;
    margin: 4px 0;
`;

interface IProps {
    close: Function;
    svgElement: JSX.Element;
    account: string;
    balance: string;
    networkTicker: string | undefined;
    switchNetwork: Function;
    isDesktop: boolean;
}

const ActiveWalletDropDown = ({ close, svgElement, account, balance, networkTicker, switchNetwork, isDesktop }: IProps) => {

    const navigate: NavigateFunction = useNavigate();

    return (
        <Dropdown>
            <SVGContainer>
                {svgElement}
            </SVGContainer>
            <Column>
                <Text customStyle="font-size: 0.85rem;">{account}</Text>
                <Text customStyle="font-size: 0.75rem; color: silver;">{balance} {networkTicker}</Text>    
            </Column>
            <SelectNetworkSection>
                <H5>Change Network</H5>
                {CHAINS && Object.entries(CHAINS).map((chain: [string, ChainInformation], index: number) => {
                    const _name: string = chain[1].name;
                    return <Text onClick={(e: { preventDefault: () => void; }) => {
                        e.preventDefault();
                        switchNetwork(chain[0]);
                    }} customStyle="border: 1px solid grey; width: 88%; border-radius: 8px; text-align: center; margin: 4px auto; font-size: 0.85rem; padding: 8px;">{_name}</Text>
                })}
                <span style={{ height: '10px' }} />
                <Row className='navigation_buttons'>
                    <NavigationButton onClick={(e): void => {
                        e.preventDefault();
                        close();
                        navigate('myavatar');
                    }}>MyAvatar</NavigationButton>
                    <NavigationButton onClick={(e) => {
                        e.preventDefault();
                        close();
                        navigate('creator');
                    }}>Creator Portal</NavigationButton>
                    <NavigationButton onClick={(e): void => {
                        e.preventDefault();
                        close();
                        navigate('gas-station');
                    }}>Get Gas</NavigationButton>
                    {/* <NavigationButton onClick={(e) => {
                        e.preventDefault();
                        close();
                        navigate('creator');
                    }}>Creator Portal</NavigationButton> */}
                </Row>
            </SelectNetworkSection>
            <SubText onClick={(e: { preventDefault: () => void; }) => {
                e.preventDefault();
                close();
            }} customStyle="border-top: 1px solid grey; padding: 6px 0 0 0; position: absolute; bottom: 0; left: 0; right: 0; width: 100%; text-align: center; bottom: 5px; font-weight: bold; color: red;">Close</SubText>
        </Dropdown>
    );
}

export {
    ActiveWalletDropDown
}