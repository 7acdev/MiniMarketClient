import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import axiosClient from '../../config/axios'
import getHeadersConfig from '../../config/headers-config'
import Swal from 'sweetalert2'
import FormCard from '../../components/cards/FormCard'
import FormInput from '../../components/Inputs/FormInput'
import userRoles from '../../config/roles'
import Spinner from '../../components/spinner/Spinner'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [role, setRole] = useState(userRoles.admin)
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()
    //const { config } = getHeadersConfig()
    const { auth } = useAuth()

    const handleSubmit = async e => {
        e.preventDefault()
        if ([name, email, password, repeatPassword].includes('')) {
            Swal.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                background: "#000",
                color: "white",
                icon: 'error'
            })
            return
        }

        if (password != repeatPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Comprueba tu password',
                background: "#000",
                color: "white",
                icon: 'error'
            })
            return
        }

        if (password.length < 6) {
            Swal.fire({
                title: 'Error',
                text: 'Tu contraseña debe poseer por lo menos 6 caracteres',
                background: "#000",
                color: "white",
                icon: 'error'
            })
            return
        }
        setLoaded(true)

        try {
            const { data } = await axiosClient.post('/User/Create',
                {
                    fullName: name,
                    email,
                    password,
                    role: role
                })
            setLoaded(false)
            Swal.fire({
                title: `${data.success ? 'Exito' : 'Error'}`,
                text: data.message,
                background: "#000",
                color: "white",
                icon: `${data.success ? 'success' : 'error'}`
            }).then(() => {
                if (data.success) {
                    auth?.role === userRoles.admin ? navigate('/users') : navigate('/') // TODO: Crear una pagina que indique que se envio un correo.
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
        <>
            {loaded ?
                <div className='flex parent items-center justify-center h-screen'>
                    <Spinner />
                </div> 
                :
                <div className='parent h-screen flex mx-auto items-center justify-center pt-24 sm:pt-0'>
                    <FormCard
                        handleSubmit={handleSubmit}
                        formContent={
                            <>
                                <FormInput
                                    name={'Nombre'}
                                    type={'text'}
                                    placeholder={'Ingresa tu Nombre'}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    py={3}
                                />

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

                                <FormInput
                                    name={'Repetir Password'}
                                    type={'password'}
                                    placeholder='Repite tu Contraseña'
                                    value={repeatPassword}
                                    onChange={e => setRepeatPassword(e.target.value)}
                                    py={3}
                                />

                                {/* 
                                    Para pruebas permitimos crear un admin desde el momento de registro, pero solo debería poder ser creado por otro admin.
                                    Nota: esto solo mostrara la opción, pero la validación ocurrira desde el backend.
                                */}
                                {auth.role === userRoles.admin || auth.role != userRoles.admin ?
                                    <div className='flex flex-row gap-3 font-bold mx-auto parent items-center text-xl rounded-xl 
                                        text-sky-400'
                                    >
                                    <p> Rol </p>
                                        <select className='outline outline-1 text-lg
                                                outline-sky-500  bg-zinc-900 text-sky-200
                                            '
                                            onChange={e => { setRole(e.target.value) }}
                                        >
                                            <option className='text-sky-300'
                                                value={userRoles.admin}
                                            >
                                                Administrador
                                            </option>
                                            <option className='text-sky-300'
                                                    value={userRoles.employee}
                                            >
                                                Empleado
                                            </option>
                                        </select>
                                    </div> : <div></div>
                                }
                            </>
                        }
                        buttonName={'Registrarse'}
                        footer={
                            <nav className={`mt-10 flex justify-between ${auth?.role === 'admin' ? 'hidden' : ''}`}>
                                <Link
                                    className='block text-center text-sky-500'
                                    to='/login'
                                >
                                    Inicia Sesión
                                </Link>
                                <Link
                                    className='block text-center text-pink-500'
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

export default Register