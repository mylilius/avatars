import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { coinbaseWallet, hooks as coinbaseWalletHooks } from '../wallet/connectors/coinbase_wallet';
import { hooks as metaMaskHooks, metaMask } from '../wallet/connectors/metamask';
import { hooks as networkHooks, network } from '../wallet/connectors/network';
import { hooks as walletConnectHooks, walletConnect } from '../wallet/connectors/wallet_connect';

const connectors: [MetaMask | WalletConnect | CoinbaseWallet | Network, Web3ReactHooks][] = [
    [metaMask, metaMaskHooks],
    [walletConnect, walletConnectHooks],
    [coinbaseWallet, coinbaseWalletHooks],
    [network, networkHooks],
];

export default connectors;

