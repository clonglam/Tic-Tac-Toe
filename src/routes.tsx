import { createBrowserRouter } from "react-router-dom"

import HomePage from "./pages/HomePage"
import Layout from "./pages/Layout"
import ErrorPage from "./pages/ErrorPage"
import AboutPage from "./pages/AboutPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
])

export default router
