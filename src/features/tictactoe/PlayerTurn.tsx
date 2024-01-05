import { useAppSelector } from "../../app/hooks"
import { slectCurrentPlayer } from "./ticTacToeSlice"

function PlayerTurn() {
  const currentPlayer = useAppSelector(slectCurrentPlayer)

  return <p className="player-turn">{currentPlayer === -1 ? "X" : "O"} Turn</p>
}

export default PlayerTurn
