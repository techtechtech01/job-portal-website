
import React from 'react'
import { Button } from "@/components/ui/button"
import Navbar from "./components/components_lite/Navbar"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Home from './components/components_lite/Home'
import PrivacyPolicy from './components/components_lite/PrivacyPolicy'
import HelpCenter from './components/components_lite/HelpCenter'
import Browse from './components/components_lite/Browse'
import Job from './components/components_lite/Job'
import Profile from './components/components_lite/Profile'
import Description from './components/components_lite/Description'
import Companies from './components/adminComponents/Companies'
import CompaniesCreate from './components/adminComponents/CompaniesCreate'
import CompanySetup from './components/adminComponents/CompanySetup'
import AdminJobs from './components/adminComponents/AdminJobs'
import PostJob from './components/adminComponents/PostJob'
import Applicants from './components/adminComponents/Applicants'
import ProtectedRoute from './components/adminComponents/ProtectedRoutes'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/description/:id",
    element: <Description />
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />
  },
  {
    path: "/help",
    element: <HelpCenter />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/job",
    element: <Job />
  },


  //admin side routes

  {
    path: "/admin/companies",

    element: 
    <ProtectedRoute>
          <Companies />
    </ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: 
        <ProtectedRoute>
              <CompaniesCreate />

        </ProtectedRoute>

    
  },
  {
    path: "/admin/companies/:id",
    element: 
    <ProtectedRoute>
    <CompanySetup />

    </ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: 
    <ProtectedRoute>
    <AdminJobs />

    </ProtectedRoute>
  }, {
    path: "/admin/jobs/create",
    element:
    <ProtectedRoute>
    <PostJob />

    </ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
    <ProtectedRoute>

        <Applicants />

    </ProtectedRoute>

     
    ),
  },

])
function App() {
  return (
    <div>

      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}

export default App

