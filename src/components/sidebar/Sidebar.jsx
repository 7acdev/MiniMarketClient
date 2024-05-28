import React, { useState } from 'react'
import SidebarRoute from './SidebarRoute'
import useAuth from '../../hooks/useAuth'
import prImg from '../../assets/profile-default.jpg'
import userRoles from '../../config/roles'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";

import {
    FaRegChartBar,
    FaUsers,
    FaDollyFlatbed,
    FaDollarSign,
    FaHistory,
    FaUser,
    FaTeamspeak,
} from "react-icons/fa";

const Sidebar = () => {
    const [show, setShow] = useState(false)
    const { auth } = useAuth()
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    }

    const handleHide = (e) => {
        e.preventDefault()
        setShow(false)
    }

    return (
        <>
            {
                show ? <div></div> 
                : <button className={`fixed flex mx-auto mt-20 items-center 
                        justify-center text-xl rounded-full  translate-x-7 
                        bg-opacity-60 p-3 ${show ? 'hidden' : ''} lg:hidden
                        backdrop-blur-sm
                        bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-500
                        text-sky-400 hover:text-sky-300 active:text-sky-200
                    `
                }
                    onClick={e => { handleShow(e) }}
                >
                    <GiHamburgerMenu />
                </button>
            }

            <div className={`container flex flex-col gap-5 fixed left-0 top-0 w-60 
                        h-[100vh] text-xl px-4 py-20 overflow-y-auto 
                        bg-zinc-800 bg-opacity-60 backdrop-blur-md lg:backdrop-blur-0
                        ${show ? 'translate-x-0' : ''} lg:translate-x-0 -translate-x-60 transition-transform
                    `
                }
            >
                {
                   show ? <button className='flex mx-auto items-center justify-center 
                            rounded-full translate-x-24 p-2 lg:hidden
                            bg-zinc-700 text-sky-500 bg-opacity-60
                        '
                        onClick={e => { handleHide(e) }}
                    >
                        < IoMdCloseCircleOutline />
                    </button> : <div></div>
                }

                <div className='flex flex-col w-full items-center p-2
                        mx-auto gap-4 border-b border-zinc-600
                    '
                >
                    <img src={
                            `${
                                (auth?.imageUrl == '' || auth?.imageUrl == null) 
                                ? prImg : import.meta.env.VITE_BACKEND_URL + "/" + auth?.imageUrl
                            }`
                        }
                        className='w-28 h-28 rounded-full outline outline-2 outline-sky-500'
                    />
                    <span className='px-3 uppercase rounded-md 
                            text-sky-400 outline outline-2 outline-sky-500
                        '
                    >
                        {auth?.role === userRoles.admin ? 'Admin' : 'Emplead@'}
                    </span>
                </div>

                <SidebarRoute
                    icon={
                        auth?.role === userRoles.admin ?
                            <FaTeamspeak />
                            : <FaUser />
                    }
                    route={'/profile'}
                    name={'Perfil'}
                />

                <SidebarRoute
                    icon={<FaRegChartBar />}
                    route={'/dashboard'}
                    name={'Dashboard'}
                />
                
                <SidebarRoute
                    icon={<FaUsers />}
                    route={'/users'}
                    name={'Usuarios'}
                    hide={auth?.role === userRoles.admin ? false : true}
                />

                <SidebarRoute
                    icon={<FaDollyFlatbed />}
                    route={'/products'}
                    name={'Productos'}
                    hide={auth?.role === userRoles.admin ? false : true}
                />

                <SidebarRoute
                    icon={<FaDollarSign />}
                    route={'/sale'}
                    name={'Venta'}
                />

                <SidebarRoute
                    icon={< FaHistory />}
                    route={'/sale-history'}
                    name={'Historial'}
                />
            </div>
        </>
    )
}

export default Sidebar