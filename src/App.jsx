
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Auth/Home'
import Login from './components/Auth/Login'
import NavBar from './components/Auth/common/NavBar'
import Dashboard from './components/Admin/Dashboard'
import Clients from './components/admin/Clients'
import ClientDetails from './components/admin/ClientDetails'
import Talents from './components/admin/Talents'
import TalentDetails from './components/admin/TalentDetails'
import Talent1 from './components/admin/Talent1'
import TalentProfile from './components/admin/TalentProfile'
import Payments from './components/admin/Payments'
import Transactions from './components/admin/Transactions'
function App() {

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Dashboard/>
    },
    {
      path:'/dashboard',
      element:<Dashboard/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/feed',
      element:<NavBar/>
    },
    {
      path:'/clients',
      element:<Clients/>
    },
    {
      path:'/clientDetails',
      element:<ClientDetails/>
    },
    {
      path:'/talents',
      element:<Talents/>
    },
    {
      path:'/talentDetails',
      element:<TalentDetails/>
    },
    {
      path:'/talent1',
      element:<Talent1/>
    },
    {
      path:'/talentProfile',
      element:<TalentProfile/>
    },
    {
      path:'/payments',
      element:<Payments/>
    },
    {
      path:'/transactions',
      element:<Transactions/>
    }

  ])

  return (
    <>
        <RouterProvider router={router}/>
     </>
  )
}
export default App