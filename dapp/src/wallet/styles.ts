import styled from 'styled-components';
import { BorderRadius, Flex, Theme } from '../utils/theme';

export const WalletContainer = styled.div`
    height: 75%;
    width: 15%;
    background: ${Theme.colors.primary};
    position: absolute;
    right: 2.5%;
    ${BorderRadius()};
    ${Flex('row', 'center', 'center')};
    color: white;
`;

export const ActivatingContainer = styled.div``;
export const ActiveContainer = styled.div`
    height: 100%;
    width: 100%;
    ${Flex('row', 'center', 'center')};
    z-index: 200;
`;
export const ConnectContainer = styled.div`
    width: 100%;.
    ${Flex('row', 'center', 'center')};
`;