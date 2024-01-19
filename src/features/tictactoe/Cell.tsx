import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Circle from "./Circle"
import Cross from "./Cross"
import {
  Marks,
  PlayerType,
  placeMark,
  slectCurrentPlayer,
} from "./ticTacToeSlice"

type CellProps = {
  cellIndex: number
  value: Marks | null
}

const StyledCell = styled.td`
  border: 6px solid var(--background-color-darker);
  height: 125px;
  width: 125px;
  text-align: center;
  vertical-align: middle;
  padding: 15px;
  cursor: pointer;
  padding: 0.3em 0.3em;
`
function Cell({ cellIndex, value }: CellProps) {
  const dispatch = useAppDispatch()
  const currentPlayer = useAppSelector(slectCurrentPlayer)

  const onClickHandler = (index: number) => {
    if (value !== null || currentPlayer.playerType === PlayerType["AI"]) {
      return
    }
    dispatch(placeMark(index))
  }
  return (
    <StyledCell onClick={() => onClickHandler(cellIndex)}>
      {value === null ? " " : value === "X" ? <Cross /> : <Circle />}
    </StyledCell>
  )
}

export default Cell
