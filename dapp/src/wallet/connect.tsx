import { useState } from "react";
import { Text } from "../utils";
import { ConnectWalletDropdown } from "./connect_dropdown";
import { ConnectContainer } from "./styles";

const ConnectWallet = () => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleWalletButtonClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!showDropdown) {
            setShowDropdown(true);
        }
    }

    return (
        <ConnectContainer onClick={handleWalletButtonClick}>
            {showDropdown ? <ConnectWalletDropdown close={(e: { preventDefault: () => void; }) => {
                e.preventDefault();
                setShowDropdown(false);
            }} /> : <Text customStyle="width: 100%; text-align: center;">Connect Wallet</Text>}
        </ConnectContainer>
    );
}

export {
    ConnectWallet
}