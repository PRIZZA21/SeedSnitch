import React from 'react'
import Infobar from '../../Common_Components/Infobar'
import UserApplicationTable from '../components/UserApplicationTable'


const UserApplicationScreen = () => {
  return (
    <div className='flex flex-row'>

        <div className="w-full bg-white relative">
            <Infobar start_text={'Your Applications'} end_text={'with us'} />
            <section className="h-auto min-h-[60vh] w-5/6 py-4 px-2 relative md:mt-0 mt-10 mx-auto">
                <div className="h-full md:flex-row right-4">
                    <UserApplicationTable />
                </div>
            </section>
        </div>
    </div>
  )
}

export default UserApplicationScreen
