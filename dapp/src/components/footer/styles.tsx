import styled from 'styled-components';
import { Flex } from '../../utils/theme';

export const FooterContainer = styled.div`
    height: 2.5%;
    width: 100%;
    position: fixed;
    bottom: 1.5%;
    left: 0;
    right: 0;
    ${Flex('row', 'center', 'center')};
    @media(max-width: 764px) {
        p {
            font-size: 0.75rem;
            text-align: center;
        }
    }
`;