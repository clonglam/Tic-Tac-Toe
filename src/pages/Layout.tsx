import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

function Layout() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout
