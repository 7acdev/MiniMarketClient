import userRoles from "../config/roles";
import useUsers from "../hooks/useUsers";
import { useState, useEffect } from 'react'
import FormInput from "./Inputs/FormInput";
import Swal from "sweetalert2";

const EditUser = (props) => {
    const [role, setRole] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { editing, setEditing, editUser} = useUsers()

    useEffect(() => {
        setFullName(props.user.fullName)
        setEmail(props.user.email)
        setRole(props.user.role)
        return () => {
            setEditing(false)
        }
    }, [editing])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([fullName, email].includes('')) {
            Swal.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                background: "#000",
                color: "white",
                icon: 'error'
            })
            return
        }

        if (password.length > 0 && password.length < 6) {
            Swal.fire({
                title: 'Error',
                text: 'Tu contraseña debe poseer por lo menos 6 caracteres',
                background: "#000",
                color: "white",
                icon: 'error'
            })
            return
        }
        editUser(props.user.id, fullName, email, password, role === '' ? user.role : role)
    }

    return (
        <div className='parent flex items-center justify-center h-full pt-52 mx-auto'>
            <div
                id='card'
                className='p-5 flex flex-col gap-5 rounded-xl w-64 sm:w-72 md:w-96 lg:w-96
                    bg-zinc-800 bg-opacity-60
                '
            >
                <div>
                    <FormInput
                        name={'Nuevo Nombre'}
                        type={'text'}
                        placeholder='Ingresa tu Nuevo Nombre'
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        py={3}
                    />

                    <FormInput
                        name={'Nuevo Email'}
                        type={'email'}
                        placeholder='Ingresa tu Nuevo Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        py={3}
                    />

                    <FormInput
                        name={'Nuevo Password'}
                        type={'password'}
                        placeholder='Ingresa tu Nuevo Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        py={3}
                    />

                    {props.profileRole === userRoles.admin ?
                        <div className='flex flex-col gap-3 font-bold mx-auto parent 
                                justify-center text-xl rounded-xl 
                                text-sky-400
                            '
                        >
                            <p className='font-bold'> Rol </p>
                            <select className='outline outline-1 text-lg
                                    outline-sky-500  bg-zinc-900 text-sky-200
                                '
                                value={role}
                                onChange={e => { setRole(e.target.value) }}
                            >
                                <option
                                    className='text-sky-300'
                                    value={userRoles.admin}
                                >
                                    Administrador
                                </option>

                                <option
                                    className='text-sky-300'
                                    value={userRoles.employee}
                                >
                                    Empleado
                                </option>
                            </select>
                        </div> : <div></div>
                    }
                </div>

                <div 
                    className='grid grid-cols-2 gap-3 py-2'
                >
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

export default EditUser