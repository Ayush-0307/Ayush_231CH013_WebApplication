import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./Pages/Login"
import Dashboard from "./Pages/Dashboard"
import Error from './Pages/Error'
import SignIn from './Pages/SignIn'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/signin",
      element: <SignIn />
    },
    {
      path: "*",
      element: <Error />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
