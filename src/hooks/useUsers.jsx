import { useContext } from 'react'
import UsersContext from '../context/users-provider'

const useUsers = () => {
    return useContext(UsersContext)
}

export default useUsers