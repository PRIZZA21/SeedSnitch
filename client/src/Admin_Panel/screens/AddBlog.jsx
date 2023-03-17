import React, { useRef, useState } from 'react'
import Infobar from '../../Common_Components/Infobar'
import Sidebar from '../components/Sidebar'
import Input from '../components/Input'
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


const AddBlog = () => {

    const [title,setTitle] = useState('');
    const [uploading,setUploading] = useState(false);
    const [image,setImage] = useState('');
    const [content, setContent] = useState('');
    const editor = useRef(null);

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
  
          var { data } = await axios.post('http://localhost:4000/api/uploads', formData, config)
          
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

    const userLogin = useSelector((state) => state.userLogin)
    const {  userInfo } = userLogin  

    const config = { headers: { authorization: `Bearer ${userInfo.token}`}}
    const redirect = window.location.search ? window.location.search.split('=')[1] : '/blogs/page/1'
    let navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if(uploading===false) axios.post('http://localhost:4000/api/blogs/create',{title,image,content},config)
        navigate(redirect);
    }
  

    return (
    <div className='flex flex-row'>

        <Sidebar />

        <div className="w-5/6 bg-white relative">
            <Infobar start_text={'Post'} end_text={'New Blog'} />
            <section className="h-auto w-5/6 mx-auto py-10 px-2 relative md:mb-20 md:mt-0 mt-10">
  
                <form className="w-full h-full px-4 py-6" name="addBlog" onSubmit={submitHandler}>

                        <Input 
                            label="Blog Title"
                            type="text"
                            name="title"
                            placeholder="Enter Blog Title"
                            required={true}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <Input 
                            label="Blog Image"
                            type="file"
                            name="image"
                            placeholder=""
                            required={true}
                            onChange={uploadFileHandler}
                        />
                        
                        
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={newContent => {setContent(newContent)}}
                            style={{ minHeight: "2000px" }}
                        />

                        <div className="w-full mx-auto mt-8">
                            <div className="w-full flex flex-row items-center">
                                <input className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697] cursor-pointer" type="submit" value="Post Now" />
                            </div>
                        </div>

                </form>


            </section>
        </div>
    </div>
  )
}

export default AddBlog
