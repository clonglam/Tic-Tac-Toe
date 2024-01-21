import styled from "styled-components"
import { GameMode, selectGameMode, setGameMode } from "./ticTacToeSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-bottom: 1rem;
`
const Select = styled.select`
  background: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--background-color-darker);
  border-radius: 5px;
  padding: 0.5em 1em;
  width: 280px;
  &:focus {
    border: none;
  }
`
const SelectionLabel = styled.label`
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: var(--text-color);
`

function ModeSelector() {
  const dispatch = useAppDispatch()
  const currentameMode = useAppSelector(selectGameMode)

  const gameModes: { label: string; value: GameMode }[] = [
    {
      label: "Easy",
      value: GameMode["EASY"],
    },
    {
      label: "Medium",
      value: GameMode["MEDIUM"],
    },
    {
      label: "Impossible",
      value: GameMode["IMPOSSIBLE"],
    },
    {
      label: "PVP",
      value: GameMode["PVP"],
    },
  ]

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGameMode(event.target.value as GameMode))
  }

  return (
    <Wrapper>
      <SelectionLabel>Game Mode:</SelectionLabel>
      <Select
        id="gameModeSelect"
        value={currentameMode}
        onChange={handleModeChange}
      >
        {gameModes.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </Wrapper>
  )
}

export default ModeSelector
