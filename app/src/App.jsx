import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './pages/Main'
import User from './pages/User'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  }, 
  {
    path: '/user/:username',
    element: <User />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
