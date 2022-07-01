import styled from 'styled-components';
import { Flex } from '../../utils/theme';

export const HomePageContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    ${Flex('row', 'center', 'space-evenly', 'wrap')};
    .home_container {
        height: 50vh;
        width: 40%;
        @media(max-width: 764px) {
            width: 85%;
            min-height: 20%;
            height: auto;
        }
    }
`;

export const AvatarsGraphicContainer = styled.div`
    background: red;
`;
export const TextWelcomeContainer = styled.div`
    ${Flex('column', 'flex-start', 'center')};
    @media(max-width: 764px) {
        ${Flex('column', 'center', 'center')};
        text-align: center;
    }
`;
