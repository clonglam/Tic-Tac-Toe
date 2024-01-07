import styled from "styled-components"

function AboutPage() {
  const AboutWrapper = styled.article`
    min-height: 70vh;
    text-align: left;
    max-width: 1200px;
  `
  const ArticleHeading = styled.h1`
    font-size: 32px;
    font-weight: 600;
  `
  const Section = styled.section`
    & h2 {
      margin-bottom: 0px;
    }
    & p {
      margin-top: 5px;
    }
  `

  return (
    <AboutWrapper>
      <ArticleHeading>About</ArticleHeading>
      <Section>
        <h2>Overview</h2>
        <p>
          This project is part of the Arcade Projects series. It's a classic Tic
          Tac Toe game built using React.js (Vite), Redux, and
          styled-components. The game features multiple modes, including Player
          vs. Player (PvP) and different levels of AI difficulty.
        </p>
      </Section>
      <Section>
        <h2>Algorithm</h2>
        <p>Try out the game: Play Tic Tac Toe</p>
      </Section>
      <Section>
        <h2>Technologies Used</h2>
        <ul>
          <li>Frontend: React.js (Vite)</li>
          <li>State Management: Redux Styling:</li>
          <li>Styled-Components</li>
        </ul>
      </Section>
    </AboutWrapper>
  )
}

export default AboutPage
