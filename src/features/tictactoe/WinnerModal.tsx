import styled, { keyframes } from "styled-components"
import { useAppSelector } from "../../app/hooks"
import Circle from "./Circle"
import Cross from "./Cross"
import { selectResult } from "./ticTacToeSlice"

interface WrapperProps {
  hidden: boolean
}
const fadeIn = keyframes`
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  `
const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  height: 100%;
  width: 640px;
  background: var(--background-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: ${(p) => (p.hidden ? "none" : "flex")};
  animation: ${fadeIn} 0.3s linear 500ms;
  animation-fill-mode: both;
`

const WinnerText = styled.h1`
  text-align: center;
  font-size: 3em;
  text-align: center;
  padding: 0%;
`
function WinnerModal() {
  const result = useAppSelector(selectResult)

  return (
    <Wrapper hidden={result === null}>
      <div>
        {result === "TIE" ? (
          <div>
            <Cross />
            <Circle />
          </div>
        ) : result?.winner === "X" ? (
          <Cross />
        ) : (
          <Circle />
        )}
      </div>
      <WinnerText>{result === "TIE" ? "TIE" : "WINNER"}</WinnerText>
    </Wrapper>
  )
}

export default WinnerModal
