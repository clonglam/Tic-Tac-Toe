import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  recoverFromHistory,
  selectHistories,
  selectRollBackStep,
} from "./historySlice"

import { selectResult } from "../tictactoe/ticTacToeSlice"

const SectionWrapper = styled.section`
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: var(--text-color);
`
const Heading = styled.p`
  margin-bottom: 0.25rem;
  font-weight: 600;
  text-align: left;
  color: var(--text-color);
`
const List = styled.div`
  overflow-y: scroll;
  display: flex;
  padding: 0.5em;
  /* border: 1px var(--background-color-darker) solid; */
  border-radius: 5px;
  flex-direction: column;
  margin-bottom: 0.25rem;
  font-weight: 600;
  row-gap: 8px;
  height: 280px;
  align-items: flex-end;
  color: var(--text-color);
`
const RollBackButton = styled(({ ...props }) => <button {...props} />)`
  border: 1px var(--background-color-darker) solid;
  border-radius: 5px;
  font-weight: 600;
  height: 32px;
  background-color: transparent;
  width: 100%;
  cursor: pointer;
  width: ${(props) => (props.current ? "80%" : "100%")};
  color: var(--text-color);
  transition: all ease-in-out;
  animation-duration: 500ms;
`
function HistoryList() {
  const dispatch = useAppDispatch()
  const histories = useAppSelector(selectHistories)
  const currentStep = useAppSelector(selectRollBackStep)

  const result = useAppSelector(selectResult)

  const onClickHandler = (index: number) => {
    if (result === null) {
      dispatch(recoverFromHistory(index))
    }
  }

  return (
    <SectionWrapper>
      <Heading>History</Heading>
      <List>
        {histories.map((_, index) => (
          <RollBackButton
            key={index}
            current={currentStep === index}
            onClick={() => onClickHandler(index)}
          >
            {index === 0 ? "Game Start" : `Back to Move #${index}`}
          </RollBackButton>
        ))}
      </List>
    </SectionWrapper>
  )
}

export default HistoryList
