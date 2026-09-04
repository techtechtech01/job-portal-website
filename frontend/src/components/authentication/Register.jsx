import React, { useState, useEffect } from 'react'
import Navbar from '../components_lite/Navbar'
import { Form, Link, useNavigate } from 'react-router-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/data.js'
import { toast } from "../ui/toast"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice.js'

function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    file: ""

  });

  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phone", input.phone);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {

        toast.add({
          type: "success",
          title: "Success",
          description: res.data.message,
          priority: "high",

        });
        navigate("/login")
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
  const { user } = useSelector((store) => store.auth);
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
          <h1 className='font-medium text-xl text-center text-blue-700'>Register</h1>
          <div className='my-2 '>
            <Label className='text-bold'>Enter Your FullName</Label>
            <Input
              type='text'
              value={input.fullName}
              name='fullName'
              onChange={changeEventHandler}
              placeholder='fullName'
              className='my-1'
            ></Input>
          </div>
          <div className='my-2 '>
            <Label className='text-bold'>Enter Your Email</Label>
            <Input type='email'
              value={input.email}
              name='email'
              onChange={changeEventHandler}
              placeholder='abc@gmail.com'
              className='my-1'></Input>
          </div>
          <div className='my-2 '>
            <Label className='text-bold'>Enter Your Password</Label>
            <Input type='password'
              value={input.password}
              name='password'
              onChange={changeEventHandler}
              placeholder='********'
              className='my-1'></Input>
          </div>
          <div className='my-2 '>
            <Label className='text-bold'>Enter Your PhoneNumber</Label>
            <Input type='tel'
              value={input.phone}
              name='phone'
              onChange={changeEventHandler}
              placeholder='+92********'
              className='my-1'></Input>
          </div>
          <div >
            <RadioGroup className="w-fit flex text-bold">
              <div className="flex items-center space-x-2  ">
                <Input type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-4 h-4 text-[#6B3AC2]" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2 ">
                <Input type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-4 h-4 text-[#6B3AC2]" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>

            </RadioGroup>
          </div>
          <div className='flex items-centre my-3'>
            <Label className='text-bold'>Profile Photo</Label>
            <Input type='file' accept='image/'
              onChange={changeFileHandler}
              className='cursor-pointer'></Input>
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
                Register
              </Button>
            )}
          </div>
          {/* <div >
            <Button type='submit' className='block w-full text-white  bg-green-700 hover:bg-green-800/70 rounded-md my-3'  >
              Register
            </Button>
          </div> */}
          {/* Already account then Login  */}
          <p className='text-gray-700 my-2 text-sm text-center'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>
        </Form>
      </div>
    </div>
  )
}

export default Register
