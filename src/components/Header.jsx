import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import ProfileMenu from "./profile/ProfileMenu"

const Header = () => {
    return (
        <>
            <header className='fixed w-full xl:w-screen items-center py-3 mx-auto
                    bg-gradient-to-r from-sky-950 to-green-900
                ' 
            >
                <div
                    className='flex flex-row mx-auto justify-between items-center px-2 lg:px-10'
                >
                    <Link to='/'
                        className='flex flex-row gap-2 px-2 text-2xl lg:text-4xl font-bold 
                            rounded-xl shadow-md
                            text-slate-400 ring-1 ring-offset-2 
                            ring-green-500
                            ring-offset-green-400
                        '
                    >
                        KWik <span className='text-orange-600'> EMart </span>
                    </Link>
                    <div className='flex'>
                        <div> <ProfileMenu /> </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header