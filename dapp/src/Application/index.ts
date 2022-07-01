import styled from 'styled-components';
import { Theme } from '../utils/theme';

export const AppContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    @media(max-width: 764px) {
        max-height: 100vh;
    }
    background: linear-gradient(135deg, ${Theme.colors.primary}, ${Theme.colors.secondary});
    
`;