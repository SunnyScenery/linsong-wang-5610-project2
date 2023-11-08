import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Rules from './routes/rules'
import Play from './routes/play'
import Homepage from './routes/homepage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />
  },
  {
    path: '/play',
    element: <Play />
  },
  {
    path: '/rules',
    element: <Rules />
  }
]);

function App() {

  return (
      <RouterProvider router={router} />
  )
}

export default App
