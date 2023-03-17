import React ,{ useEffect, useState }from 'react'
import { useParams,Link } from 'react-router-dom'
import { Pagination } from 'react-bootstrap'
import Loader from '../../Common_Components/Loader'
import axios from 'axios'

const Paginate = ({pages,page}) => {
  return pages>1 && (

    <Pagination>
        {
            [...Array(pages).keys()].map(x=>(
                
                    <Pagination.Item >
                        <Link key={x+1} to={`/admin/incubators/page/${x+1}`}>
                            {x+1} 
                        </Link>
                    </Pagination.Item>
                
            ))
        }
    </Pagination>
  )
}


const TableData = ({child}) => {
    return(
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{child}</td>
    )
}

const TableDataText = ({text}) => {
    return (
        <p className="text-gray-900 whitespace-no-wrap">
            {text}
        </p>
    )
}



const IncubatorTable = () => {

    const table_headers = ['Incubator Name','Incubator Email','Applications Submitted','Applications Accepted']
    const {pageNumber} = useParams() ||1;
    const [loading,setLoading] =useState('true')
    const [incubatorList,setIncubatorList] = useState([])
    const [page,setPage] = useState(1)
    const [pages,setPages] = useState(1);
    
    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:4000/api/incubators?pageNumber=${pageNumber}`)
        .then(res=> {
            setIncubatorList(res.data.incubators)
            setPage(res.data.page)
            setPages(res.data.pages)
        })
        setLoading(false)
    }, [pageNumber])
    

    if(loading) return <Loader />

    return (
        <div className="sm:px-8 py-4 overflow-x-auto ">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">

            <table className="min-w-full leading-normal">
            
                <thead>
                    {table_headers.map((theader)=>(
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            {theader}
                        </th>
                    ))}
                </thead>


                <tbody>
                    { incubatorList && incubatorList.map((incubator)=>(
                        <tr>
                            <TableData child={<TableDataText text={incubator.name}/>} />
                            <TableData child={<TableDataText text={incubator.email}/>} />
                            <TableData child={<TableDataText text={incubator.applications_submitted.length}/>} />
                            <TableData child={<TableDataText text={incubator.applications_accepted.length}/>} />
                        </tr>))
                    }
                </tbody>
            </table>
            </div>
            <Paginate pages={pages} page={page}/>
        </div>
  )
}

export default IncubatorTable