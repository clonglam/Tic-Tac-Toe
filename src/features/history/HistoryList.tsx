import styled from "styled-components"
import { useAppSelector } from "../../app/hooks"
import { selectHistories } from "./historySlice"

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
  border: 1px var(--background-color-darker) solid;
  border-radius: 5px;
  flex-direction: column;
  margin-bottom: 0.25rem;
  font-weight: 600;
  row-gap: 8px;
  height: 280px;
  color: var(--text-color);
`
const RollBackButton = styled.button`
  border: 1px var(--background-color-darker) solid;
  border-radius: 5px;
  font-weight: 600;
  height: 32px;
  background-color: transparent;
  width: 80%;
  color: var(--text-color);
`
function HistoryList() {
  const histories = useAppSelector(selectHistories)
  return (
    <SectionWrapper>
      <Heading>History</Heading>
      <List>
        {histories.map((history, index) => (
          <div key={index}>
            <RollBackButton>{`history ${index}`}</RollBackButton>
          </div>
        ))}
      </List>
    </SectionWrapper>
  )
}

export default HistoryList
