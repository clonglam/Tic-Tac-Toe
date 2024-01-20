import styled from "styled-components"
import { useAppDispatch } from "../../app/hooks"
import { newGame } from "./ticTacToeSlice"

const StyledRestartButton = styled.button`
  padding: 1em 4em;
  font-size: large;
  background: #f2cc8f;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all;
  transition-duration: 0.3s;
  &:hover {
    background-color: #e1bb7f;
  }
`

function RestartButton() {
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(newGame())
  }

  return (
    <StyledRestartButton onClick={() => onClickHandler()}>
      Restart
    </StyledRestartButton>
  )
}

export default RestartButton
