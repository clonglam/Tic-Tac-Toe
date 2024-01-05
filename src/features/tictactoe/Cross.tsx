import styled, { keyframes } from "styled-components"

type Props = { width?: number; height?: number }

const crossAnimation = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`
const StyledCross = styled.svg`
  fill: none;
  stroke: #e07a5f;
  stroke-width: 8px;
  stroke-linecap: round;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transform: rotate(90deg);
  & g line:nth-child(1) {
    animation: ${crossAnimation} 0.3s ease-in forwards;
  }
  & g line:nth-child(2) {
    animation: ${crossAnimation} 400ms ease-out 200ms forwards;
  }
`

function Cross({ width = 88, height = 88 }: Props) {
  return (
    <StyledCross
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 88 88"
    >
      <g>
        <line className="cross" x1="3.18" y1="3.18" x2="83.18" y2="83.18" />
        <line className="cross" x1="3.18" y1="83.18" x2="83.18" y2="3.18" />
      </g>
    </StyledCross>
  )
}

export default Cross
