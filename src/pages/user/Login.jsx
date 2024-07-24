import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../config/axios'
import useAuth from '../../hooks/useAuth'
import { tokenName } from "../../config/headers-config"
import Swal from 'sweetalert2'
import FormCard from "../../components/cards/FormCard"
import FormInput from "../../components/Inputs/FormInput"
import Spinner from "../../components/spinner/Spinner"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()

        if ([email, password].includes('')) {
            Swal.fire({
                title: 'Error',
                text: 'Dejaste campos sin llenar',
                background: "#000",
                color: "white",
                icon: 'error'
            })
            return
        }
        setLoading(true)
        try {
            const { data } = await axiosClient.post('/User/Auth', { email, password })
            if (data.success) {
                localStorage.setItem(tokenName, data.result.token)
                setAuth(data.result.profile)

            }

            if (data.success) {
                if (data.result.profile.role === 'admin') {
                    navigate('/dashboard')
                }
                else {
                    navigate('/sale')
                }
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
        }
        catch (error) {
            Swal.fire({
                title: 'Error',
                background: "#000",
                color: "white",
                text: ex,
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
                </div> :
                <div className='parent h-screen flex flex-col items-center justify-center text-white'>

                    <details className="flex flex-col gap-3">
                        <summary> CRENDENCIALES DE PRUEBA </summary>
                        <span>Email: apu@email.com</span>
                        <span>Clave: 123456789</span>

                    </details>

                    <FormCard
                        handleSubmit={handleSubmit}
                        formContent={
                            <>
                                <FormInput
                                    name={'Email'}
                                    type={'email'}
                                    placeholder='Correo Electrónico'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    py={3}
                                />

                                <FormInput
                                    name={'Password'}
                                    type={'password'}
                                    placeholder='Ingresa tu Contraseña'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    py={3}
                                />
                            </>

                        }
                        buttonName={'Iniciar Sesión'}
                        footer={
                            <nav className='mt-10 flex justify-between'>
                                <Link
                                    className='block text-center  text-sky-500'
                                    to='/register'
                                >
                                    Registrarse
                                </Link>
                                <Link
                                    className='block text-center  text-pink-500'
                                    to='/restore-password'
                                >
                                    Olvidé Mi Contraseña.
                                </Link>
                            </nav>
                        }
                    />
                </div>
            }
        </>
    )
}

export default Login