import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import Infobar from '../../Common_Components/Infobar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { getUserDetails, updateUserProfile } from '../../redux/actions/userActions'
import { SERVER_URL } from '../../link'

const ProfileScreen = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [uploading,setUploading] = useState(false)
    const [image,setImage] = useState('')

 
    const dispatch = useDispatch();

    const userDetails             = useSelector((state) => state.userDetails)
    const { user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const {  userInfo } = userLogin  

    const userProfileUpdate = useSelector((state) => state.userProfileUpdate)
    const {success,message } = userProfileUpdate  

    let navigate = useNavigate();

    useEffect(() => {
      
        if (!userInfo) { navigate('/login')}
        else {
            if(!user){
              dispatch(getUserDetails(userInfo._id))
            }
            else{
              setName(user.name)
              setEmail(user.email)
              setImage(user.profile_pic)
            }
        }
            
    }, [navigate, userInfo,user,dispatch])

      const submitHandler = (e) => {
        e.preventDefault()
        
        if(!uploading) 
        dispatch(
          updateUserProfile({name,email,password,image})
        )
    }

    const applnHandler = () => {
      navigate('/users/applications/page/1')
    }

    const postsHandler = () => {
      navigate('/users/posts/page/1')
    }


    
    
      const uploadFileHandler = async(e) => {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)
  
        try {
          
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
  
          var { data } = await axios.post('/api/uploads', formData, config)
          
          data = (data.substr(8))
          data = '/' +data;
  
          setImage(data)
          setUploading(false)
  
        } catch (error) {
          setUploading(false)
        }
  
      }
  
  


  return (
    <div className='flex flex-row'>

        <div className="w-1/4 bg-green relative mt-20 border-t-2 border-r-2 border-b-slate-200">
                <div className='sticky top-28 '>
                
                
        <div  className="w-full h-full rounded-md mx-auto flex flex-row justify-center mr-3">

          <form className="w-full h-full max-w-lg px-8 py-6" name="profile" onSubmit={submitHandler}>
              {success && <div className='text-green-400 mb-5 text-center'>{success}</div>}
            {message && <div className='text-red-400 mb-5 text-center'>{message}</div>}

            <div className="flex flex-wrap -mx-3 mb-4">
              
      
              {image!=='' ? <div className='rounded-lg w-28 h-28 mx-auto bg-gray-100 mb-4 flex items-center justify-center'>
                <img src={`${SERVER_URL}/${image}`} className='h-24 w-24 roundede-xl object-contain' alt=''/>
              </div> : 
                <button className="rounded flex flex-row items-center mx-auto mb-4">
                  <div className='rounded-full border-gray-200 bg-[#0C6980] text-white border-1 w-24 flex flex-row justify-center h-24 items-center font-bold text-lg'> {name.split(" ")[0].charAt(0)}</div>
                </button>
              }
              
              <div className="w-full px-3">
                <label
                  className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                  htmlFor="grid-name"
                >
                  Enter Image
                </label>

                <input
                  className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="img-file"
                  type="file"
                  name="img-file"
                  onChange={uploadFileHandler}
                />
              </div>
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
                  placeholder={name}
                  onChange={(e) => setName(e.target.value) }
                />
              </div>
            </div>

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
            
                  placeholder={email}
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

                  name="Subject"
                  placeholder={'Enter password'}
                  onChange={(e) => setPassword(e.target.value) }
                />
              </div>
            </div>
            
    

            <div className="w-full">
              <div className="w-full flex flex-row items-center">
                <input
                  className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697]"
                  type="submit"
                  value="Update"
                />
              </div>
            </div>

          </form>

        </div>

                </div>
        </div>

        <div className="w-3/4 bg-white relative">

            <Infobar start_text={'Welcome'} end_text={userInfo.name.split(" ")[0]} />

            <div className='bg-[#f8f8f8] mt-12 w-5/6 mx-auto rounded-lg p-4 text-xl font-semibold drop-shadow-lg flex space-between'>
              Your Applications  
              <span className="ml-auto">
                <FontAwesomeIcon icon={faPlay} onClick={applnHandler} className='cursor-pointer text-lg text-gray-400 hover:text-gray-600'/>
              </span>
            </div>


            <div className='bg-[#f8f8f8] mt-12 w-5/6 mx-auto rounded-lg p-4 text-xl font-semibold drop-shadow-lg flex space-between'>
              Your Posts  
              <span className="ml-auto">
                <FontAwesomeIcon icon={faPlay} onClick={postsHandler} className='cursor-pointer text-lg text-gray-400 hover:text-gray-600'/>
              </span>
            </div>

        
        </div>


  </div>
  )
}

export default ProfileScreen