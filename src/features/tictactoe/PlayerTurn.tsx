import { useAppSelector } from "../../app/hooks"
import Circle from "./Circle"
import Cross from "./Cross"
import { selectCurrentRound } from "./ticTacToeSlice"

function PlayerTurn() {
  const currentRound = useAppSelector(selectCurrentRound)

  return (
    <p className="player-turn">
      {currentRound === "X" ? (
        <Cross width={12} height={12} />
      ) : (
        <Circle width={12} height={12} />
      )}{" "}
      Turn
    </p>
  )
}

export default PlayerTurn
