import React, { useState } from 'react'
import axiosClient from '../../config/axios'
import getHeadersConfig from '../../config/headers-config'
import Swal from 'sweetalert2'
import formatDate from '../../utility/formatDate'
import generateId from '../../utility/generateId'
import Spinner from '../../components/spinner/Spinner'

let HistoryList = []

const SaleHistory = () => {
    const [seachType, setSeachType] = useState('NumeroVenta')
    const [fechaInicio, setFechaInicio] = useState(Date.now().toString())
    const [fechaFin, setFechaFin] = useState(Date.now().toString())
    const [saleNumber, setSaleNumber] = useState('0001')
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSeach = async (e) => {
        e.preventDefault()
        const { config } = getHeadersConfig()
        setLoading(true)
        try {
            const sNumber = seachType === 'NumeroVenta' ? saleNumber : "NA"
            const sDate = seachType === 'NumeroVenta' ? "NA" : formatDate(fechaInicio)
            const eDate = seachType === 'NumeroVenta' ? "NA" : formatDate(fechaFin)

            const { data } = await axiosClient.get(
                `/Sale/History`, {
                params: {
                    seach: seachType,
                    saleNumber: sNumber,
                    startDate: sDate,
                    endDate: eDate

                }
            }, config)

            if (data.success) {
                HistoryList = data.result
                setHistory(HistoryList)
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: data.message,
                    background: "#000",
                    color: "white",
                    icon: 'error'
                })
            }
            setLoading(false)
        }
        catch (error) {
            Swal.fire({
                title: 'Error',
                text: error,
                background: "#000",
                color: "white",
                icon: 'error'
            })
        }
        setLoading(false)
    }

    return (
        <>
            {loading ?
                <div className='flex parent items-center justify-center h-screen'>
                    <Spinner />
                </div> 
                :
                <div className={`container parent items-center mt-16 p-5 mb-32
                        justify-center h-full mx-auto
                        text-xs lg:text-lg text-sky-200
                    `}
                >
                    <div >
                        <div className='flex flex-col gap-5 p-7 rounded-xl first-letter:rounded-xl bg-zinc-800 bg-opacity-60'>
                            <div className='flex flex-col lg:flex-row'>
                                <div className='flex flex-col lg:flex-row gap-2 
                                        h-10 w-full rounded-md items-center mb-10 lg:mb-3
                                    '
                                >
                                    <p>Buscar por</p>
                                    <select className='outline outline-1 text-lg p-3 rounded-xl
                                            outline-sky-500 bg-zinc-900  
                                            bg-opacity-60 hover:bg-opacity-100 
                                            active:bg-zinc-900 text-sky-200
                                        '
                                        value={seachType}
                                        onChange={e => setSeachType(e.target.value)}
                                    >
                                        <option
                                            className='text-sky-300'
                                            value={'NumeroVenta'}
                                        >
                                            Número Venta
                                        </option>
                                        <option
                                            className='text-sky-300'
                                            value={'Fecha'}
                                        >
                                            Fecha
                                        </option>
                                    </select>
                                </div>
                                {
                                    seachType === 'NumeroVenta' ?
                                    <div className='flex flex-row w-full rounded-xl
                                            outline outline-2 p-2
                                            outline-sky-500
                                        '
                                        id='seach-bar'
                                    >
                                        <input
                                            type='text'
                                            value={saleNumber}
                                            className='w-full px-3 border-none focus:outline-none
                                                text-sky-200 bg-transparent
                                            '
                                            onChange={e => { setSaleNumber(e.target.value) }}
                                        />

                                        <button
                                            className='border-l px-2
                                                text-sky-300 hover:text-sky-200 active:text-sky-100
                                                border-sky-500 hover:border-sky-200 
                                                active:border-sky-300  
                                            '
                                            onClick={e => { handleSeach(e) }}
                                        >
                                            Buscar
                                        </button>
                                    </div>
                                        :
                                    <div className='px-2 flex flex-col  gap-3 text-sky-200 w-full'>
                                        <div className='flex flex-col'>
                                            <span> Fecha Inicio: </span>
                                            <input
                                                className='outline outline-1 text-lg p-3 rounded-xl 
                                                    outline-sky-500  bg-zinc-900  bg-opacity-60 
                                                    hover:bg-opacity-100 active:bg-zinc-900 text-sky-200
                                                '
                                                type='date'
                                                value={fechaInicio}
                                                onChange={e => { setFechaInicio(e.target.value) }}
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <span> Fecha Fin: </span>
                                            <input
                                                className='outline outline-1 text-lg p-3 rounded-xl 
                                                    outline-sky-500  bg-zinc-900  bg-opacity-60 
                                                    hover:bg-opacity-100 active:bg-zinc-900 text-sky-200
                                                    dark:[color-scheme:dark]
                                                '
                                                type='date'
                                                value={fechaFin}
                                                onChange={e => { setFechaFin(e.target.value) }}
                                            />
                                        </div>

                                        <button
                                            className='rounded-md p-2 w-full mb-2 lg:mb-0
                                                text-white
                                                bg-sky-600
                                                active:bg-sky-300
                                                hover:bg-sky-500  
                                            '
                                            onClick={e => { handleSeach(e) }}
                                        >
                                            Buscar
                                        </button>
                                    </div>
                                }
                            </div>

                            <table className='border-2 border-sky-500'>
                                <thead className=' tracking-wide text-left  bg-sky-600' >
                                    <tr>
                                        <td className='border-b border-sky-500'>Fecha Registro</td>
                                        <td className='border-b border-sky-500'>Numero Documento</td>
                                        <td className='border-b border-sky-500'>Tipo de Pago</td>
                                        <td className='border-b border-sky-500'>Total</td>
                                    </tr>
                                </thead>
                                <tbody className='tracking-wide text-left'>
                                    {
                                        history.map(pr => (
                                            <tr className=' tracking-wide text-left'
                                                key={pr.id + generateId()}
                                            >
                                                <th className='break-all border-b border-slate-500'>{pr.registerDate}</th>
                                                <td className='break-all border-b border-slate-500'>{pr.documentNumber}</td>
                                                <td className='break-all border-b border-slate-500'>{pr.paidType}</td>
                                                <td className='break-all border-b border-slate-500'>$ {parseFloat(pr.totalText).toFixed(2)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SaleHistory