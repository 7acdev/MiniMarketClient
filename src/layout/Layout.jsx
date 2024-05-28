import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'

const Layout = () => {
    const { auth, loading } = useAuth()

    if (loading)
        return 'Cargando...'

    return (
        <>
            <Header />
            {
                (!auth?.id) ? (
                    <main className='container mx-auto px-16'>
                        <Outlet />
                    </main>
                ) : <Navigate to='/profile' />
            }
        </>
    )
}

export default Layout