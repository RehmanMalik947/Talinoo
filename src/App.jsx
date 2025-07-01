
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Auth/Home'
import Login from './components/Auth/Login'
import NavBar from './components/Auth/common/NavBar'
import Dashboard from './components/Admin/Dashboard'
import Clients from './components/admin/clients'
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
    {
      path:'/dashboard',
      element:<Dashboard/>
    },
    {
      path:'/NavBar',
      element:<NavBar/>
    },
    {
      path:'/clients',
      element:<Clients/>
    }

  ])

  return (
    <>
    
        <RouterProvider router={router}/>
     </>
  )
}
export default App