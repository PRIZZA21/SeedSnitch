import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../zcomponents/Footer'
import Navbar from '../zcomponents/Navbar'

const GeneralUserLayout = () => {
  return (
    <>
        <Navbar />
        <div>
            <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default GeneralUserLayout