import styled from "styled-components"

import GameBoard from "../features/tictactoe/GameBoard"
import PlayerTurn from "../features/tictactoe/PlayerTurn"
import RestartButton from "../features/tictactoe/RestartButton"
import WinnerModal from "../features/tictactoe/WinnerModal"
import Branding from "../components/Branding"

const GameCanvas = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`

function HomePage() {
  return (
    <>
      <Branding />

      <section className="container">
        <PlayerTurn />

        <GameCanvas>
          <GameBoard />

          <WinnerModal />
        </GameCanvas>

        <RestartButton />
      </section>
    </>
  )
}

export default HomePage
