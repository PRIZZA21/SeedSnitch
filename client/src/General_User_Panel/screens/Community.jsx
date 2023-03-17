import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Infobar from '../../Common_Components/Infobar'
import Loader from '../../Common_Components/Loader'


const Community = () => {

    
  const [ecellsList,setEcellsList] = useState('')
  const [loading,setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:4000/api/ecells/all').then(res=> setEcellsList(res.data))
    setLoading(false)
  }, [])

  if(loading) return <Loader/>

  return (
    <div>
      <Infobar start_text={'E-cells'} end_text={'with us'} />
       
    <section>
      <div className="py-4 min-h-[370px] text-center mx-auto flex flex-col items-center justify-start px-10">
        <div className="w-full p-4 flex flex-row justify-start items-center my-4">

        { ecellsList && ecellsList.map((ecell)=>(
        <div className="bg-white rounded-lg shadow-lg mx-6">
          <img src={`http://localhost:4000/${ecell.logo}`} alt="" className="w-60 h-40 rounded-t-lg p-8 border-b-2"/>
          <div class="px-6 py-2">
            <h2 class="font-bold mb-2 text-2xl text-gray-800">{ecell.name}</h2>
          </div>
        </div>
        ))}
        </div>
      </div>
    </section>

    </div>
  )
}

export default Community
