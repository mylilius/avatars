import styled from 'styled-components';
import { Flex, Theme } from '../../utils/theme';

export const NavigationContainer = styled.nav`
    width: 100%;
    height: auto;
    min-height: 50px;
    background: ${Theme.colors.background};
    border-bottom: 5px solid ${Theme.colors.primary};
    ${Flex('row', 'center', 'space-between')};
    position: relative;
`;

export const NavigationTitleContainer = styled.div`
    position: absolute;
    left: 5%;
`;