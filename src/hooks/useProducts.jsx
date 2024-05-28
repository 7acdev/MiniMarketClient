import { useContext } from 'react'
import  ProductsContext  from '../context/products-provider'

const useProducts = () => {
    return useContext(ProductsContext)
}

export default useProducts