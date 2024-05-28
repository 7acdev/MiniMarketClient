import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../config/axios'
import Swal from 'sweetalert2'

const ConfirmAccount = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { token } = params

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const { data } = await axiosClient.get(`/User/Confirm/${token}`)
                Swal.fire({
                    title: data.success ? 'Exito' : 'Error',
                    text: data.message,
                    background: "#000",
                    color: "white",
                    icon: data.success ? 'success' : 'error'
                }).then(() => {
                    navigate('/')
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
        }
        confirmAccount()
    }, [])

    return (
        <></>
    )
}

export default ConfirmAccount