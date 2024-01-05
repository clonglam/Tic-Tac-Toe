import styled from "styled-components"

type Props = {
  lineType: "horizontal" | "vertical" | "diagonal"
  linePosition: number
}

const Line = styled.div<Props>`
  position: absolute;
  background-color: #213547; // Line color
  transform-origin: left center;
  border-radius: 5px;

  // Adjusting line style based on type and position
  ${({ lineType, linePosition }) => {
    switch (lineType) {
      case "horizontal":
        return `
          top: calc(${linePosition * 33.33}% - 80px);
          left: 0;
          width: 100%;
          height: 6px;
          animation: drawHorizontalLine 0.2s ease-in-out both;
        `
      case "vertical":
        return `
          top: 0;
          width: 6px;
          height: 100%;
          left: calc(${linePosition * 33.33}% - 80px);
          animation: drawVerticalLine 0.2s ease-in-out both;
        `
      case "diagonal":
        return `
          top: 80px;
          left: ${linePosition === 1 ? "80px" : "unset"};
          right: ${linePosition !== 1 ? "80px" : "unset"};
           transform-origin: ${
             linePosition === 1 ? "left center" : "right center"
           };
         width: 100%;
          height: 6px;
          transform: ${linePosition === 1 ? "rotate(45deg)" : "rotate(-45deg)"};
          animation: drawHorizontalLine 0.2s ease-in-out

        `
      default:
        return ""
    }
  }}
`

function WinningLine({ lineType, linePosition }: Props) {
  return <Line linePosition={linePosition} lineType={lineType} />
}

export default WinningLine
