import React from 'react'

const Ambassador = () => {
  return (
    <div>
 
    <section
      className="mt-20 gap-x-8 h-[auto] md:flex-row px-4 md:px-0 md:gap-x-16 bg-[#f8f8f8] w-full border border-b-slate-200"
    >
      <div
        className="text-center md:w-1/2 w-full h-full mx-auto flex flex-col items-center justify-start md:py-12"
      >
        <div className="w-full md:w-[800px] text-center p-4 md:p-2">
          <h2
            className="md:font-extrabold font-bold text-4xl md:text-5xl pb-2 text-[#242424]"
          >
            Become an <span className="text-accent">ambassador</span>
          </h2>
          <h2 className="font-light text-2xl md:font-normal text-[#242424]">
            Join the Seedsnitch Ambassador Program and assist your peers in
            transforming ideas into startups while also earning incentives for
            each referral.
          </h2>
        </div>
      </div>
    </section>
    <section className="w-full h-auto">
      <div
        className="w-full h-full py-4 text-center mx-auto flex flex-col items-center justify-start"
      >
        <div
          className="w-full p-4 md:py-4 md:px-8 flex flex-row-reverse justify-evenly items-center my-4"
        >
          <div className="hidden md:flex flex-row justify-center w-1/2">
            <img
              src="../img/ambass2.jpg"
              className="hidden md:block w-[600px]"
              alt=""
            />
          </div>
          <div
            className="container md:w-1/2 w-full flex flex-col items-center md:items-start justify-center px-6 md:px-12 space-y-3"
          >
            <h1
              className="font-bold text-4xl md:text-5xl pb-2 text-accent text-center w-full"
            >
              What is it about?
            </h1>
            <img
              src="../img/ambass2.jpg"
              className="block w-[180px] md:hidden"
              alt=""
            />
            <p className="text-center text-[20px] font-normal w-full">
              The Seedsnitch Campus Program is a one-of-a-kind opportunity for
              college students to participate in the startup ecosystem and
              receive rewarding benefits. As a campus ambassador, you will
              assist your peers in transforming their ideas into successful
              businesses by linking them with the necessary assistance. With us,
              you'll be able to contribute to the development of the next great
              thing while simultaneously receiving compensation for each
              successful referral.
            </p>
          </div>
        </div>

        <div
          className="w-full p-4 flex flex-row justify-between items-center my-4 md:px-8"
        >
          <div className="hidden md:flex flex-row justify-center w-1/2">
            <img
              src="../img/img2.jpg"
              className="hidden md:block w-[600px]"
              alt=""
            />
          </div>
          <div
            className="container md:w-1/2 w-full flex flex-col items-center md:items-start justify-center px-6 md:px-12 space-y-3"
          >
            <h1
              className="font-bold text-4xl md:text-5xl pb-2 text-accent text-center w-full"
            >
              How does this work?
            </h1>
            <img
              src="../img/img2.jpg"
              className="block w-[180px] md:hidden"
              alt=""
            />
            <p className="text-center text-[20px] font-normal w-full">
              We will contact you if your application is accepted. Campus
              ambassador tasks are simple: Make your friends aware of Seedsnitch
              and identify students who want to start a business but need
              assistance. We help. We support college students with ambition. We
              are motivated by our passion, not by money. You will receive Rs.
              5,000 if your recommended startup idea is funded. How can I
              generate a good idea? Simply rely on instinct.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div
        className="h-full w-full flex flex-col gap-4 justify-between items-center space-y-8 p-4 mb-8"
      >
        <h2 className="md:font-bold font-bold text-4xl md:text-5xl text-accent">
          <span className="text-[#242424]"> Join our&nbsp;</span>Mission
        </h2>
        <div
          className="w-full md:w-[600px] h-full rounded-md mx-auto border-t border-t-gray-100 px-4"
        >
          <form
            className="w-full h-full max-w-2xl px-4 py-6"
            id="ambass-form"
            name="ambass"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                  htmlFor="grid-name"
                >
                  Name
                </label>
                <input
                  name="Name"
                  className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-name"
                  type="text"
                  required
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
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
                  name="Email"
                  type="email"
                  required
                  placeholder="Enter your email id"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                  htmlFor="grid-linkedin"
                >
                  Linkedin profile
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-name"
                  name="Linkedin"
                  type="url"
                  placeholder="Your linkedin profile"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 mt-8">
              <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                  htmlFor="grid-plan"
                >
                  How do you plan to network with startup founders or those in
                  the ideation stage at your college?
                </label>
                <textarea
                  className="w-full bg-gray-100 text-darkBlue border border-b-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-plan"
                  name="Networking Approach"
                  placeholder="Describe your approach here..."
                  rows="7"
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 mt-8">
              <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                  htmlFor="grid-prob"
                >
                  Do you know people who are working on a startup idea, and you
                  think we can help them? If so, drop their LinkedIn profile.
                  Remember, you get rewarded if we help them scale.
                </label>
                <textarea
                  name="Founder Linkedin"
                  className="w-full bg-gray-100 text-darkBlue border border-b-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-prob"
                  placeholder="Drop their linkedin profiles here..."
                  rows="7"
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 mt-8">
              <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
                  htmlFor="grid-desc"
                >
                  Is there anything you want to tell us about yourself?
                </label>
                <textarea
                  name="About Yourself"
                  className="w-full bg-gray-100 text-darkBlue border border-b-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-desc"
                  placeholder="Tell us about yourself..."
                  rows="7"
                  required
                ></textarea>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full flex flex-row items-center">
                <input
                  className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697]"
                  type="submit"
                  id="ambass-submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

    
  </div>
  )
}

export default Ambassador
