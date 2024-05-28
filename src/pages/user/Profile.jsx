import { useState, useEffect } from 'react'

import axiosClient from '../../config/axios'
import Swal from 'sweetalert2'
import FormInput from '../../components/Inputs/FormInput'
import useAuth from '../../hooks/useAuth'
import useUsers from '../../hooks/useUsers'
import getHeadersConfig from '../../config/headers-config'
import userRoles from '../../config/roles'
import prImg from '../../assets/profile-default.jpg'
import EditUser from '../../components/EditUser'
import Spinner from '../../components/spinner/Spinner'

const Profile = () => {
    const { getUserProfile, auth, setAuth, loading, setLoading  } = useAuth()
    const { deleteUser } = useUsers()
    const { configArchive } = getHeadersConfig()
    const { editing, setEditing} = useUsers()

    useEffect(() => {
        getUserProfile()
    }, [editing])

    const handleDeleteUser = (e) => {
        e.preventDefault()
        deleteUser(auth?.id)
    }

    const clickUploadImage = (e) => {
        document.getElementById("select-image").click()
    }

    const handleUploadImage = async (e) => {
        e.preventDefault()

        if (e.target.files == 0)
            return

        const img = new FormData()
        img.append('image', e.target.files[0])
        //setLoading(true)

        try {
            const { data } = await axiosClient.post("/User/UploadProfileImage",
                img, configArchive
            )

            if (data.success) {
                getUserProfile()
                Swal.fire({
                    title: 'Exito',
                    text: 'Imagen subida con exito',
                    background: "#000",
                    color: "white",
                    icon: 'success'
                })
                //setLoading(false)
            }
        }
        catch (err) {
            console.log(err)
        }
       // setLoading(false)
    }

    return (
        <>
            {editing ?
                <div className={`parent flex items-center justify-centet h-full text-white`}>
                    < EditUser
                        user={auth}
                        profileRole={auth.role}
                    />
                </div>
                : <div></div>
            }

            {loading ?
                <div className='flex parent items-center justify-center h-screen'>
                    <Spinner />
                </div> 
                :
                <div className={`parent flex items-center justify-center h-full pt-52 ${editing ? 'hidden' : ''} `}>
                    <div
                        id='card'
                        className='p-5 flex flex-col gap-5 rounded-xl w-64 sm:w-72 lg:w-96
                            bg-zinc-800 bg-opacity-60
                        '
                    >
                        <div id='profile-img'
                            className='flex flex-col gap-5 items-center justify-center'
                        >
                            <img src={
                                    `
                                        ${(auth?.imageUrl == '' || auth?.imageUrl == null) ? prImg :
                                            import.meta.env.VITE_BACKEND_URL + "/" + auth?.imageUrl}
                                    `
                                }
                                className='w-28 h-28 lg:w-48 lg:h-48 rounded-full outline outline-2 outline-sky-500'
                            />

                            <input
                                id='select-image'
                                hidden
                                type='file'
                                onChange={e => handleUploadImage(e)}
                            />

                            <button
                                className='rounded-md p-2 w-full
                                    text-white bg-sky-600 
                                    active:bg-sky-300 hover:bg-sky-500 
                                '
                                onClick={e => { clickUploadImage(e) }}
                            > 
                                Subir Imagen 
                            </button>
                        </div>

                        <div className='flex flex-col gap-3 text-sky-200' >
                            <p>{auth?.fullName}</p>
                            <p>{auth?.email}</p>
                            <p>{auth?.role === userRoles.admin ? 'Admin' : 'Emplead@'}</p>
                        </div>

                        <div className='grid grid-cols-2 gap-3 py-2'>
                            <button
                                className='rounded-md py-2
                                    text-white bg-sky-600 
                                    active:bg-sky-300 hover:bg-sky-500 
                                '
                                    onClick={e => { setEditing(true) }}
                            > 
                                Editar 
                            </button>

                            <button className='rounded-md 
                                    text-white bg-red-600 
                                    active:bg-red-300 hover:bg-red-500 
                                '
                                onClick={e => { handleDeleteUser(e) }}
                            > 
                                Borrar 
                            </button>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default Profile