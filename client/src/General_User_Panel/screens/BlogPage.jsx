import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Infobar from '../../Common_Components/Infobar'
import { SERVER_URL } from '../../link'

const Paginate = ({pages,page,isAdmin=false,keyword=''}) => {
      
    
    return pages>1 && (
  
      <Pagination>
          {
              [...Array(pages).keys()].map(x=>(
                      <Pagination.Item >
                          <Link key={x+1} to={ `/blogs/page/${x+1}` }>
                              {x+1} 
                          </Link>
                      </Pagination.Item>
                  
              ))
          }
      </Pagination>
    )
  }





const BlogPage = () => {

    const [blogList,setBlogList] = useState([])
    const {pageNumber} = useParams() ||1;
    const [page,setPage] = useState(1)
    const [pages,setPages] = useState(1);

    const navigate = useNavigate();
    const blog_detailsHandler = (id) => {
        navigate(`/blog/${id}`)
    }

    useEffect(() => {

        axios.get(`/api/blogs?pageNumber=${pageNumber}`).then(res=> {
            setBlogList(res.data.all_blogs)
            setPage(res.data.page)
            setPages(res.data.pages)
        })
      }, [pageNumber])



  return (
    <div className="bg-white relative">

    <Infobar start_text={'Read'} end_text={'our-blogs'}/>

    <div className='py-10'>
    { blogList &&  blogList.map((blog)=>(
        <div className='flex w-3/4 mx-auto py-4 border-b-2'>

            <div className='w-24 h-22 rounded-xl mr-6 ml-6'>
                <img src={`${SERVER_URL}/${blog.banner}`} className='object-cover  h-full rounded-xl ' alt=''/>
            </div>
            
            <div className='flex flex-col'>
                <span className='font-bold text-2xl text-gray-700 mb-2'>{blog.title}</span>
                <span className='font-semibold text-gray-600'>{blog.author && blog.author.name}</span>
            </div>
           
            <div className="ml-auto mr-10 py-5 border-b border-gray-200 bg-white text-sm text-right">
                <button type="button" className="inline-block text-gray hover:text-gray-700">
                    <FontAwesomeIcon icon={faPlay} onClick={()=>blog_detailsHandler(blog._id)}/>
                </button>
            </div>
        </div>
    )) }
    <Paginate pages={pages} page={page}/>
    </div>
    </div>
  )
}

export default BlogPage
