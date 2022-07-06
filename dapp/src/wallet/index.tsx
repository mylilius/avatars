import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { ActivatingWallet } from "./activating";
import { ActiveWallet } from "./active";
import { ConnectWallet } from "./connect";
import { WalletContainer } from "./styles";

const Wallet = () => {
    const web3 = useWeb3React();

    const isActivating: boolean = web3.isActivating;
    const isActive: boolean = web3.isActive;

    return (
        <WalletContainer>
            {isActive ? <ActiveWallet /> : <ConnectWallet />}
            {isActivating && <ActivatingWallet />}
        </WalletContainer>
    );
}

export {
    Wallet
}