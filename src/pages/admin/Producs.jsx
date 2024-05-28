import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import useProducts from '../../hooks/useProducts'
import useAuth from '../../hooks/useAuth'
import EditProduct from '../../components/EditProduct'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import Spinner from '../../components/spinner/Spinner'

const Products = () => {
    const [seach, setSeach] = useState('')
    const [editedProduct, setEditedProduct] = useState('')

    // Paginación.
    const [currentPage, setCurrentPage] = useState(0)
    const [showProductsNumber, setShowProductsNumber] = useState(10)

    const { auth } = useAuth()
    const { products, getProducts, deleteProduct, 
        editing, setEditing, loading } = useProducts()

    const navigate = useNavigate()

    useEffect(() => {
        getProducts()
        filterProducts()
    }, [auth, showProductsNumber])

    const handleNewProduct = (e) => {
        e.preventDefault()
        navigate('/register-product')
    }

    const filterProducts = () => {
        return products.slice(currentPage, currentPage + showProductsNumber)
    }

    const nextPage = () => {
        if (filterProducts().length >= showProductsNumber && products.length != showProductsNumber) {
            setCurrentPage(currentPage + showProductsNumber)
        }
    }

    const prevPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - showProductsNumber)
    }

    const handleShowProductsNumber = (e) => {
        e.preventDefault()
        setCurrentPage(0)
        setShowProductsNumber(Number(e.target.value))
    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        deleteProduct(id)
    }

    const handleSetSeach = e => {
        e.preventDefault()
        setSeach(e.target.value)
        if (e.target.value === '') {
            getProducts('NA')
            setCurrentPage(0)
        }
    }

    const handleSeach = e => {
        e.preventDefault()
        setCurrentPage(0)
        getProducts(seach)
    }

    return (
        <>
            {editing ?
                <div className={`parent flex items-center justify-centet h-full text-white`}>
                    < EditProduct
                        product={editedProduct}
                    />
                </div> : <div></div>
            }

            {loading ?

                <div className='flex parent items-center justify-center h-screen'>
                    <Spinner />
                </div> :

                <div className={`container parent items-center mt-16 p-5 mb-32
                        justify-center h-full mx-auto text-xs lg:text-lg 
                        text-sky-200 ${editing ? 'hidden' : ''}
                    `}
                >
                    <div className='flex flex-col gap-5 p-3 lg:p-7 rounded-xl 
                            bg-zinc-800 bg-opacity-60
                        '
                    >
                        <div className='flex flex-col lg:flex-row gap-2 h-10 w-full 
                                rounded-md items-center mb-10 lg:mb-3
                            '
                        >
                            <button
                                className='rounded-md p-2 w-full lg:w-60 mb-2 lg:mb-0
                                text-white bg-sky-600
                                active:bg-sky-300 hover:bg-sky-500
                            '
                                onClick={e => { handleNewProduct(e) }}
                            >
                                Nuevo Producto
                            </button>

                            <div className='flex flex-row w-full rounded-xl
                                    outline outline-2 p-2
                                    outline-sky-500
                                '
                                id='seach-bar'
                            >
                                <input
                                    type='text'
                                    value={seach}
                                    className='w-full px-3 border-none focus:outline-none
                                        text-sky-200 bg-transparent
                                    '
                                    onChange={e => { handleSetSeach(e) }}
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
                        </div>

                        <table className='border-2 border-sky-500'>
                            <thead className=' tracking-wide text-left  bg-sky-600' >
                                <tr>
                                    <td className='border-b border-sky-500'>Nombre</td>
                                    <td className='border-b border-slate-500'>Categoria</td>
                                    <td className='border-b border-slate-500'>Precio</td>
                                    <td className='border-b border-slate-500'>Stock</td>
                                    <td className='border-b border-slate-500'> </td>
                                    <td className='border-b border-slate-500'> </td>
                                </tr>
                            </thead>
                            <tbody className='tracking-wide text-left'>
                                {
                                    filterProducts().map(product => (
                                        <tr className='tracking-wide text-left'
                                            key={product.id}
                                        >
                                            <th className='break-all border-b border-slate-500'>{product.name}</th>
                                            <td className='break-all border-b border-slate-500'>{product.category} </td>
                                            <td className='break-all border-b border-slate-500'>$ {parseFloat(product.price).toFixed(2)}</td>
                                            <td className='break-all border-b border-slate-500'>{product.stock}</td>
                                            <td className='xl:w-20 lg:w-36 w-auto border-b border-slate-500'>
                                                <button
                                                    type='button'
                                                    className='lg:p-1 text-ellipsis flex flex-row gap-2 items-center justify-center
                                                        rounded-md 
                                                        text-sky-200 hover:text-sky-500 active:text-sky-300
                                                    '
                                                    onClick={() => {
                                                        setEditing(true)
                                                        setEditedProduct(product)
                                                    }}
                                                >
                                                    <FaEdit />
                                                    <span className='hidden md:block'>Editar</span>
                                                </button>
                                            </td>
                                            <td className='xl:w-20 lg:w-36 w-auto border-b border-slate-500'>
                                                <button
                                                    type='button'
                                                    className='lg:p-1 text-ellipsis flex flex-row 
                                                        gap-2 items-center justify-center rounded-md
                                                        text-red-500 hover:text-red-400 active:text-red-200
                                                    '
                                                    onClick={e => { handleDelete(e, product.id) }}
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

                        <div className='flex flex-col lg:flex-row gap-3 justify-end'>
                            <div className='flex flex-row gap-3 items-center justify-center'>
                                <p className='font-bold'> Mostrar </p>
                                <select className='outline outline-1 text-lg
                                        outline-sky-500  bg-zinc-900 text-sky-200
                                    '
                                    value={showProductsNumber}
                                    onChange={e => { handleShowProductsNumber(e) }}
                                >
                                    <option
                                        className='text-sky-300'
                                        value={5}
                                    >
                                        5
                                    </option>

                                    <option
                                        className='text-sky-300'
                                        value={10}
                                    >
                                        10
                                    </option>
                                    <option
                                        className='text-sky-300'
                                        value={15}
                                    >
                                        15
                                    </option>
                                </select>

                                <h1 className='flex flex-row gap-3 px-2 outline outline-1 outline-sky-500'>
                                    <span>Page: </span>
                                    {
                                        Math.floor((currentPage / showProductsNumber) + 1)
                                    }
                                </h1>
                            </div>

                            <div className='flex flex-row gap-2'>
                                <button
                                    className='outline outline-2 rounded-md p-1 w-full
                                        text-sky-300 hover:text-sky-200 active:text-sky-100
                                        outline-sky-500 hover:outline-sky-400 
                                        active:outline-sky-300 
                                    '
                                    onClick={() => { prevPage() }}
                                >
                                    Anterior
                                </button>

                                <button
                                    className='outline outline-2 rounded-md p-1 w-full
                                        text-sky-300 hover:text-sky-200 active:text-sky-100
                                        outline-sky-500 hover:outline-sky-400 
                                        active:outline-sky-300 
                                    '
                                    onClick={() => { nextPage() }}
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Products