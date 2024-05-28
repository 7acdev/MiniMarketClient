import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'
import getHeadersConfig, { tokenName } from '../config/headers-config'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState({})
    const { token, config } = getHeadersConfig()

    const getUserProfile = async () => {
        if (!token) {
            setLoading(false)
            return
        }
        try {
            const { data } = await axiosClient(`/User/Profile`, config)
            setAuth(data.result)
            setLoading(false)
        }
        catch (err) {
            console.log(err.response.data.message)
            setAuth({})
        }
        setLoading(false)
    }

    useEffect(() => {
        getUserProfile()
    }, [])


    const closeSession = () => {
        localStorage.removeItem(tokenName)
        localStorage.removeItem('MinimarketProducts')
        setAuth({})
    }

    return (
        <AuthContext.Provider value={
            { auth, setAuth, loading, closeSession, getUserProfile }
        } >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
export default AuthContext