import React, { useState,useEffect } from 'react'
import Navbar from '../components_lite/Navbar'
import { Form, Link, useNavigate } from 'react-router-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/data.js'
import { toast } from "../ui/toast"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice.js'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading,user} = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""

  });
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    
  
  try {
dispatch(setLoading(true));
    const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(res.data)
    if (res.data.success) {
      toast.add({
        type: "success",
        title: "Success",
        description: res.data.message,
        priority: "high",

      });
      dispatch(setUser(res.data.user));
      navigate("/")
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : "An unexpected error occurred.";
    toast.add({
      type: "error",
      description: errorMessage,
      priority: "high",
    })
  }
   finally {
          dispatch(setLoading(false));
      }
}
    useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className='flex justify-center  max-w-7xl mx-auto'>
        <Form
          onSubmit={submitHandler}
          className='w-1/2 border border-gray-400 rounded-md p-4 my-10'>
          <h1 className='font-medium text-xl text-center text-blue-700'>Login</h1>

          <div className='my-2 '>
            <Label className='text-bold'>Enter Your Email</Label>
            <Input type='email' value={input.email}
              name='email'
              onChange={changeEventHandler} placeholder='abc@gmail.com' className='my-1'></Input>
          </div>
          <div className='my-2 '>
            <Label className='text-bold'>Enter Your Password</Label>
            <Input type='password' value={input.password}
              name='password'
              onChange={changeEventHandler} placeholder='********' className='my-1'></Input>
          </div>

          <div >
            <RadioGroup className="w-fit flex text-bold">
              <div className="flex items-center space-x-2  ">
                <Input type='radio' name='role' value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler} className='cursor-pointer' />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2 ">
                <Input type='radio' name='role' value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler} className='cursor-pointer' />
                <Label htmlFor="r2">Recruiter</Label>
              </div>

            </RadioGroup>
          </div>
         <div className="mt-8">
                     {loading ? (
                       <Button disabled className="w-full bg-[#6B3AC2] hover:bg-[#5b30a6] text-white py-3 rounded-lg flex justify-center items-center">
                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                       </Button>
                     ) : (
                       <Button
                         type="submit"
                         className="w-full py-3 rounded-lg font-semibold text-md transition-colors">
                         Login
                       </Button>
                     )}
                   </div>
          {/* No account then Register */}
          <p className='text-gray-700 my-2 text-sm text-center'>Don't have an account? Register here! </p>
          <Link to='/register'>
            <div className='flex items-center justify-center'>
              <Button className='block w-1/2 text-white bg-green-700 hover:bg-green-800/70 rounded-md my-1' >Register</Button>
            </div>
          </Link>



        </Form>
      </div>
    </div>
  )
}

export default Login
