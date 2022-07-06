import styled from "styled-components";

const SVG = styled.svg`
    border-radius: 16px;
    .cls-1 {
        fill: #008b73; 
    }    
`;

function GnosisSafeSVG({ height = '24', width = '24'}) {
  return (
    <SVG
        xmlns='http://www.w3.org/2000/svg'
        data-name='Layer 1'
        viewBox='0 0 440 440'
        height={height}
        width={width}
    >
        <path
        d='M220 9.82C103.92 9.82 9.82 103.92 9.82 220S103.92 430.18 220 430.18 430.18 336.08 430.18 220 336.08 9.82 220 9.82zm153.83 221.65H276.3a59.41 59.41 0 11.45-20.67h97.08a10.34 10.34 0 110 20.67z'
        className='cls-1'
        ></path>
    </SVG>
  );
}

export {
    GnosisSafeSVG
}