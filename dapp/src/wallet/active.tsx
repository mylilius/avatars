import styled from 'styled-components';

import { useWeb3React } from "@web3-react/core";
import { Flex, getName, Text } from "../utils";
import { ActiveContainer } from "./styles";

import { CoinbaseWalletSVG } from "./icons/coinbase_wallet";
import { GnosisSafeSVG } from "./icons/gnosis_safe";
import { MetamaskSVG } from "./icons/metamask";
import { WalletConnectSVG } from "./icons/wallet_connect";
import { MyLiliusWalletSVG } from "./icons/mylilius_wallet";
import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { Provider } from '../utils/provider';
import { ActiveWalletDropDown } from './active_dropdown';

const SVGContainer = styled.div`
    position: absolute;
    left: 2.5%;
    height: auto;
    @media(max-width: 1000px) {
        position: relative;
        left: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding: 0 auto;
    }
`;

interface ISVGOption {
    [key: string]: JSX.Element;
}

const svgOptions: ISVGOption = {
    'MetaMask': <MetamaskSVG />,
    'Gnosis Safe': <GnosisSafeSVG />,
    'Coinbase Wallet': <CoinbaseWalletSVG />,
    'Wallet Connect': <WalletConnectSVG />,
    'MyLilius Wallet': <MyLiliusWalletSVG />
};

const Column = styled.div`
    ${Flex('column', 'flex-end', 'center', 'nowrap')};
    position: absolute;
    right: 5%;
`;

const ActiveWallet = () => {

    const [balance, setBalance] = useState<string>("0");
    const [isDesktop, setIsDesktop] = useState<boolean>(true);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const { connector, account, provider, chainId } = useWeb3React<Provider>();

    const name = getName(connector);
    const _accountAddress = account!.substring(0, isDesktop ? 12 : 8) + '...' + account!.substring(isDesktop ? 32 : 36);
    const _svg: JSX.Element = svgOptions[name];

    const _networkTicker = () : string | undefined => {
        if (chainId) {
            if ([137, 80001].includes(chainId)) return 'MATIC';
            if ([81].includes(chainId)) return 'SBY';
            return 'ETH';
        }
    }

    useEffect(() => {
        setIsDesktop(window.screen.availWidth >= 1000);
    }, [window.screen.availWidth])

    const switchNetwork = (chainId: string) => {
        console.log("CHAIN ID: ", chainId);
        chainId = chainId.trim();
        if (!chainId.includes('0x')) chainId = ethers.utils.hexValue(BigNumber.from(chainId));
        
        if (provider) {
            provider.provider.request!({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId }]
            })
            .catch((err) => {
                console.log(err);
            })
        }

    }

    const toggleDropDown = () : void => {
        setShowDropdown(!showDropdown);
    }

    if (showDropdown) {
        return (
            <ActiveContainer>
                <ActiveWalletDropDown close={toggleDropDown} svgElement={_svg} account={_accountAddress} balance={balance} networkTicker={_networkTicker()} switchNetwork={switchNetwork} isDesktop={isDesktop} />
            </ActiveContainer>
        );
    }

    return (
        <ActiveContainer onClick={toggleDropDown}>
            <SVGContainer>
                {_svg}
            </SVGContainer>
            {isDesktop && <Column>
                <Text customStyle="font-size: 0.85rem;">{_accountAddress}</Text>
                <Text customStyle="font-size: 0.75rem; color: silver;">{balance} {_networkTicker()}</Text>
            </Column>}
        </ActiveContainer>
    );
}

export {
    ActiveWallet
}