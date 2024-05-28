import React from 'react'
import { useState, useEffect } from 'react'
import useProducts from '../../hooks/useProducts'
import FormInput from '../../components/Inputs/FormInput'
import generateId from '../../utility/generateId'
import { MdDelete } from 'react-icons/md'
import useAuth from '../../hooks/useAuth'
import axiosClient from '../../config/axios'
import getHeadersConfig from '../../config/headers-config'
import Swal from 'sweetalert2'
import Spinner from '../../components/spinner/Spinner'

let ProductList = []
const Sale = () => {
    const [product, setProduct] = useState('')
    const [amount, setAmount] = useState(Number(1))
    const [total, setTotal] = useState(Number(0))
    const [paidMethod, setPaidMethod] = useState('Efectivo')
    const { products, getProduct, getProducts, loading, setLoading } = useProducts()
    const { auth } = useAuth()
    const { config } = getHeadersConfig()

    const handleAddProduct = async (e) => {
        e.preventDefault()
        const p = product === '' ? await getProduct(products[0].id) : await getProduct(product)
        if (p.length === 0)
            return

        const { category, registerDate, stock, ...neoP } = p

        let productExist = false
        if (ProductList.length > 0) {
            ProductList.forEach(el => {
                if (el.name === neoP.name) {
                    productExist = true
                    el.amount = Number(el.amount) + Number(amount)
                    el.total = neoP.price * el.amount
                }
                else {
                    productExist = false
                }
            })
        }
        else {
            productExist = false
        }

        if (!productExist) {
            neoP.amount = amount
            neoP.total = neoP.price * amount
            ProductList.push(neoP)
        }
        localStorage.setItem('MinimarketProducts', JSON.stringify(ProductList))
        setTotal(computeTotal())
    }

    const handleRemoveProduct = (e, p) => {
        e.preventDefault()
        const index = ProductList.indexOf(p)
        const neo = ProductList.filter(f =>
            ProductList.indexOf(f) !== index
        )
        localStorage.setItem('MinimarketProducts', JSON.stringify([...neo]))
        setTotal(computeTotal())
    }

    const computeTotal = () => {
        ProductList = []
        const pr = JSON.parse(localStorage.getItem('MinimarketProducts'))
        if (pr === null)
            return
        ProductList = [...pr]
        const ret = ProductList.map(e => e.total)
            .reduce((acc, al) => (acc + al), 0)

        return ret;
    }

    const handleRegister = async e => {
        e.preventDefault()
        setLoading(true)
        const saleDetails = []
        ProductList.map(element => {
            saleDetails.push(
                {
                    idProduct: element.id,
                    idProductDescription: element.name,
                    amount: element.amount,
                    priceText: element.price.toString(),
                    totalText: element.total.toString()
                }
            )
        });

        try {
            const { data } = await axiosClient.post('/Sale/Register', {
                paidType: paidMethod, totalText: total.toString(),
                saleDetails: saleDetails
            }, config)

            Swal.fire({
                title: `${data.success ? 'Exito' : 'Error'}`,
                text: data.message,
                background: "#000",
                color: "white",
                icon: `${data.success ? 'success' : 'error'}`
            }).then(() => {
                if (data.success) {
                    ProductList = []
                    localStorage.removeItem('MinimarketProducts')
                    setTotal(computeTotal())
                    setLoading(false)
                }
            })
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

    useEffect(() => {
        getProducts()
        setTotal(computeTotal())
    }, [auth])

    return (
        <>
            {loading ?
                <div className='flex parent items-center justify-center h-screen'>
                    <Spinner />
                </div> :
                <div className={`container parent items-center justify-center 
                        h-full mx-auto mt-16 p-5 text-xs lg:text-lg 
                        text-sky-200 
                    `}
                >
                    <div className='flex flex-col gap-5 p-3 lg:p-7 rounded-xl justify-center bg-zinc-800 bg-opacity-60'>
                        <div className='flex flex-col lg:flex-row gap-3 justify-center'>
                            <div className='flex flex-col gap-3 font-bold mx-auto text-xl rounded-xl w-full
                                text-sky-400'>
                                <label className='font-bold text-xl'> Product </label>
                                <select className='outline outline-1 text-xl p-3 h-[3.3rem] rounded-xl
                                    outline-sky-500 bg-zinc-900
                                    bg-opacity-25 hover:bg-opacity-100 active:bg-zinc-900 text-sky-200
                                '
                                    value={product}
                                    onChange={e => { setProduct(e.target.value) }}
                                >
                                    {
                                        products.map(p => (
                                            <option
                                                key={p.id}
                                                className='text-sky-300 tracking-wide break-all'
                                                value={p.id}
                                            >
                                                {p.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className='flex flex-col font-bold mx-auto lg:text-md rounded-xl w-full text-sky-400 gap-3'>
                                <p className='font-bold'> Cantidad </p>
                                <FormInput
                                    type={'number'}
                                    placeholder={'cantidad'}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <input
                                    type='submit'
                                    value={'+Agregar'}
                                    className='w-full py-2 px-10 mt-5 rounded-md uppercase font-bold hover:cursor-pointer
                                        text-white 
                                        bg-sky-600 active:bg-sky-300 hover:bg-sky-500
                                    '
                                    onClick={e => handleAddProduct(e)}
                                />
                            </div>

                            <div className='flex flex-col gap-3 font-bold mx-auto text-xl 
                                rounded-xl w-full px-3
                                text-sky-400'
                            >
                                <p className='font-bold'> Método de Pago </p>
                                <select className='outline outline-1 text-lg p-3 h-[3.3rem] rounded-xl 
                                        outline-sky-500  bg-zinc-900  bg-opacity-25 hover:bg-opacity-100 
                                        active:bg-zinc-900 text-sky-200
                                    '
                                    value={paidMethod}
                                    onChange={e => { setPaidMethod(e.target.value) }}
                                >
                                     <option
                                        className='text-sky-300'
                                        value={'Efectivo'}
                                    >
                                        Efectivo
                                    </option>
                                    <option
                                        className='text-sky-300'
                                        value={'Paypal'}
                                    >
                                        Tarjeta
                                    </option>
                                </select>

                                <div className='uppercase font-bold py-2 px-10 mt-5 rounded-md outline outline-1
                                        items-center justify-center flex flex-col text-xl bg-opacity-25
                                        outline-sky-400 text-sky-400 bg-zinc-900
                                    '
                                >
                                    <p>Total</p>
                                    <p className='text-sky-200'>{total ? parseFloat(total).toFixed(2) : 0}</p>
                                </div>

                                <input
                                    type='submit'
                                    value={'Registrar'}
                                    className='w-full py-2 px-10 mt-5 rounded-md 
                                        uppercase font-bold hover:cursor-pointer
                                        text-white bg-sky-600 
                                        active:bg-sky-300 hover:bg-sky-500
                                    '
                                    onClick={e => handleRegister(e)}
                                />
                            </div>
                        </div>

                        <table className='border-2 w-full border-sky-500'>
                            <thead className=' tracking-wide text-left  bg-sky-600' >
                                <tr>
                                    <td className='border-b border-sky-500'>Producto</td>
                                    <td className='border-b border-slate-500'>Precio</td>
                                    <td className='border-b border-slate-500'>Cantidad</td>
                                    <td className='border-b border-slate-500'>Total</td>
                                    <td className='border-b border-slate-500'></td>
                                </tr>
                            </thead>
                            <tbody className='tracking-wide text-left'>
                                {
                                    ProductList.map(pr => (
                                        <tr className=' tracking-wide text-left'
                                            key={pr.id + generateId()}
                                        >
                                            <th className='break-all border-b border-slate-500'>{pr.name}</th>
                                            <td className='break-all border-b border-slate-500'>$ {parseFloat(pr.price).toFixed(2)}</td>
                                            <td className='break-all border-b border-slate-500'>{pr.amount}</td>
                                            <td className='break-all border-b border-slate-500'>$ {parseFloat(pr.total).toFixed(2)}</td>
                                            <td className=' xl:w-20 lg:w-36 w-auto border-b border-slate-500'>
                                                <button
                                                    type='button'
                                                    className='lg:p-1 text-ellipsis flex flex-row gap-2 items-center justify-center
                                                        rounded-md
                                                        text-red-500 hover:text-red-400 active:text-red-200
                                                    '
                                                    onClick={e => { handleRemoveProduct(e, pr) }}
                                                >
                                                    <MdDelete />
                                                    <span className='hidden md:block' >Borrar</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}

export default Sale