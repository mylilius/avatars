import styled from "styled-components";
import { Flex, H5 } from "../utils";

const ConnectWalletContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 95vh;
    overflow-y: hidden;
    ${Flex('row', 'center', 'center')};
`;
const ConnectWallet = () => {
    return (
        <ConnectWalletContainer>
            <H5>Please Connect a Wallet to Continue</H5>
        </ConnectWalletContainer>
    );
}

export {
    ConnectWallet
}