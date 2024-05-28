import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'
import getHeadersConfig from '../config/headers-config'
import useAuth from '../hooks/useAuth'
import userRoles from '../config/roles'
import Swal from "sweetalert2"

const UsersContext = createContext()

const UsersProvider = ({ children }) => {
    const { closeSession } = useAuth()
    const { token, config } = getHeadersConfig()
    const [users, setUsers] = useState([])
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(true)

    const {auth} = useAuth()
    // Editing

    const getUsers = async (role = userRoles.all, seach = 'NA') => {
        if (!token) {
            return
        }
        setLoading(true)

        try {
            const { data } = await axiosClient.get(`/User/UserList/${role}/${seach}`, config)
            setUsers([...data.result])
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const deleteUser = async (userId) => {
        if (!token) {
            return
        }

        setLoading(true)
        try {

            Swal.fire({
                title: 'Borrar Usuario'.concat(userId),
                text: '¿Estas Seguro?',
                confirmButtonText: "Confirm",
                confirmButtonColor: 'red',
                showCancelButton: true,
                background: "#000",
                color: "white",
                icon: 'warning'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axiosClient.delete(`/User/Delete/${userId}`, config)

                    Swal.fire({
                        title: `${data.success ? 'Exito' : 'Error'}`,
                        text: data.message,
                        background: "#000",
                        color: "white",
                        icon: `${data.success ? 'success' : 'error'}`
                    }).then((result) => {
                        if (userId == auth.id &&  data.success ){
                            closeSession()
                        }
                        getUsers()
                    })
                }
            })

        }
        catch (err) {
            Swal.fire({
                title: 'Error',
                text: err,
                background: "#000",
                color: "white",
                icon: 'error'
            })
        }
        setLoading(false)
    }

    const editUser = async (id, fullName, email, password, role) => {
        setLoading(true)
        try {
            const { data } = await axiosClient.put('/User/Edit', {
                id: id, fullName: fullName, email: email,
                password: password, role: role
            }, config)

            Swal.fire({
                title: `${data.success ? 'Exito' : 'Error'}`,
                text: data.message,
                background: "#000",
                color: "white",
                icon: `${data.success ? 'success' : 'error'}`
            }).then(() => {
                if (data.success){
                    setEditing(false)
                }
            })
        }
        catch (err) {
            Swal.fire({
                title: 'Error',
                text: err,
                background: "#000",
                color: "white",
                icon: 'error'
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        getUsers()
    }, [editing])

    return (
        <UsersContext.Provider value={
            {
                users, setUsers, getUsers,
                deleteUser, editing, setEditing,
                editUser, loading, setLoading
            }
        }>
            {children}
        </UsersContext.Provider>
    )
}
export { UsersProvider }
export default UsersContext