import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Common_Components/Loader';

const ApplicationDetails = () => {

    const params = useParams();
    // const [name,setName] = useState('')
    const [appln,setAppln] = useState({})

    const [loading,setLoading] = useState(true)
    const [err,setErr] = useState('')

    const [reason,setReason] =useState('')

    const userLogin = useSelector((state) => state.userLogin)
    const {  userInfo } = userLogin  

    const config = useMemo(() => {
      return {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
      };
    }, [userInfo.token]);
    
    useEffect(() => {
        setLoading(true)
        axios.post(`/api/applications/details/`,{"appln_id":params.id},config)
        .then((res) => {
            setAppln(res.data)

        })
        .catch(error=>{
          setErr(error.response.data.message)
        }
        )
        setLoading(false)
      },[appln, params.id, config]);



    let navigate = useNavigate();

      const acceptHandler = () => {
        if(reason==="") {alert("Reason can't be empty");}
        axios.post(`/api/applications/accept/${params.id}`,{"email":userInfo.email,"reason":reason},config)
        navigate('/incubator')
      }
    
      const rejectHandler = () => {
        if(reason==="") {alert("Reason can't be empty");}
        axios.post(`/api/applications/reject/${params.id}`,{"email":userInfo.email,"reason":reason},config)
        navigate('/incubator')
      }
    
    if(loading && err===''){
        return (<div className='mt-48 mx-80 mb-80 px-96'>
                <Loader />
            </div>)
    }


  return (

    <div>
 
    <section
      className="mt-20 gap-x-8 mb-6 h-[auto] md:flex-row px-4 md:px-0 md:gap-x-16 bg-[#f8f8f8] w-full border border-b-slate-200"
    >
      <div
        className="text-center md:w-1/2 w-full h-full mx-auto flex flex-col items-center justify-start md:py-12"
      >
        <div className="w-full md:w-[800px] text-center p-4 md:p-2">
          <h2
            className="md:font-extrabold font-bold text-4xl md:text-5xl pb-2 text-[#242424]"
          >
            Application <span className="text-accent">Details</span>
          </h2>
        </div>
      </div>
    </section>

   { err ? <div className='min-h-[400px] mx-auto  text-center text-3xl mt-12'>{err}</div>:<section >

      <div className='min-h-[300px] my-8  w-4/6 rounded-lg bg-[#f8f8f8] mx-auto shadow-lg flex flex-col'>

        <div className='flex-1 border-b-2 px-6 flex flex-row'>
          <span className='w-1/6 border-r-2 pt-1 pb-1 text-lg'>Founder</span>
          <span className='w-5/6 border-l-2 pt-1 pb-1 pl-8 text-lg'>{appln.name}</span>
        </div>
        <div className='flex-1 border-b-2 px-6 flex flex-row'>
          <span className='w-1/6 border-r-2 pt-1 pb-1 text-lg'>Startup</span>
          <span className='w-5/6 border-l-2 pt-1 pb-1 pl-8 text-lg'>{appln.startup_name}</span>
        </div>
        <div className='flex-1 border-b-2 px-6 flex flex-row'>
          <span className='w-1/6 border-r-2 pt-1 pb-1 text-lg'>Problem</span>
          <span className='w-5/6 border-l-2 pt-1 pb-1 pl-8 text-lg'>{appln.startup_problem}</span>
        </div>
        <div className='flex-1 border-b-2 px-6 flex flex-row'>
          <span className='w-1/6 border-r-2 pt-1 pb-1 text-lg'>Description</span>
          <span className='w-5/6 border-l-2 pt-1 pb-1 pl-8 text-lg'>{appln.startup_description}</span>
        </div>
        <div className='flex-1 border-b-2 px-6 flex flex-row'>
          <span className='w-1/6 border-r-2 pt-1 pb-1 text-lg'>Current Stage</span>
          <span className='w-5/6 border-l-2 pt-1 pb-1 pl-8 text-lg'>{appln.startup_stage}</span>
        </div>
        <div className='flex-1 border-b-2 px-6 flex flex-row'>
          <span className='w-1/6 border-r-2 pt-1 pb-1 text-lg'>College</span>
          <span className='w-5/6 border-l-2 pt-1 pb-1 pl-8 text-lg'>{appln.college_name}</span>
        </div>
        <div className='flex-1 border-b-2 px-6 flex flex-row'>
          <span className='w-1/6 border-r-2 pt-1 pb-1 text-lg'>Contact</span>
          <span className='w-5/6 border-l-2 pt-1 pb-1 pl-8 text-lg'>{appln.contact_number}</span>
        </div>
        <div className='flex-1 border-b-2 px-6 flex flex-row'>
          <span className='w-1/6 border-r-2 pt-1 pb-1 text-lg'>Email</span>
          <span className='w-5/6 border-l-2 pt-1 pb-1 pl-8 text-lg'>{appln.email}</span>
        </div>
        <div className='flex-1 border-b-2 px-6 flex flex-row'>
          <span className='w-1/6 border-r-2 pt-1 pb-1 text-lg'>Linkedin</span>
          <span className='w-5/6 border-l-2 pt-1 pb-1 pl-8 text-lg'>{appln.linkedin_profile}</span>
        </div>
       
      </div>



      {userInfo && userInfo.isIncubator && appln.curr_status==='Applied' && 
      <div className='mx-auto'>

      <div className="flex flex-wrap mx-auto mb-6 w-2/4">
           <div className="w-full px-3">
             
             <input
               className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
               id="grid-name"
               type="text"
               required
               name="Name"
               placeholder="Enter reason to accept/reject"
               onChange={(e) => setReason(e.target.value)}
             />


       </div>
     </div>

     <div className='flex flex-wrap mx-auto w-1/6 justify-around mb-8'>
       <button className="rounded-lg px-4 py-2 bg-green-300 text-black-100 font-bold hover:bg-green-500 duration-300" onClick={acceptHandler}>Accept</button>
       <button className="rounded-lg px-4 py-2 bg-red-300 text-black-100 font-bold hover:bg-red-500 duration-300" onClick={rejectHandler}>Reject</button>
     </div>
    
 </div>
      
      
      }


   


    </section>
}
    
  </div>
  )
}

export default ApplicationDetails
