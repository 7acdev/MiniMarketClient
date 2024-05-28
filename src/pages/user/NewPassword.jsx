import { useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../../config/axios'
import Swal from 'sweetalert2'
import FormCard from '../../components/cards/FormCard'
import FormInput from "../../components/Inputs/FormInput"

const NewPassword = () => {
    const { token } = useParams()
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        if (token === '') {
            Swal.fire({
                title: 'Error',
                text: 'Token no encontrado',
                background: "#000",
                color: "white",
                icon: 'error'
            })
            return
        }

        if (password === '') {
            Swal.fire({
                title: 'Error',
                text: 'Dejaste campos sin llenar',
                background: "#000",
                color: "white",
                icon: 'error'
            })
            return
        }

        try {
            const { data } = await axiosClient.post(`/User/NewPassword`, { token, password })
            if (data.success) {
                navigate('/')
            }

            Swal.fire({
                title: data.success ? 'Exito' : 'Error',
                text: data.message,
                background: "#000",
                color: "white",
                icon: data.success ? 'success' : 'error'
            })

        }
        catch (err) {
            Swal.fire({
                title: 'Error',
                text: err,
                background: "#000",
                color: "white",
                icon: 'error'
            })
        }
    }

    return (
        <div className='parent h-screen flex items-center justify-center'>
            <FormCard
                handleSubmit={handleSubmit}
                formContent={
                    <FormInput
                        name={'Password'}
                        type={'password'}
                        placeholder='Nueva Contraseña'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                }
                buttonName={'Restablecer'}
            />
        </div>
    )
}

export default NewPassword