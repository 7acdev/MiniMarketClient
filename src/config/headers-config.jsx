const tokenName = 'minimarket-token' // TODO: Cambiar por el nombre de la tiendita.

const getHeadersConfig = () => {
    const token = localStorage.getItem(tokenName)
    return {
        token: token,
        config: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        },
        configArchive:
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
            transformRequest: (data) => data
        }
    }
}

export default getHeadersConfig
export { tokenName }