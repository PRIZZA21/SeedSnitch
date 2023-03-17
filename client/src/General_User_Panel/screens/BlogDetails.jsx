import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../Common_Components/Loader'

const BlogDetails = () => {

    const {id} = useParams()
    const [blog,setBlog] = useState('');
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        axios.get(`/api/blogs/${id}`).then(res=> {
            setBlog(res.data); 
        })
        setLoading(false)
      }, [id])

    if(loading) return (<Loader />)


  return (
    <div>
        <div className='px-20 mt-20 py-10'>
            

            <div className="flex flex-row mb-5">
                <img src={`http://localhost:4000//${blog.banner}`} className="h-40 w-40 rounded-lg"  alt=''/>
                <div className="flex flex-col ml-5 justify-center">
                    <div className='text-3xl font-bold mb-2'>{blog.title}</div>
                    <p className='text-md font-semibold'>
                        Posted By: <span className="text-accent">{blog.author && blog.author.name}</span> 
                    </p>
                </div>
            </div>
            

            <div dangerouslySetInnerHTML={{ __html: blog.content }} />

        </div>
    </div>
  )
}

export default BlogDetails
