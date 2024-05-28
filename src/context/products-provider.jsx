import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'
import getHeadersConfig from '../config/headers-config'
import Swal from 'sweetalert2'

const ProductsContext = createContext()

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const getProducts = async (seach = 'NA') => {
        const { token, config } = getHeadersConfig()

        if (!token) {
            return
        }

        setLoading(true)

        try {
            const { data } = await axiosClient.get(`/Product/ProductList/${seach}`, config)
            setProducts([...data.result])
            setLoading(false)
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const getProduct = async (id) => {
        const { token, config } = getHeadersConfig()

        if (!token) {
            return
        }
        //setLoading(true)

        try {
            const { data } = await axiosClient.get(`/Product/GetProduct/${id}`, config)
            setLoading(false)
            return data.result
        }
        catch (err) {
            console.log(err)
        }
        //setLoading(false)
    }

    const deleteProduct = async (productId) => {
        const { token, config } = getHeadersConfig()
        if (!token) {
            return
        }
        setLoading(true)
        try {
            Swal.fire({
                title: 'Borrar Producto'.concat(productId),
                text: '¿Estas Seguro?',
                confirmButtonText: "Confirm",
                confirmButtonColor: 'red',
                showCancelButton: true,
                background: "#000",
                color: "white",
                icon: 'warning'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axiosClient.delete(`/Product/Delete/${productId}`, config)

                    Swal.fire({
                        title: `${data.success ? 'Exito' : 'Error'}`,
                        text: data.message,
                        background: "#000",
                        color: "white",
                        icon: `${data.success ? 'success' : 'error'}`
                    }).then(() => {
                        getProducts()
                        setLoading(false)
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

    const editProduct = async (id, name, category, price, stock) => {
        const { token, config } = getHeadersConfig()
        setLoading(true)
        try {
            const { data } = await axiosClient.put('/Product/Edit', {
                id: id, name: name, category,
                price, stock
            }, config)

            Swal.fire({
                title: `${data.success ? 'Exito' : 'Error'}`,
                text: data.message,
                background: "#000",
                color: "white",
                icon: `${data.success ? 'success' : 'error'}`
            }).then(() => {
                if (data.success) {
                    setEditing(false)
                    setLoading(false)
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
        getProducts()
    }, [editing])

    return (
        <ProductsContext.Provider value={
            {
                products, setProducts, getProducts, getProduct,
                deleteProduct, editing, setEditing,
                editProduct, loading, setLoading
            }
        }>
            {children}
        </ProductsContext.Provider>
    )
}
export { ProductsProvider }
export default ProductsContext