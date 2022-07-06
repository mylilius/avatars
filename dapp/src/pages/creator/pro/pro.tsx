import styled from 'styled-components';
import { Flex, SubTitle, Text } from '../../../utils';
import { PurchaseUI } from './purchase_ui';

const ProContainer = styled.div`
    ${Flex('column', 'flex-start', 'flex-start')};
`;

const SectionTitle = styled(SubTitle)`
    margin: 8px 0 8px 0;
    
`;
const SectionContent = styled(Text)`
    width: 80%;
    line-height: 1.5;
`;

const PurchaseContainer = styled.div`
    ${Flex('row', 'center', 'flex-start', 'wrap')};
    width: 100%;
    height: auto;
    margin: 16px 0;
`;

const Pro = () => {
    return (
        <ProContainer>
            <SectionTitle>DOT Avatar PRO Creator</SectionTitle>
            <SectionContent>
                Creators have a limit of 3 uploads per network. However, with the purchase of a Creator PRO badge; creators can upload an unlimited number of NFTs.
            </SectionContent>
            <SectionTitle>Badge by Network</SectionTitle>
            <SectionContent>While the core avatars combine all the networks, the PRO badges are by network. This means that creators can upload assets to multiple networks and depending on success purchase the pro badge for a single network, or all of them!<br /></SectionContent>
            <SectionTitle>Cost</SectionTitle>
            <SectionContent>The cost for the PRO Badge NFT is $5 and is available in different currencies listed by network below. Want to support the development of the platform at a greater level? You can buy as many badges as you want!</SectionContent>
            <PurchaseContainer>
                <PurchaseUI />
            </PurchaseContainer>
        </ProContainer>
    );
}

export {
    Pro
}