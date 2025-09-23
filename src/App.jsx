import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./components/Auth/Home";
import Login from "./components/Auth/Login";
import NavBar from "./components/Auth/common/NavBar";

import Dashboard from "./components/Admin/Dashboard";
import Clients from "./components/admin/Clients";
import ClientDetails from "./components/admin/ClientDetails";
import FeedDetails from "./components/admin/feeddetails";
import Talents from "./components/admin/Talents";
import TalentDetails from "./components/admin/TalentDetails";
import BookingDetails from "./components/admin/bookingdetails";
import Talent1 from "./components/admin/Talent1";
import TalentProfile from "./components/admin/TalentProfile";
import Payments from "./components/admin/Payments";
import Transactions from "./components/admin/Transactions";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Feed from "./components/admin/Feed";
import Tasks from "./components/admin/Tasks";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/feed",
      element: (
        <ProtectedRoute>
          <Feed />
        </ProtectedRoute>
      ),
    },
    {
      path: "/clients",
      element: (
        <ProtectedRoute>
          <Clients />
        </ProtectedRoute>
      ),
    },
    {
      path: "/clientDetails",
      element: (
        <ProtectedRoute>
          <ClientDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "/feeddetails",
      element: (
        <ProtectedRoute>
          <FeedDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "/bookingdetails",
      element: (
        <ProtectedRoute>
          <BookingDetails />
        </ProtectedRoute>
      ),
    },
    
    {
      path: "/talents",
      element: (
        <ProtectedRoute>
          <Talents />
        </ProtectedRoute>
      ),
    },
    {
      path: "/talentDetails",
      element: (
        <ProtectedRoute>
          <TalentDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "/talent1",
      element: (
        <ProtectedRoute>
          <Talent1 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/talentProfile",
      element: (
        <ProtectedRoute>
          <TalentProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/payments",
      element: (
        <ProtectedRoute>
          <Payments />
        </ProtectedRoute>
      ),
    },
    {
      path: "/transactions",
      element: (
        <ProtectedRoute>
          <Transactions />
        </ProtectedRoute>
      ),
    },
    {
      path: "/tasks",
      element: (
        <ProtectedRoute>
          <Tasks />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
