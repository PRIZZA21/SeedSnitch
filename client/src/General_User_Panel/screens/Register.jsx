import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { register } from '../../redux/actions/userActions';

const Register = () => {
  

  const googleAuth = () => {
    window.open('/api/users/auth/google/callback',"_self")
  }

  let navigate = useNavigate();
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const dispatch = useDispatch()
  const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

  const userRegister = useSelector((state) => state.userRegister)
  const {  userInfo } = userRegister

  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register(name,email,password))
   
}


  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])



return (
    <div className="bg-white relative">

    <section
      className="mt-20 gap-x-8 h-[auto] md:flex-row px-4 md:px-0 md:gap-x-16 bg-[#f8f8f8] w-full border border-b-slate-200"
    >
      <div
        className="text-center md:w-1/2 w-full h-full mx-auto flex flex-col items-center justify-start md:py-12"
      >
        <div className="w-full md:w-[800px] text-center p-4 md:p-2">
          <h2
            className="md:font-extrabold font-bold text-4xl md:text-5xl pb-2 text-accent"
          >
            Become <span className="text-[#242424]"> a member </span>
          </h2>
        </div>
      </div>
    </section>

    <section className="h-auto py-10 px-2 relative md:mb-20 md:mt-0 mt-10">
      <div
        className="h-full w-full flex flex-col gap-4 justify-between md:flex-row right-4"
      >
        <div
          className="w-full md:w-1/2 h-full rounded-md mx-auto flex flex-row justify-center mr-3" 
        >
          <form
            className="w-full h-full max-w-lg px-4 py-6"
            id="contact-form"
            name="register"
            onSubmit={submitHandler}
          >
        
            <div className='rounded-lg py-2 text-xl mb-6 flex flex-row justify-center cursor-pointer bg-green-200' onClick={googleAuth}>
              Continue with Google &nbsp; <img src='../img/google-logo.png' className='w-6 h-6 mt-1' alt=''/>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                  htmlFor="grid-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-name"
                  type="text"
                  name="Name"
                  required
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value) }
                />
              </div>
            </div>

            {/* <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                  htmlFor="grid-username"
                >
                  Username
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-username"
                  type="username"
                  name="username"
                  required
                  placeholder="Enter your Username"
                  onChange={(e) => setUsername(e.target.value) }
                />
              </div>
            </div> */}

            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                  htmlFor="grid-email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-email"
                  type="email"
                  name="Email"
                  required
                  placeholder="Enter your email id"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap -mx-3 mb-6">


              <div className="w-full md:w-full px-3">
                <label
                  className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  required
                  name="Subject"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value) }
                />
              </div>
            </div>
            

            <div className="w-full md:w-full px-3 mb-6">
                <span
                  className="block tracking-wide text-darkBlue text-m font-normal mb-2"
                >
                  Already a member <Link to='/login'className="font-bold">Login Now</Link>
                </span>
            </div>

            <div className="w-full">
              <div className="w-full flex flex-row items-center">
                <input
                  className="shadow  cursor-pointer color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697]"
                  type="submit"
                  value="Register"
                />
              </div>
            </div>

          </form>

        </div>


        <div className="md:hidden flex flex-col items-center">
          <img
            src="../img/loginkey.png"
            className="hidden h-[450px] object-contain"
            alt=""
          />
        </div>

        <div className="hidden w-1/2 h-full md:flex flex-col items-center justify-center">
          <img
            src="../img/loginkey.png"
            className="h-[400px] object-contain"
            alt=""
          />
        </div>

        
      </div>


    </section>
    
  </div>
  )
}

export default Register
