import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { Web3ReactHooks } from "@web3-react/core";
import { EIP1193 } from "@web3-react/eip1193";
import { GnosisSafe } from "@web3-react/gnosis-safe";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import styled from "styled-components";
import { Border, BorderRadius } from "../utils";
import { Text } from "../utils";

import { CoinbaseWalletSVG } from "./icons/coinbase_wallet";
import { GnosisSafeSVG } from "./icons/gnosis_safe";
import { MetamaskSVG } from "./icons/metamask";
import { WalletConnectSVG } from "./icons/wallet_connect";
import { MyLiliusWalletSVG } from "./icons/mylilius_wallet";
// import GnosisSafeSVG from "../../config/wallet_icons/gnosis_safe.svg";

const WalletOptionContainer = styled.div`
    height: 25px;
    width: 90%;
    margin: 8px 5%;
    ${BorderRadius()};
    ${Border('0.5px', 'white')};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 35px;
    position: relative;
    cursor: pointer;
    p {
        position: absolute;
        left: 25%;
    }
`;

const SVGContainer = styled.div`
    position: absolute;
    left: 10%;
    height: 75%;
`;

interface Props {
    label: string;
    img: string;
    instance: MetaMask | CoinbaseWallet | WalletConnect | EIP1193 | Network | GnosisSafe
    hooks: Web3ReactHooks;
}

interface ISVGOption {
    [key: string]: JSX.Element;
}

const ConnectWalletOption = ({ label, img, instance, hooks } : Props ) => {

    const svgOptions: ISVGOption = {
        'metamask': <MetamaskSVG height="24" />,
        'gnosis_safe': <GnosisSafeSVG />,
        'coinbase_wallet': <CoinbaseWalletSVG />,
        'wallet_connect': <WalletConnectSVG />,
        'mylilius_wallet': <MyLiliusWalletSVG />
    };

    const { useChainId } = hooks;

    const chainId = useChainId();
    const connect = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        instance.activate(chainId)
            .then(() => console.log("Success"))
            .catch((err) => console.log("Error: ", err));
    }

    return (
        <WalletOptionContainer onClick={connect}>
            <SVGContainer>
                {svgOptions[img] ?? <span></span>}
            </SVGContainer>
            <Text>{label}</Text>
        </WalletOptionContainer>
    )
}

export {
    ConnectWalletOption
}