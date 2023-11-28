import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Profile from './pages/Profile'
// import SearchMarkets from './pages/SearchMarkets'
import Homepage from './pages/Homepage'
import SearchMarkets from './pages/SearchMarkets'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/search',
        element: <SearchMarkets />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
