import styled from "styled-components"

import GameBoard from "../features/tictactoe/GameBoard"
import PlayerTurn from "../features/tictactoe/PlayerTurn"
import RestartButton from "../features/tictactoe/RestartButton"
import SocreBoard from "../features/tictactoe/SocreBoard"
import WinnerModal from "../features/tictactoe/WinnerModal"
import ModeSelector from "../features/tictactoe/ModeSelector"

const GameCanvas = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`

function HomePage() {
  return (
    <div className="container">
      <h1 className="branding">
        <span>Tic</span>-<span>Tac</span>-<span>Toe</span>
      </h1>
      <ModeSelector />
      <div>
        <SocreBoard />
        <PlayerTurn />
      </div>

      <GameCanvas>
        <GameBoard />

        <WinnerModal />
      </GameCanvas>

      <RestartButton />
    </div>
  )
}

export default HomePage
