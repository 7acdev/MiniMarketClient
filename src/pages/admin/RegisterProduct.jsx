import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import axiosClient from '../../config/axios'
import getHeadersConfig from '../../config/headers-config'
import Swal from 'sweetalert2'
import FormCard from '../../components/cards/FormCard'
import FormInput from '../../components/Inputs/FormInput'

const RegisterProduct = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const { config } = getHeadersConfig()
    //const { auth } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async e => {
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

        try {
            const { data } = await axiosClient.post('/Product/Create', {
                name, category, price, stock
            }, config)

            Swal.fire({
                title: `${data.success ? 'Exito' : 'Error'}`,
                text: data.message,
                background: "#000",
                color: "white",
                icon: `${data.success ? 'success' : 'error'}`
            }).then(() => {
                if (data.success) {
                    navigate('/products')
                }
            })
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
    }

    return (
        <div className='parent h-screen flex mx-auto items-center justify-center'>
            <FormCard
                handleSubmit={handleSubmit}
                formContent={
                    <>
                        <FormInput
                            name={'Nombre'}
                            type={'text'}
                            placeholder='Ingresa nombre del producto'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            py={3}
                        />
                        
                        <FormInput
                            name={'Categoria'}
                            type={'text'}
                            placeholder='Ingresa la Categoria'
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            py={3}
                        />

                        <FormInput
                            name={'Precio'}
                            type={'number'}
                            min={0}
                            max={500}
                            step={0.01}
                            placeholder='0.00'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            py={3}
                        />

                        <FormInput
                            name={'Stock'}
                            type={'number'}
                            min={0}
                            max={5000}
                            placeholder='Ingresa Stock'
                            value={stock}
                            onChange={e => setStock(e.target.value)}
                            py={3}
                        />
                    </>
                }
                buttonName={'Crear'}
                footer={<></>}
            />
        </div>
    )
}

export default RegisterProduct