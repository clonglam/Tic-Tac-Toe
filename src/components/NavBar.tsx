import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledNavbar = styled.div`
  height: 54px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0 2rem;
  position: relative;
  top: 0;
  background: var(--background-color);
`

const Brading = styled.span`
  font-size: 22px;
  font-weight: 600;
`

const NavBar = () => {
  return (
    <StyledNavbar className="container">
      <Link to="/">
        <Brading className="branding">
          <span>Tic</span>-<span>Tac</span>-<span>Toe</span>
        </Brading>
      </Link>
    </StyledNavbar>
  )
}

export default NavBar
