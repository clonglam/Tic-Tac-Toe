import styled, { keyframes } from "styled-components"

type CircleProps = { width?: number; height?: number }

const circleAnimation = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`
const StyledCircleSVG = styled.svg`
  fill: none;
  stroke: #81b29a;
  stroke-width: 7px;
  stroke-linecap: round;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transform: scaleX(-1) rotate(-90deg);

  animation-iteration-count: 1;
  animation: ${circleAnimation} 0.5s ease-in forwards;
`

function Circle({ width = 88, height = 88 }: CircleProps) {
  return (
    <StyledCircleSVG
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 88 88"
    >
      <circle cx="44" cy="44" r="40" />
    </StyledCircleSVG>
  )
}

export default Circle
