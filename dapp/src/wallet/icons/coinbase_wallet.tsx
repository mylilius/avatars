import styled from "styled-components";

const SVG = styled.svg`
    border-radius: 16px;
    .st0 {
        fill: #0052FF; 
    }    
`;

function CoinbaseWalletSVG({ height = '24', width = '24'}) {
  return (
    <SVG
        xmlns='http://www.w3.org/2000/svg'
        width={width}
        height={height}
        fill='none'
        viewBox='0 0 1024 1024'
    >
        <path fill='#0052FF' d='M0 0H1024V1024H0z'></path>
        <path
        fill='#fff'
        fillRule='evenodd'
        d='M152 512c0 198.823 161.177 360 360 360s360-161.177 360-360-161.177-360-360-360-360 161.177-360 360zm268-116c-13.255 0-24 10.745-24 24v184c0 13.255 10.745 24 24 24h184c13.255 0 24-10.745 24-24V420c0-13.255-10.745-24-24-24H420z'
        clipRule='evenodd'
        ></path>
    </SVG>
  );
}

export {
    CoinbaseWalletSVG
}
