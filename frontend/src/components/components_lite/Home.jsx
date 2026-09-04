import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Categories from './Categories'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Home() {
  const {user} = useSelector((store)=>store.auth)
  const navigate = useNavigate()
useEffect(()=>{
  if(user?.role === "Recruiter"){
    navigate("/admin/companies")
  }

}
  ,[]
)

  useGetAllJobs();
  return (
    <div>
         <Navbar></Navbar>
          <Header></Header>
          <Categories></Categories>
          <LatestJobs></LatestJobs>
          <Footer></Footer>
    </div>
  )
}

export default Home
