
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Auth/Home'
import Login from './components/Auth/Login'
function App() {

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    // {
    //   path:'/dashborad',
    //   element:<Dashboard/>
    // }
  ])

  return (
    <>
        <RouterProvider router={router}/>
     </>
  )
}
export default App