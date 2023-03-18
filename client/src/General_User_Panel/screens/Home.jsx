import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { login_google } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';



const Home = () => {

  const userLogin = useSelector((state) => state.userLogin)
  const {  userInfo } = userLogin 

  const dispatch = useDispatch()


  const getUser = () => {
    
    if(!userInfo)
      fetch("/api/users/glogin/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
    }
      )
      .then((response) => {
        if (response.status === 200) return response.json();
        else {}
      })
      .then((resObject) => {
        dispatch(login_google(resObject));
      })
      .catch((err) => {
        
      });
  }

  useEffect(() => {
      document.title = 'Home | Seedsnitch';
      getUser();
  },[]);

  return (
    <div>

    <section id="intro" className="hidden h-auto w-full overflow-hidden md:flex justify-between flex-row mt-24 px-24 mb-6 text-left">
      <div className="w-1/2 space-y-8 flex flex-col justify-center items-start pt-20 text-center pl-32" id="intro-text">
        <div className="text-3xl pt-5 md:max-w-3xl text-accent md:text-6xl md:font-bold lg:font-black text-left" id="intro-text">
          
          <span className="mt-64 relative text-center">
            Fueling the college startup revolution
            <img
              src="./img/icon.png"
              className="w-[50px] absolute -right-14 -top-6"
              alt={'icon'}
            />
          </span>
        </div>
        <div className="max-w-lg text-medBlue font-semibold text-[20px] text-left">
          <p>
            Supporting college entrepreneurs through mentorship, a cohort
            program and campus representation.
          </p>
        </div>
        <div>
          <Link to="/about">
            <button
              className="text-white bg-[#0C6980] rounded-md py-3 px-7 text-[18px] hover:bg-[#084352]"
            >
              Learn More
            </button></Link>
          
        </div>
      </div>
      <div className="w-1/2 flex flex-row items-center justify-end p-8">
        <img src="img/2.jpg" className="object-cover" alt="" />
      </div>
    </section>


    <section id="intro2" className="w-screen h-fit mb-6 block md:hidden">
      <div
        className="w-full h-fit space-y-12 py-12 flex flex-col items-center justify-center mt-28 rounded-xl z-10"
      >
        <div
          className="container text-center text-accent text-5xl font-[800] flex flex-col justify-center"
          id="intro-text"
        >
          <span className=""> Fueling the college startup revolution</span>
        </div>
        <div className="text-medBlue font-bold text-center text-[20px]">
          <p>
            Supporting college entrepreneurs through <br />
            mentorship, a cohort program and <br />campus representation.
          </p>
        </div>
        <div>
          <Link to="/about">
            <button
              className="text-white bg-[#0C6980] rounded-md py-2 px-8 mt-4 text-[16px] hover:bg-[#084352]"
            >
              Learn More
            </button></Link>
        </div>
        <img src="./img/cover.jpg" className="-z-10" id="index-img" alt="" />
      </div>

    </section>

    <section
      className="mt-20 gap-x-8 h-auto md:flex-row px-4 md:px-0 md:gap-x-16 bg-[#f8f8f8] w-full border border-b-slate-200"
    >
      <div
        className="text-center md:w-1/2 w-full h-full mx-auto flex flex-col items-center justify-start md:py-12"
      >
        <div className="w-full md:w-[800px] text-center p-4 md:p-2">
          <h2
            className="md:font-extrabold font-bold text-4xl md:text-5xl pb-2 text-accent"
          >
            A Guide <span className="text-[#242424]">for Participants</span>
          </h2>
          <h2 className="font-light text-2xl md:font-normal text-[#242424]">
            A comprehensive overview of the benefits and opportunities available
            to participants in our program.
          </h2>
        </div>
      </div>
    </section>


    <section>
      <div
        className="w-full mx-auto h-auto flex flex-col items-center justify-center px-10 md:px-6 md:mb-0 md:pb-10 mb-6 mt-18 pt-4"
      >
        <div className="index-row flex flex-col md:flex-row container">
          <div className="course-col">
            <h3>Incubators</h3>
            <p>
              Being a part of a large community gives you the advantage of connecting with a diverse group of entrepreneurs, which translates into potentially high-yielding investment opportunities.
            </p>
          </div>
          <div className="course-col">
            <h3>Student Founders</h3>
            <p>
                Our platform is designed in a manner that ensures the maximum number of applications get funded and that those who don't get a thorough examination of their idea.
            </p>
          </div>
          <div className="course-col">
            <h3>College Students</h3>
            <p>
            Our Ambassador Program is designed to incentivise and promote the spirit of entrepreneurship among college students and earn money by referring startups to our platform.
            </p>
          </div>
        </div>
      </div>
    </section>

  
  </div>
  )
}

export default Home
