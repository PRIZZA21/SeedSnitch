import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile,faBuildingColumns,faSchool,faBlog } from '@fortawesome/free-solid-svg-icons'


const Sidebar = () => {

    let sidebar_items = [
        {icon: faFile, name:'Applications',link:'/admin/applications/page/1'},
        {icon: faBuildingColumns, name:'Incubators',link:'/admin/incubators/page/1'},
        {icon: faSchool, name:'E-cells',link:'/admin/ecells/page/1'},
        {icon: faBlog, name:'Blogs',link:'/admin/blogs/page/1'}
    ]

    return (
        <div className='sidebar pt-4 min-h-[650px] w-1/6 bg-[#f8f8f8] relative rounded-tr-3xl rounded-br-3xl drop-shadow-2xl z-50 border-t '>
            <Link to='/' className='flex flex-row'>
                <img src='https://i.ibb.co/mBv3jLQ/favicon-ico.png' className='max-w-max h-10 px-5' alt=''/>
                <h1 class="hidden lg:inline-block font-title pt-2 text-3xl text-black font-normal"> SEEDSNITCH </h1>
            </Link>    

            <section className="gap-x-8 mt-5 pt-4 md:flex-row px-4 md:px-0 md:gap-x-16 bg-white-700 w-full border-t">
                {sidebar_items.map((item)=>(
                    <NavLink to={item.link}>
                        <div className='mb-6 py-3 px-6 text-lg'>
                            <FontAwesomeIcon icon={item.icon} className="pr-4 cursor-pointer" />
                            <span className='hidden md:inline-block'>{item.name}</span>
                        </div>
                    </NavLink>
                ))}
            </section>
        </div>
    )
}

export default Sidebar