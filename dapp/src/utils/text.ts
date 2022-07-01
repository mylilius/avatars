import styled from 'styled-components';

export const H1 = styled.h1<any>`
    font-size: 1.85rem;
    color: #FEFEFE;
    font-weight: bold;
    ${(props) => props.customStyle};
`;

export const H2 = styled.h2<any>`
    font-size: 2rem;
    color: #FEFEFE;
    font-weight: bold;
    ${(props) => props.customStyle};
`;

export const H3 = styled.h3<any>`
    font-size: 1.75rem;
    color: #FEFEFE;
    ${(props) => props.customStyle};
`;

export const SubTitle = styled.h5<any>`
    font-size: 1.75rem;
    color: silver;
    font-weight: bold;
    font-style: italic;
    ${(props) => props.customStyle};
`;


export const Text = styled.p<any>`
    font-size: 1.15rem;
    color: #FEFEFE;
    ${(props) => props.customStyle};
`;

export const SubText = styled.p<any>`
    font-size: 1.15rem;
    color: #FEFEFE;
    ${(props) => props.customStyle};
`;