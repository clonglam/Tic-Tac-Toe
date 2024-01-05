import styled from "styled-components"

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: #f2cc8f 1px solid;
  padding: 1em 0em;
`
const FooterContent = styled.p`
  text-align: center;
  color: var(--text-color-lighter);
  & a {
    color: var(--text-color);
  }
  & a :hover {
    text-decoration: underline;
  }
`

function Footer() {
  return (
    <StyledFooter>
      <FooterContent>
        © All rights reserved. Made with ❤ by <a href="">Arcade Project</a>
      </FooterContent>
    </StyledFooter>
  )
}

export default Footer
