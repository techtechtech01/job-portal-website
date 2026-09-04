import React from 'react'
import {
  Popover,
  PopoverContent, PopoverTrigger
} from '@/components/ui/popover'
import { Button, buttonVariants } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/data'
import { toast } from "../ui/toast"
import { useState } from 'react'


const Navbar = () => {
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);






  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });


      if (res.data.success) {

        toast.add({
          type: "success",
          title: "Success",
          description: res.data.message,
          priority: "high",
        });
        dispatch(setUser(null));
        navigate("/");


      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Error logging out. Please try again.");
    }
  }

  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 '>
        <div >
          <h1 className='text-center text-3xl font-bold'>Job
            <span className='text-blue-500'> Portal</span>
          </h1>
        </div>
        <div className='flex font-medium gap-6 items-center'>
          <ul className='flex font-medium gap-6 items-center'>


            {(user && user?.role === "Recruiter") ?
              <>
                <li>  <Link to={"/admin/companies"}>Companies</Link></li>
                <li> <Link to={"/admin/jobs"}>Job</Link></li>
              </>
              : <>
                <Link to={"/"}><li>Home</li></Link>

                <li><Link to={"/browse"}>Browse</Link></li>
                <li><Link to={"/job"}>Job</Link> </li>
              </>
            }

          </ul>
          {!user ? (
            <div className='flex items-center  font-medium gap-3 '>


              <Link to={"/login"} onClick={() => setIsMenuOpen(false)}><Button variant='outline'>Login</Button></Link>
              <Link to={"/register"} onClick={() => setIsMenuOpen(false)}><Button variant='primary' className='bg-red-400 hover:bg-red-800'>Register</Button></Link>
            </div>

          ) : (
            <Popover>
              <PopoverTrigger render={
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    className="grayscale"
                  />

                </Avatar>
              } />
              <PopoverContent className='w-80'>
                <div className='flex  items-center space-y-2 gap-3'>

                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                      className="grayscale"
                    />

                  </Avatar>
                  <div>

                    <h2 className='font-bold' >{user?.fullName}</h2>
                    <p className='text-muted-foreground text-sm font-medium'>{user?.profile?.bio}</p>
                  </div>

                </div>
                <div className='flex flex-col my-2  text-gray-500'>
                  {user && user?.role === "Student" &&
                    <div className='flex w-fit cursor-pointer items-center gap-3 '>

                      <User2></User2>
                      <Button variant='link' className='cursor-pointer'> <Link to='/profile'>Profile</Link> </Button>  </div>
                  }






                  <div className='flex w-fit cursor-pointer items-center gap-3' >
                    <LogOut></LogOut>
                    <Button variant='link' className='cursor-pointer' onClick={logoutHandler}>
                      Logout
                    </Button>
                  </div>


                </div>

              </PopoverContent>
            </Popover>

          )}



        </div>
      </div>
    </div>
  )
}

export default Navbar
