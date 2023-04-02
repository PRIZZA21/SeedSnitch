import React, { useEffect, useState } from 'react'
import Infobar from '../../Common_Components/Infobar'
import Sidebar from '../components/Sidebar'
import Input from '../components/Input'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const AddStartupEcell = () => {

    const [name,setName] = useState('')
    const [uploading,setUploading] = useState(false);
    const [image,setImage] = useState('');
    const [description,setDescription] = useState('')
    const {id} = useParams()

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
  
        } 
        
        catch (error) {
          console.error(error)
          setUploading(false)
        }
  
    }

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/admin/ecells/page/1'
    let navigate = useNavigate();
    
    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`/api/ecells/addStartup/${id}`,{name,image,description})
        navigate(redirect);
    }


  return (
    <div className='flex flex-row'>

        <Sidebar />

        <div className="w-full bg-white relative">

            <Infobar start_text={'Add Startup'} end_text={'to Ecell'} additonalClass={"mt-0 bg-white"}/>
       
            <section className="h-auto py-10 mx-auto relative md:mb-20 md:mt-0 mt-10">
                <div className="h-full w-full mx-auto  gap-4 md:flex-row right-4">
                    <div className="w-full md:w-1/2 h-full rounded-md mx-auto flex flex-row justify-center">
                        <form className="w-full h-full max-w-lg px-4 py-6 mx-auto" id="blog-form" name="blog" onSubmit={submitHandler}>
         

                            <Input 
                                label="Startup Logo"
                                type="file"
                                name="image"
                                placeholder=""
                                required={true}
                                onChange={uploadFileHandler}
                            />
                            
    
                            <Input 
                                label="Startup Name"
                                type="text"
                                name="name"
                                placeholder={""}
                                onChange={(e) => setName(e.target.value)}
                            />

                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                            <label
                                className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                            >
                                Startup Description
                            </label>

                            <textarea
                                className="font-serif w-full  text-darkBlue border border-b-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-plan"
                                name="Networking Approach"
                                rows="7"
                                required
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        </div>
  
                            <div className="w-full mx-auto">
                                <div className="w-full flex flex-row items-center">
                                { !uploading ?
                                (<input className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697] cursor-pointer" type="submit" value="Add Now" />):
                                (<div className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697] text-center">Please wait till uploading</div>)
                                }
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </section>


        </div> 
    </div>
  )
}

export default AddStartupEcell
