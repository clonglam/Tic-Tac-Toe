import styled, { keyframes } from "styled-components"
import { useAppSelector } from "../../app/hooks"
import Cell from "./Cell"
import WinningLine from "./WinningLine"
import { selectBoard, selectResult } from "./ticTacToeSlice"

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
  const board = useAppSelector(selectBoard)
  const result = useAppSelector(selectResult)

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
