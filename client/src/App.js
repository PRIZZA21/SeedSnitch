import React from 'react'
import { Route, Routes } from 'react-router-dom'


// Admin Panel Applications
import ApplicationScreen from './Admin_Panel/screens/ApplicationScreen'
import IncubatorScreen from './Admin_Panel/screens/IncubatorScreen'
import EcellScreen from './Admin_Panel/screens/EcellScreen'
import BlogScreen from './Admin_Panel/screens/BlogScreen'
import AddBlog from './Admin_Panel/screens/AddBlog'
import AddEcell from './Admin_Panel/screens/AddEcell'
import AddIncubator from './Admin_Panel/screens/AddIncubator'
import UpdateBlog from './Admin_Panel/screens/UpdateBlog'
import UpdateEcell from './Admin_Panel/screens/UpdateEcell'


// Incubator Panel components
import IncubatorApplicationsScreen from './Incubator_Panel/screens/IncubatorApplicationsScreen'


// General User Panel Components
import Navbar from './zcomponents/Navbar'
import Footer from './zcomponents/Footer'
import Home from './General_User_Panel/screens/Home'
import FAQ from './General_User_Panel/screens/FAQ'
import Contact from './General_User_Panel/screens/Contact'
import About from './General_User_Panel/screens/About'
import Community from './General_User_Panel/screens/Community'
import BlogPage from './General_User_Panel/screens/BlogPage'
import BlogDetails from './General_User_Panel/screens/BlogDetails'
import Login from './General_User_Panel/screens/Login'
import Register from './General_User_Panel/screens/Register'
import Apply from './General_User_Panel/screens/Apply'
import Ambassador from './General_User_Panel/screens/Ambassador'
import ProfileScreen from './General_User_Panel/screens/ProfileScreen'
import TechSupport from './General_User_Panel/screens/TechSupport'
import PostCreate from './General_User_Panel/screens/PostCreate'

import ApplicationDetails from './General_User_Panel/screens/Application'
import UserApplicationScreen from './General_User_Panel/screens/UserApplicationsScreen'
import UserPostsScreen from './General_User_Panel/screens/UserPostsScreen'
import UserReplyScreen from './General_User_Panel/screens/UserReplyScreen'




const App = () => {
  return (
    <>
      <Navbar />
      <Routes>

        {/* Admin Routes */}
        <Route path = "/admin/applications/page/:pageNumber" element = {<ApplicationScreen />} />
        <Route path = "/admin/incubators/page/:pageNumber"   element = {<IncubatorScreen />} />
        <Route path = "/admin/ecells/page/:pageNumber"       element = {<EcellScreen />} />
        <Route path = "/admin/blogs/page/:pageNumber"        element = {<BlogScreen />} />
        <Route path = "/admin/add-blog"                      element = {<AddBlog />} />
        <Route path = "/admin/add-ecell"                     element = {<AddEcell />} />
        <Route path = "/admin/add-incubator"                 element = {<AddIncubator />} />
        <Route path = "/admin/ecells/:id"                    element = {<UpdateEcell />} />
        <Route path = "/admin/blog/:id"                      element = {<UpdateBlog />} /> 
        

        {/* Incubator Routes */}
        <Route path="/incubator" element={<IncubatorApplicationsScreen />} />


        {/* General User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/community" element={<Community />} />
        <Route path="/blogs/page/:pageNumber" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/ambassador" element={<Ambassador />} />
        <Route path="/user/profile" element={<ProfileScreen />} />
        <Route path="/users/applications/page/:pageNumber" element={<UserApplicationScreen />} />
        <Route path="/users/posts/page/:pageNumber" element={<UserPostsScreen />} />
        <Route path="/users/post/:postid" element={<UserReplyScreen />} />
        <Route path="/tech-support/page/:pageNumber" element={<TechSupport />} />
        <Route path="/tech-support" element={<TechSupport />} />
        <Route path="/create-post" element={<PostCreate />} />
        <Route path="/application/:id" element={<ApplicationDetails />} />
        

      </Routes>

      <Footer />
    </>
  )
}

export default App
