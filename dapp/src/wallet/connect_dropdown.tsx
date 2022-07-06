import styled from "styled-components";
import { Web3ContextType, Web3ReactHooks,  } from "@web3-react/core";
import { Web3Provider } from '@ethersproject/providers';
import { BorderRadius, Flex, H3, H5, SubText, Theme } from "../utils";
import { Text } from "../utils";
import { ConnectWalletOption } from "./connect_option";
import * as MetamaskConfig from "./connectors/metamask";
import * as CoinbaseWalletConfig from './connectors/coinbase_wallet';
import * as WalletConnectConfig from './connectors/wallet_connect';

const Dropdown = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    z-index: 2000;
    background: ${Theme.colors.background};
    min-height: 225px;
    height: auto;
    ${BorderRadius()};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;  
`;

const DropdownTitle = styled.div`
    margin: 8px 0;
    text-align: center;
`;

const Row = styled.div`
    ${Flex('row', 'center', 'space-between', 'nowrap')};
`;

interface IProps {
    close: Function;
}

const ConnectWalletDropdown = ({ close }: IProps) => {
    return (
        <Dropdown>
            <DropdownTitle>
                <Row>
                    <H5 customStyle="text-align: left; margin: 0 0 0 5%;">Select Wallet</H5>
                    <SubText onClick={close} customStyle="text-align: right; margin: 0 5% 0 0; font-weight: bold; color: red;">X</SubText>
                </Row>
                <span style={{ height: '10px' }}></span>
                <ConnectWalletOption img="metamask" label="MetaMask" instance={MetamaskConfig.metaMask} hooks={MetamaskConfig.hooks} />
                <ConnectWalletOption img="coinbase_wallet" label="Coinbase Wallet" instance={CoinbaseWalletConfig.coinbaseWallet} hooks={CoinbaseWalletConfig.hooks} />
                <ConnectWalletOption img="wallet_connect" label="WalletConnect" instance={WalletConnectConfig.walletConnect} hooks={WalletConnectConfig.hooks}  />
                {/* <ConnectWalletOption img="gnosis_safe" label="Gnosis Safe" instance={GnosisSafeConfig.gnosisSafe} hooks={GnosisSafeConfig.hooks}  /> */}
                {/* <ConnectWalletOption img="browser_wallet" label="Browser Wallet" instance={Eip1159Config.eip1193} hooks={Eip1159Config.hooks} /> */}
                <ConnectWalletOption img="mylilius_wallet" label="MyLilius Wallet" instance={WalletConnectConfig.walletConnect} hooks={WalletConnectConfig.hooks} />
            </DropdownTitle>
        </Dropdown>
    );
}

export {
    ConnectWalletDropdown
}