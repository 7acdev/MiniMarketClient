import { React, useState, useEffect, useRef } from 'react'
import ProfileRoute from './ProfileRoute'
import useAuth from '../../hooks/useAuth'
import { IconContext } from "react-icons";
import { FaUserAlt } from "react-icons/fa";

const ProfileMenu = () => {
    const { auth, closeSession } = useAuth()
    const [showMenu, setShowMenu] = useState(false)
    const [authMode, setAuthMode] = useState(false)

    let menuRef = useRef(null)

    const checkLogin = () => {
        const isLogin = auth?.id
        setAuthMode(isLogin)
    }

    const handleCloseSession = () => {
        closeSession()
        setShowMenu(false)
    }

    useEffect(() => {
        checkLogin()
        let handler = e => {
            if (!menuRef.current.contains(e.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [])

    return (
        <>
            <nav ref={menuRef}>
                <button
                    className='rounded-3xl p-2 bg-opacity-60 bg-zinc-900'
                    onClick={() => {
                            checkLogin()
                            setShowMenu(!showMenu)
                        }
                    }
                >
                    <IconContext.Provider value={{ size: 24, color: "white" }}>
                        <div>
                            <FaUserAlt />
                        </div>
                    </IconContext.Provider>
                </button>

                <div
                    className={`fixed mt-5 -mx-28 ${showMenu ? '' : 'hidden'}`}
                >
                    <div className='flex flex-col gap-2 px-4 py-10 rounded-xl 
                            shadow-lg bg-opacity-75 backdrop-blur-sm
                            bg-zinc-800
                        '
                    >
                        <ProfileRoute
                            name={`${authMode ? 'Perfil' : 'Registrarse'}`}
                            route={`${authMode ? '/profile' : '/register'}`}
                            click={() => { setShowMenu(false) }}
                        />

                        <ProfileRoute
                            name={`${authMode ? 'Cerrar Sesión' : 'Iniciar Sesión'}`}
                            route='/login'
                            click={() => {
                                    authMode ? handleCloseSession() : setShowMenu(false)
                                }
                            }
                        />
                    </div>
                </div>
            </nav >
        </>
    )
}

export default ProfileMenu