import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../app/hooks"
import {
  checkWinner,
  nextPlayer,
  placeMark,
  selectBoard,
  selectLinePosition,
  selectLineType,
  selectWinner,
} from "./ticTacToeSlice"
import Cross from "./Cross"
import Circle from "./Circle"
import styled, { keyframes } from "styled-components"
import WinningLine from "./WinningLine"

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
const Cell = styled.td`
  border: 6px solid var(--background-color-darker);
  height: 125px;
  width: 125px;
  text-align: center;
  vertical-align: middle;
  padding: 15px;
  cursor: pointer;
  padding: 0.3em 0.3em;
`

function GameBoard() {
  const dispatch = useDispatch()
  const board = useAppSelector(selectBoard)
  const winner = useAppSelector(selectWinner)
  const lineType = useAppSelector(selectLineType)
  const linePosition = useAppSelector(selectLinePosition)

  const onClickHandler = (index: number) => {
    if (board[index] !== 0) {
      return
    }

    dispatch(placeMark(index))
    dispatch(nextPlayer())
  }

  useEffect(() => {
    dispatch(checkWinner())
  }, [board, dispatch])

  return (
    <Board>
      <tbody>
        {[...Array(3)].map((_, rowIndex) => (
          <Row key={rowIndex}>
            {[...Array(3)].map((_, colIndex) => {
              const cellIndex = rowIndex * 3 + colIndex
              return (
                <Cell onClick={() => onClickHandler(cellIndex)} key={cellIndex}>
                  {board[cellIndex] === 0 ? (
                    " "
                  ) : board[cellIndex] === -1 ? (
                    <Cross />
                  ) : (
                    <Circle />
                  )}
                </Cell>
              )
            })}
          </Row>
        ))}
      </tbody>
      {winner && lineType && linePosition && (
        <WinningLine lineType={lineType} linePosition={linePosition} />
      )}
    </Board>
  )
}

export default GameBoard
