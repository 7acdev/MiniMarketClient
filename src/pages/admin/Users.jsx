import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import useUsers from '../../hooks/useUsers'
import useAuth from '../../hooks/useAuth'
import EditUser from '../../components/EditUser'
import userRoles from '../../config/roles'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import Spinner from '../../components/spinner/Spinner'

const Users = () => {
    const [seach, setSeach] = useState('')
    const [editedUser, setEditedUser] = useState('')

    // Paginación.
    const [currentPage, setCurrentPage] = useState(0)
    const [showUsersNumber, setShowUsersNumber] = useState(10)

    const { auth } = useAuth()
    const { users, getUsers, deleteUser, editing, setEditing, loading } = useUsers()

    const navigate = useNavigate()

    useEffect(() => {
        getUsers()
        filterUsers()
    }, [auth, showUsersNumber])

    const handleNewUser = (e) => {
        e.preventDefault()
        navigate('/register-by-admin')
    }

    // Paginación.
    const filterUsers = () => {
        return users.slice(currentPage, currentPage + showUsersNumber)
    }

    const nextPage = () => {
        if (filterUsers().length >= showUsersNumber && users.length != showUsersNumber) {
            setCurrentPage(currentPage + showUsersNumber)
        }
    }

    const prevPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - showUsersNumber)
    }

    const handleShowUsersNumber = (e) => {
        e.preventDefault()
        setCurrentPage(0)
        setShowUsersNumber(Number(e.target.value))
    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        deleteUser(id)
    }

    const handleSetSeach = e => {
        e.preventDefault()
        setSeach(e.target.value)
        if (e.target.value === '') {
            getUsers(userRoles.all, 'NA')
            setCurrentPage(0)
        }
    }

    const handleSeach = e => {
        e.preventDefault()
        setCurrentPage(0)
        getUsers(userRoles.all, seach)
    }

    // NOTA: La tabla se podría convertír en un componente en el futuro.
    // NOTA2: Aactualmente ocultamos toda la tabla en lugar de eliminar el HTML.
    return (
        <>
            {editing ?
                <div className={`parent flex items-center justify-centet h-full text-white`}>
                    < EditUser
                        user={editedUser}
                        profileRole={auth.role}
                    />
                </div> : <div></div>
            }

            {loading ?

                <div className='flex parent items-center justify-center h-screen'>
                    <Spinner />
                </div> :

                <div className={`container parent items-center mt-16 p-5 mb-32
                        justify-center h-full mx-auto
                        text-xs lg:text-lg text-sky-200 ${editing ? 'hidden' : ''} 
                    `}
                >
                    <div className='flex flex-col gap-5 p-7 rounded-xl bg-zinc-800 bg-opacity-60'>
                        <div className='flex flex-col lg:flex-row gap-2 h-10 w-full rounded-md items-center mb-10 lg:mb-3'>
                            <button
                                className='rounded-md p-2 w-full lg:w-60 mb-2 lg:mb-0
                                text-white
                                bg-sky-600
                                active:bg-sky-300
                                hover:bg-sky-500
                            '
                                onClick={e => { handleNewUser(e) }}
                            >
                                Nuevo Usuario
                            </button>

                            <div className='flex flex-row w-full rounded-xl
                                    outline outline-2 p-2 outline-sky-500
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
                            <thead className='tracking-wide text-left bg-sky-600' >
                                <tr>
                                    <td className='border-b border-sky-500' >Nombre</td>
                                    <td className='border-b border-slate-500'>Email</td>
                                    <td className='border-b border-slate-500'>Rol</td>
                                    <td className='border-b border-slate-500'> </td>
                                    <td className='border-b border-slate-500'> </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterUsers().map(usuario => (
                                        <tr className={` tracking-wide text-left ${auth?.id === usuario.id ? 'text-green-300' : ''} ${editing ? 'hidden' : ''} `}
                                            key={usuario.id}
                                        >
                                            <th className='break-all border-b border-slate-500'>{usuario.fullName}</th>
                                            <td className='break-all border-b border-slate-500'>{usuario.email} </td>
                                            <td className='break-all border-b border-slate-500'>{
                                                usuario.email === "elbarto@email.com" ? 'Master' : usuario.role === 'admin' ? 
                                                'Admin' : 'Empleado'
                                            }</td>
                                            <td className={`xl:w-20 lg:w-36 w-auto border-b border-slate-500 
                                                    ${usuario.email === "elbarto@email.com" ? 'hidden' : ''}
                                                `}
                                            >
                                                <button
                                                    type='button'
                                                    className='lg:p-1 text-ellipsis flex flex-row gap-2 
                                                        items-center justify-center rounded-md
                                                        text-sky-200 hover:text-sky-500 active:text-sky-300
                                                    '
                                                    onClick={() => {
                                                        setEditing(true)
                                                        setEditedUser(usuario)
                                                    }}
                                                >
                                                    <FaEdit />
                                                    <span className='hidden md:block'>Editar</span>
                                                </button>
                                            </td>
                                            <td className={`xl:w-20 lg:w-36 w-auto border-b border-slate-500 
                                                    ${usuario.email === "elbarto@email.com" ? 'hidden' : ''}
                                                `}
                                            >
                                                <button
                                                    type='button'
                                                    className='lg:p-1 text-ellipsis flex flex-row gap-2 items-center justify-center
                                                        rounded-md
                                                        text-red-500 hover:text-red-400 active:text-red-200
                                                    '
                                                    onClick={e => { handleDelete(e, usuario.id) }}
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
                                    value={showUsersNumber}
                                    onChange={e => { handleShowUsersNumber(e) }}
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
                                        Math.floor((currentPage / showUsersNumber) + 1)
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

export default Users