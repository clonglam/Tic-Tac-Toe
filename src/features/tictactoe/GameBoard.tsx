import { useEffect } from "react"
import { useDispatch } from "react-redux"
import styled, { keyframes } from "styled-components"
import { useAppSelector } from "../../app/hooks"
import Cell from "./Cell"
import WinningLine from "./WinningLine"
import {
  GameMode,
  PlayerType,
  aiMove,
  checkWinner,
  nextPlayer,
  selectBoard,
  selectGameMode,
  selectResult,
  slectCurrentPlayer,
} from "./ticTacToeSlice"

const clipMask = keyframes`
     from {
    clip-path: circle(10% at 50% 50%);
  }
  to {
    clip-path: circle(100% at 50% 50%);
  };`

const Board = styled.table`
  animation: ${clipMask} 1s linear;
  border-collapse: collapse;
  position: relative;
`
const Row = styled.tr`
  &:first-child td {
    border-top: 0;
  }
  &:last-child td {
    border-bottom: 0;
  }
  & td:first-child {
    border-left: 0;
  }
  & td:last-child {
    border-right: 0;
  }
`

function GameBoard() {
  const dispatch = useDispatch()
  const board = useAppSelector(selectBoard)
  const result = useAppSelector(selectResult)

  const currentPlayer = useAppSelector(slectCurrentPlayer)
  const gameMode = useAppSelector(selectGameMode)

  useEffect(() => {
    if (
      gameMode != GameMode["PVP"] &&
      currentPlayer.playerType === PlayerType["AI"] &&
      result === null
    ) {
      console.log("AI is move")
      dispatch(aiMove())
      dispatch(checkWinner())
      dispatch(nextPlayer())
    }
  }, [currentPlayer.playerType, gameMode, dispatch, result])

  return (
    <Board>
      <tbody>
        {[...Array(3)].map((_, rowIndex) => (
          <Row key={rowIndex}>
            {[...Array(3)].map((_, colIndex) => {
              const cellIndex = rowIndex * 3 + colIndex
              return (
                <Cell
                  key={cellIndex}
                  value={board[cellIndex]}
                  cellIndex={cellIndex}
                />
              )
            })}
          </Row>
        ))}
      </tbody>

      {result != null && result != "TIE" && (
        <WinningLine
          lineType={result.lineType}
          linePosition={result.linePosition}
        />
      )}
    </Board>
  )
}

export default GameBoard
