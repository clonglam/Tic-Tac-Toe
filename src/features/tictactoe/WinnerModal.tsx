import styled, { keyframes } from "styled-components"
import { useAppSelector } from "../../app/hooks"
import Circle from "./Circle"
import Cross from "./Cross"
import { selectWinner } from "./ticTacToeSlice"

interface WrapperProps {
  show: boolean
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
  display: ${(p) => (p.show ? "flex" : "none")};
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
  const winner = useAppSelector(selectWinner)

  return (
    // <Wrapper show={false}>
    <Wrapper show={winner !== null}>
      <div>
        {winner === 0 ? (
          <>
            <Cross />
            <Circle />
          </>
        ) : winner === -1 ? (
          <Cross />
        ) : (
          <Circle />
        )}
      </div>
      <WinnerText>Winner</WinnerText>
    </Wrapper>
  )
}

export default WinnerModal
