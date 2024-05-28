import { useState, useEffect } from 'react'
import axiosClient from '../../config/axios'
import getHeadersConfig from '../../config/headers-config'
import Spinner from '../../components/spinner/Spinner'
//import '../../components/spinner/css/spinner.css'

const Dashboard = () => {
    const [dash, setDash] = useState({})
    const { config } = getHeadersConfig()
    const [loading, setLoading] = useState(true)

    const getDashboard = async () => {
        setLoading(true)
        try {
            const { data } = await axiosClient.get('/Dashboard/Summary', config)
            setDash(data.result)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        getDashboard()
    }, [])

    return (
        <>
            {loading ?
                <div className='flex parent items-center justify-center h-screen'>
                    <Spinner />
                </div> :
                <div className='flex parent h-full justify-center items-center pt-52'>
                    <div className='flex flex-col md:flex-row gap-3  text-white'>

                        <div
                            className=' flex flex-col font-bold items-center justify-center
                                w-64 h-28 rounded-xl
                                outline outline-2 outline-sky-300 bg-zinc-900 bg-opacity-25
                            '
                        >
                            <p className='text-2xl'>Total Ventas</p>
                            <p className='text-3xl text-sky-400'>{dash?.totalSales}</p>
                        </div>

                        <div
                            className=' flex flex-col font-bold items-center justify-center
                                w-64 h-28 rounded-xl
                                outline outline-2 outline-sky-300 bg-zinc-900 bg-opacity-25
                            '
                        >
                            <p className='text-2xl'>Total Ganancias</p>
                            <p className='text-3xl text-sky-400'>$ {dash?.totalRevenue}</p>
                        </div>

                        <div className='flex flex-row'>
                            <div
                                className='flex flex-col font-bold items-center justify-center
                                    w-64 h-28 rounded-xl
                                    outline outline-2 outline-sky-300 bg-zinc-900 bg-opacity-25
                                '
                            >
                                <p className='text-2xl'>Productos Totales</p>
                                <p className='text-3xl text-sky-400'> {dash?.totalProducts} </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Dashboard