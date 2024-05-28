import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormCard from '../../components/cards/FormCard'
import FormInput from "../../components/Inputs/FormInput"

const RestorePassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        if (email === '') {
            Swal.fire({
                title: 'Error',
                text: 'Correo electronico obligatorio',
                background: "#000",
                color: "white",
                icon: 'error'
            })
            return
        }

        try {
            const { data } = await axiosClient.post(`User/ResetPassword/${email}`)
            Swal.fire({
                title: `${data.success ? 'Exito' : 'Error'}`,
                text: data.message,
                background: "#000",
                color: "white",
                icon: `${data.success ? 'success' : 'error'}`
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
                        name={'Email'}
                        type={'email'}
                        placeholder='Correo Electrónico'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                }
                buttonName={'Enviar'}
            />
        </div>
    )
}

export default RestorePassword