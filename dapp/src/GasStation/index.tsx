import styled from "styled-components";
import { BorderRadius, Flex, H5, SubTitle, Text, Theme } from "../utils";

const GasStationContainer = styled.div`
    height: 100vh;
    width: 100%;
    margin: 16px;

`;

const SectionTitle = styled(SubTitle)`
    margin: 8px 0 8px 0;
    
`;
const SectionContent = styled(Text)`
    width: 75%;
    line-height: 1.5;
`;

const LinkContainers = styled.div`
    width: 100%;
    height: auto;
    min-height: 50vh;
    ${Flex('row', 'center', 'space-evenly', 'wrap')};
`;
const LinkContainer = styled.a`
    height: 25%;
    min-height: 100px;
    width: 25%;
    background: ${Theme.colors.background};
    ${BorderRadius()}
    position: relative;
    ${Flex('column', 'center', 'center')};
    &:hover {
        background: ${Theme.colors.primary};
        border: 1px solid ${Theme.colors.background};
    }
    text-decoration: none;
`;

const GasStation = () => {
    return (
        <GasStationContainer>
            <SectionTitle>Gas Station</SectionTitle>
            <SectionContent>The DOT Avatars dApp does not currently support a native gas-station for testnet. We are looking to add a simpler mechanism for attaining gas.</SectionContent>
            <SectionContent>Currently we offer external links to quickly attain gas on the various testnets.</SectionContent>
            <LinkContainers>
                <LinkContainer href="https://testnet.station.mylilius.com">
                    <H5>MyLilius (SKALE Network)</H5>
                    <Text>sFUEL Station</Text>
                </LinkContainer>
                <LinkContainer href="https://portal.astar.network/#/assets">
                    <H5>Astar (Shibuya)</H5>
                    <Text>Astar Portal</Text>
                </LinkContainer>
                <LinkContainer href="https://faucet.polygon.technology">
                    <H5>Polygon (Mumbai)</H5>
                    <Text>Team Faucet</Text>
                </LinkContainer>
            </LinkContainers>
        </GasStationContainer>
    );
}

export {
    GasStation
}