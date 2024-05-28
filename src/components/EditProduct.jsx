import useProducts from "../hooks/useProducts";
import { useState, useEffect } from 'react'
import FormInput from "./Inputs/FormInput";
import Swal from "sweetalert2";

const EditProduct = (props) => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const { editing, setEditing, editProduct } = useProducts()

    useEffect(() => {
        setName(props.product.name)
        setCategory(props.product.category)
        setPrice(Number(props.product.price))
        setStock(Number(props.product.stock))

        return () => {
            setEditing(false)
        }

    }, [editing])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([name, category, price, stock].includes('')) {
            Swal.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                background: "#000",
                color: "white",
                icon: 'error'
            })
            return
        }
        editProduct(props.product.id, name, category, price, stock)
    }

    return (
        <div className='parent flex items-center justify-center h-screen pt-16 mx-auto'>
            <div
                id='card'
                className='p-5 flex flex-col gap-5 rounded-xl w-96
                    bg-zinc-800 bg-opacity-60
                '
            >
                <div>
                    <FormInput
                        name={'Nuevo Nombre'}
                        type={'text'}
                        placeholder='Ingresa tu Nuevo Nombre'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        py={3}
                    />

                    <FormInput
                        name={'Nueva Categoria'}
                        type={'text'}
                        placeholder='Ingresa tu Nuevo Categoria'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        py={3}
                    />

                    <FormInput
                        name={'Nuevo Precio'}
                        type={'number'}
                        placeholder='Ingresa tu Nuevo Precio'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        py={3}
                    />

                    <FormInput
                        name={'Nuevo Stock'}
                        type={'number'}
                        placeholder='Ingresa tu Nuevo Stock'
                        value={stock}
                        onChange={e => setStock(e.target.value)}
                        py={3}
                    />
                </div>

                <div className='grid grid-cols-2 gap-3 py-2'>
                    <button
                        className='rounded-md py-2
                            text-white bg-sky-600 
                            active:bg-sky-300 hover:bg-sky-500
                        '
                        onClick={e => { handleSubmit(e) }}
                    >
                        Guardar
                    </button>

                    <button
                        className='rounded-md py-2
                            text-white bg-red-600 
                            active:bg-red-300 hover:bg-red-500
                        '
                        onClick={() => { setEditing(false) }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProduct