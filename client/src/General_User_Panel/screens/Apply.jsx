import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../redux/actions/userActions'

const Apply = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [startup_name,setStartup_name] = useState('')
  const [linkedin_profile,setLinkedin_profile] = useState('')
  const [college_name,setCollege_name] = useState('')
  const [contact_number,setContact_number] = useState(0)
  const [start_up_stage,setStart_up_stage] = useState('')
  const [start_up_description,setStart_up_description] = useState('')
  const [start_up_problem,setStart_up_problem] = useState('')
  const [start_up_differentiator,setStart_up_differentiator] = useState('')


  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const {  userInfo } = userLogin
  
  const [login_email,setLogin_Email] = useState('')
  const [login_password,setLogin_Password] = useState('')

  const toggleHandler = () => {
    setIsSubmitted(!isSubmitted)
  }

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(login(login_email,login_password));
  }


  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');


  if(!userInfo) {
    return(
 
   
        <div className='h-500 bg-green'>
          

            <div class="fixed z-10 overflow-y-auto top-0 w-full left-0 text-center" id="modal">

                  <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-900 opacity-75" />
                  </div>

                  <span class="sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                  <div 
                    className=
                    "inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog" 
                    aria-modal="true" 
                    aria-labelledby="modal-headline"
                  >
                    <h1 className='text-center text-lg font-bold pt-4'>Login to Continue</h1>
                    <form
                      className="w-full h-full max-w-lg px-12 py-6"
                      id="contact-form"
                      name="apply"
                      onSubmit={loginHandler}
                    >
                  
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
                            onChange={(e) => setLogin_Email(e.target.value)}
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
                            onChange={(e) => setLogin_Password(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="w-full md:w-full px-3 mb-6">
                          <span
                            className="block tracking-wide text-darkBlue text-m font-normal mb-2"
                            htmlFor="grid-password"
                          >
                            Don't have an account <Link to='/register'className="font-bold">Register Now</Link>
                          </span>
                      </div>

                      <div className="w-full">
                        <div className="w-full flex flex-row items-center">
                          <input
                            className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697]"
                            type="submit"
                            value="Login"
                          />
                        </div>
                      </div>

                    </form>


                </div>
            </div>



                
        </div>
          
          
        )
        
  }

    const config = {
        headers: {
            authorization: `Bearer ${userInfo.token}`,
        },
    }
    


  const submitHandler = (e) => {
    e.preventDefault()
    axios.post(`/api/applications/create`,{name,email,startup_name,linkedin_profile,college_name,contact_number,start_up_stage,start_up_description,start_up_problem,start_up_differentiator},config)
    .then((response)=>{
      if(response.status===200) { setIsSubmitted(true);};
    })
    .catch(err=>{setError(err)})
  }

  if(isSubmitted){
    return(
      <div class="flex h-[88vh] w-full">
        <div class="my-auto w-1/2 mx-auto">
            <div class="bg-white p-6 rounded-lg drop-shadow-2xl">
              <button className="block ml-auto hamburger lg:hidden focus:outline-none open" onClick={toggleHandler}>
                <span className="hamburger-top"></span>
                <span className="hamburger-middle"></span>
                <span className="hamburger-bottom"></span>
              </button>
              <img src="../img/thankyou.png" className='h-52 w-52 mx-auto mb-4' alt=''/>
              <h2 class="text-2xl font-bold mb-2 text-gray-800 text-center">Thanks for applying</h2>
              <p class="text-gray-700 text-center">Your Submission has been recieved</p>
            </div>
        </div>
      </div>)
  }
  

  if(error){
    return <div>{error}</div>
  }




  return (

  
    


      

      <div>
  
    <section className="mt-20 gap-x-8 h-[auto] md:flex-row px-4 md:px-0 md:gap-x-16 bg-[#f8f8f8] w-full border border-b-slate-200" >
      <div
        className="text-center md:w-1/2 w-full h-full mx-auto flex flex-col items-center justify-start md:py-12"
      >
        <div className="w-full md:w-[800px] text-center p-4 md:p-2">
          <h2
            className="md:font-extrabold font-bold text-4xl md:text-5xl pb-2 text-accent"
          >
            Pitch <span className="text-[#242424]">your vision</span>
          </h2>
          <h2 className="font-light text-2xl md:font-normal text-[#242424]">
            Join us in shaping the future of innovation by submitting your
            startup idea. Apply now and take the first step towards realizing
            your entrepreneurial goals by submitting your application.
          </h2>
        </div>
      </div>
    </section>

    <section id="about-container" className="mt-10 md:mt-0 mb-20 h-auto">
      <div
        className="h-full w-full flex flex-col gap-4 justify-between items-center space-y-8 p-4 md:pt-10"
      >
        <div
          className="w-full md:w-[800px] h-auto rounded-md mx-auto border-t px-2 bg-white"
        >
          <form
            className="w-full h-full px-4 md:px-8 pt-6 pb-3 md:flex md:items-start md:justify-between bg-white justify-center"
            name="apply"
            id="apply-form"
            onSubmit={submitHandler}
          >
            <div
              className="w-full md:w-1/2 flex flex-col md:items-start md:justify-start items-center"
            >
              <div className="flex flex-wrap -mx-3 mb-6 w-full">
                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                    htmlFor="grid-name"
                  >
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-name"
                    type="text"
                    required
                    name="Name"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>


              <div className="flex flex-wrap -mx-3 mb-6 w-full">
                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                    htmlFor="grid-email"
                  >
                    E-Mail
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

              <div className="flex flex-wrap -mx-3 mb-6 w-full">
                <div className="w-full md:w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                    htmlFor="grid-startname"
                  >
                    Startup Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-startname"
                    type="text"
                    required
                    name="Startup-Name"
                    placeholder="Subject"
                    onChange={(e) => setStartup_name(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap -mx-3 mb-6 w-full">
                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                    htmlFor="grid-linkedin"
                  >
                    Linkedin Profile Link
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-name"
                    name="Linkedin"
                    type="url"
                    placeholder="Your linkedin profile"
                    onChange={(e) => setLinkedin_profile(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6 w-full">
                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                    htmlFor="grid-college"
                  >
                    College
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-name"
                    required
                    name="College"
                    type="text"
                    placeholder="College name"
                    onChange={(e) => setCollege_name(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6 w-full">
                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                    htmlFor="grid-number"
                  >
                    Contact Number
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-number"
                    required
                    name="apply"
                    placeholder="Enter your contact number "
                    type="number"
                    onChange={(e) => setContact_number(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6 w-full">
                <div className="w-full md:w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                    htmlFor="grid-stage"
                  >
                    What is the current status of your startup (Ideation,
                    Early-stage)?
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-stage"
                    type="text"
                    required
                    name="Startup Stage"
                    placeholder="Current status of startup"
                    onChange={(e) => setStart_up_stage(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* <!-- <hr className="mb-6" /> --> */}
            <div
              className="w-full md:w-1/2 flex flex-col md:items-start md:justify-start items-center"
            >
              <div className="w-full flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-full mb-6 md:mb-0 px-3">
                  <label
                    className="tracking-wide text-darkBlue text-xs font-bold mb-2 w-full"
                    htmlFor="grid-diff"
                  >
                    Describe your startup?
                  </label>
                  <textarea
                    className="w-full bg-gray-100 text-darkBlue border border-b-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-diff"
                    placeholder="What makes you stand apart?"
                    rows="7"
                    name="Idea Description"
                    required
                    onChange={(e) => setStart_up_description(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="w-full flex flex-wrap -mx-3 mb-2">
                <div className="w-full mb-6 md:mb-0 px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                    htmlFor="grid-prob"
                  >
                    What is the problem you are trying to solve with your
                    startup?
                  </label>
                  <textarea
                    className="w-full bg-gray-100 text-darkBlue border border-b-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-prob"
                    placeholder="Problem statement"
                    rows="7"
                    required
                    name="Problem Statement"
                    onChange={(e) => setStart_up_problem(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="w-full flex flex-wrap -mx-3">
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                    htmlFor="grid-diff"
                  >
                    How does your startup differentiate itself from similar
                    products (if any)?
                  </label>
                  <textarea
                    className="w-full bg-gray-100 text-darkBlue border border-b-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-diff"
                    placeholder="What stands you apart?"
                    rows="7"
                    name="USP"
                    required
                    onChange={(e) => setStart_up_differentiator(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="w-full flex flex-wrap -mx-3">
                <div className="w-full md:w-full px-3 mb-6 md:mb-0 md:mt-8">
                  <input
                    className="shadow color focus:shadow-outline focus:outline-none text-white cursor-pointer font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697]"
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
   </div>
    
  
  )
}

export default Apply
