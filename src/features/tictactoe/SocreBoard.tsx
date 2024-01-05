import styled from "styled-components"
import Cross from "./Cross"
import Circle from "./Circle"
import { useAppSelector } from "../../app/hooks"
import { slectCurrentPlayer } from "./ticTacToeSlice"

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 480px;
  gap: 0px 5rem;
`
const ScoreBoard = styled.section<{ currentPlayer: boolean }>`
  width: 1508px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border: #f2cc8f 1px solid;
  border-bottom: ${(p) => (p.currentPlayer ? "#a3b18a 5px solid" : "")};
`

function SocreBoard() {
  const currentPlayer = useAppSelector(slectCurrentPlayer)
  return (
    <Wrapper className="container">
      <ScoreBoard currentPlayer={currentPlayer === 1}>
        <Circle width={12} height={12} />
        <div>-</div>
      </ScoreBoard>

      <ScoreBoard currentPlayer={currentPlayer === -1}>
        <Cross width={12} height={12} />
        <div>-</div>
      </ScoreBoard>
    </Wrapper>
  )
}

export default SocreBoard
