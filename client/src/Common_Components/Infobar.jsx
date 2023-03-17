import React from 'react'
import { Link } from 'react-router-dom'

const Infobar = ({start_text,end_text,link,link_text}) => {
  return (
    <section className="mt-20 gap-x-8 h-[auto] md:flex-row px-4 md:px-0 md:gap-x-16 bg-[#f8f8f8] w-full border border-b-slate-200" >
        <div className="text-center md:w-=full w-full h-full mx-auto flex flex-row items-center justify-around md:py-12">
            <h2 className="md:font-extrabold font-bold text-4xl md:text-5xl pb-2 text-accent">
                {start_text} <span className="text-[#242424]"> {end_text} </span>
            </h2>
            {link && <Link className="cursor-pointer flex justify-center items-center font-medium rounded-md border bg-[#0C6980] text-white hover:bg-[#084352] hover:text-white text-xs shrink-0 py-2 px-3 md:py-2 md:px-6 md:text-sm" to={link}>
                {link_text}
            </Link>}
        </div>
    </section>
  )
}

export default Infobar
