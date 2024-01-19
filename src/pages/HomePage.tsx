import styled from "styled-components"

import GameBoard from "../features/tictactoe/GameBoard"
import PlayerTurn from "../features/tictactoe/PlayerTurn"
import RestartButton from "../features/tictactoe/RestartButton"
import SocreBoard from "../features/tictactoe/SocreBoard"
import WinnerModal from "../features/tictactoe/WinnerModal"
import ModeSelector from "../features/tictactoe/ModeSelector"
import HistoryList from "../features/history/HistoryList"
import Branding from "../components/Branding"

const GameCanvas = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`
const Aside = styled.aside`
  grid-column: span 3;
`
const GameSection = styled.section`
  grid-column: span 9;
`

const HomePageWrapper = styled.main`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 10px;
`

function HomePage() {
  return (
    <>
      <Branding />

      <HomePageWrapper className="container">
        <Aside>
          <ModeSelector />
          <HistoryList />
        </Aside>

        <GameSection>
          <SocreBoard />
          <PlayerTurn />

          <GameCanvas>
            <GameBoard />

            <WinnerModal />
          </GameCanvas>

          <RestartButton />
        </GameSection>
      </HomePageWrapper>
    </>
  )
}

export default HomePage
