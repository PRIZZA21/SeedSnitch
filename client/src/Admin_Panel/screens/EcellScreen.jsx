import React from 'react'
import EcellTable from '../components/EcellTable'
import Infobar from '../../Common_Components/Infobar'
import Sidebar from '../components/Sidebar'


const EcellScreen = () => {



  return (
    <div className='flex flex-row'> 
        <Sidebar />
        <div className="w-5/6 bg-white relative">
            <Infobar start_text={'E-cells'} end_text={'associated with us'} link={'/admin/add-ecell'} link_text={'Add New E-cell'}/>

            <section className="h-auto w-4/6 py-10 px-2 relative md:mb-20 md:mt-0 mt-10 mx-auto">
                <div className="h-full  md:flex-row right-4">
                    <EcellTable />
                </div>
            </section>
        </div>


  </div>
  )
}

export default EcellScreen