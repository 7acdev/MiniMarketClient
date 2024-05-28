import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import Sidebar from '../components/sidebar/Sidebar'

const AdminLayout = () => {
    const { auth, loading } = useAuth()

    if (loading)
        return 'Cargando...'

    return (
        <>
           <Sidebar/> <Header />
            {
                (auth?.id && auth?.role === 'admin') ? (
                <>
                    <main className='lg:pl-60 pb-20 pt-16'>
                        <Outlet />
                    </main>
                </>) : <Navigate to='/profile' />
            }
        </>
    )
}

export default AdminLayout