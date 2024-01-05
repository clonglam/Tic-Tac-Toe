import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import NavBar from "../components/NavBar"

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <>
      <NavBar />
      <div>
        <h1>Oops</h1>
        <p>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected error occurred."}
        </p>
      </div>
    </>
  )
}

export default ErrorPage
