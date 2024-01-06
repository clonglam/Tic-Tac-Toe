import styled from "styled-components"
import Cross from "./Cross"
import Circle from "./Circle"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  GameMode,
  Marks,
  selectBoard,
  selectGameMode,
  selectHumanMark,
  selectPlayers,
  selectResult,
  switchMark,
} from "./ticTacToeSlice"

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 480px;
  gap: 0px 5rem;
`

const ScoreBoard = styled(({ ...props }) => <section {...props} />)`
  width: 1508px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border: #f2cc8f 1px solid;
  cursor: ${(props) => (props.disabled ? "disabled" : "pointer")};
  border-bottom: ${(props) => (props.currentPlayer ? "#a3b18a 5px solid" : "")};
`

function SocreBoard() {
  const dispatch = useAppDispatch()

  const gameMode = useAppSelector(selectGameMode)
  const currentHumanMark = useAppSelector(selectHumanMark)
  const board = useAppSelector(selectBoard)
  const players = useAppSelector(selectPlayers)
  const result = useAppSelector(selectResult)

  const onClickHandler = (mark: Marks) => {
    if (
      gameMode == GameMode["PVP"] ||
      mark === currentHumanMark ||
      (!board.every((cell) => cell === null) && result === null)
    )
      return
    dispatch(switchMark())
  }

  return (
    <Wrapper className="container">
      {(["X", "O"] as Marks[]).map((mark) => (
        <ScoreBoard
          key={mark}
          disabled={gameMode === GameMode["PVP"]}
          currentPlayer={currentHumanMark === mark}
          onClick={() => onClickHandler(mark)}
        >
          {mark === "X" ? (
            <Cross width={12} height={12} />
          ) : (
            <Circle width={12} height={12} />
          )}

          <div>{players[mark].score === 0 ? "-" : players[mark].score}</div>
        </ScoreBoard>
      ))}
    </Wrapper>
  )
}

export default SocreBoard
